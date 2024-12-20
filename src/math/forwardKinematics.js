/**
 * Calculate forward kinematics for a planar robot arm
 * @param {Array} joints Array of joint objects with angle and length 
 * @returns {Array} Array of joint positions 
 */
export const calculateForwardKinematics = (joints) => {
    let x = 0;
    let y = 0;
    let currentAngle = 0;
    
    return joints.map(joint => {
      // add current joint angle to cumulative angle
      currentAngle += (joint.angle * Math.PI / 180);  // Convert to radians
      
      // Calculate new position
      x += joint.length * Math.cos(currentAngle);
      y += joint.length * Math.sin(currentAngle);
      
      return { x, y };
    });
  };
  
  /**
   * determining the boundary points of the robot's workspace
   * @param {Array} joints Array of joint objects with length 
   * @param {number} samples No. of sample points to generate
   * @returns {Array} Array of points representing the workspace boundary
   */
  export const calculateWorkspace = (joints, samples = 360) => {
    const points = [];
    const totalLength = joints.reduce((sum, joint) => sum + joint.length, 0);
    
    // Sample points in a circle
    for (let i = 0; i < samples; i++) {
      const angle = (2 * Math.PI * i) / samples;
      points.push({
        x: totalLength * Math.cos(angle),
        y: totalLength * Math.sin(angle)
      });
    }
    
    return points;
  };