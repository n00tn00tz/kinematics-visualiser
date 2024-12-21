import React, { useRef, useState, useEffect } from 'react';
import { calculateForwardKinematics } from '../math/forwardKinematics';

const RobotArmViewer = () => {
  // state variables
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(50);
  const [showAxes, setShowAxes] = useState(true);
  const canvasRef = useRef(null);
  const [joints, setJoints] = useState([
    { angle: 0, length: 100, offset: 0 },
    { angle: 0, length: 75, offset: 0 },
    { angle: 0, length: 50, offset: 0 }
  ]);

  // function that draws the grid 
  const drawGrid = (ctx, width, height) => {
    if (!showGrid) return;

    const offsetX = width/2;
    const offsetY = height/2;

    // drawing the minor grid lines 
    ctx.beginPath();
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 0.5;

    // drawing vertical grid lines 
    for (let x = offsetX % gridSize; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    // drawing horizontal grid lines 
    for (let y = offsetY % gridSize; y < height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // draw major axes
    if (showAxes) {
      ctx.beginPath();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      
      // X-axis
      ctx.moveTo(0, height/2);
      ctx.lineTo(width, height/2);
      
      // Y-axis
      ctx.moveTo(width/2, 0);
      ctx.lineTo(width/2, height);
      
      ctx.stroke();

      // Draw axis labels
      ctx.fillStyle = '#2563eb';
      ctx.font = '14px Arial';
      ctx.fillText('X', width - 20, height/2 - 10);
      ctx.fillText('Y', width/2 + 10, 20);
    }
  };

  // Draw the robot arm
  const drawArm = (ctx, width, height) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    drawGrid(ctx, width, height);

    // Calculate joint positions
    const positions = calculateForwardKinematics(joints);
    
    // transforms the cartesian coordinates (x,y) into the canvas' coordinate system 
    const transformToCanvas = (x, y) => ({
      x: width/2 + x,
      y: height/2 - y
    });

    // Draw arm segments
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#72A1E5';  // blue
    
    let prevPos = transformToCanvas(0, 0);
    positions.forEach((pos, index) => {
      const canvasPos = transformToCanvas(pos.x, pos.y);
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(canvasPos.x, canvasPos.y);
      ctx.stroke();
      
      // Draw joint
      ctx.fillStyle = '#272D2D';  // black
      ctx.beginPath();
      ctx.arc(prevPos.x, prevPos.y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      prevPos = canvasPos;
    });
    
    // Draw end effector
    ctx.fillStyle = '#23CE6B';  // green
    ctx.beginPath();
    ctx.arc(prevPos.x, prevPos.y, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  // Add showGrid, showAxes, and gridSize to the dependency array
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawArm(ctx, canvas.width, canvas.height);
  }, [joints, showGrid, showAxes, gridSize]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4 flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Show Grid</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showAxes}
              onChange={(e) => setShowAxes(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Show Axes</span>
          </label>
        </div>
        <canvas 
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full border border-gray-200 rounded mb-4"
        />
        <div className="space-y-4">
          {joints.map((joint, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Joint {index + 1} Angle: {joint.angle}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                value={joint.angle}
                onChange={(e) => {
                  const newJoints = [...joints];
                  newJoints[index].angle = parseInt(e.target.value);
                  setJoints(newJoints);
                }}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RobotArmViewer;