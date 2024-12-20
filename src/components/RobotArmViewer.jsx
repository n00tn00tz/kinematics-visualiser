import React, { useRef, useState, useEffect } from 'react';
import { calculateForwardKinematics } from '../math/forwardKinematics';

const RobotArmViewer = () => {
  const canvasRef = useRef(null);
  const [joints, setJoints] = useState([
    { angle: 0, length: 100, offset: 0 },
    { angle: 0, length: 75, offset: 0 },
    { angle: 0, length: 50, offset: 0 }
  ]);

  // Draw the robot arm
  const drawArm = (ctx, width, height) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let i = 0; i < width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Calculate joint positions
    const positions = calculateForwardKinematics(joints);
    
    // Transform to canvas coordinates (origin at center)
    const transformToCanvas = (x, y) => ({
      x: width/2 + x,
      y: height/2 - y  // Flip Y axis
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

  // Update canvas when joints change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawArm(ctx, canvas.width, canvas.height);
  }, [joints]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
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