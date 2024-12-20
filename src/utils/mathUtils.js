/**
 * Convert deg to rad
 * @param {number} degrees Angle in deg
 * @returns {number} Angle in rad
 */
export const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  
  /**
   * Convert rad to deg
   * @param {number} radians Angle in rad
   * @returns {number} Angle in deg
   */
  export const toDegrees = (radians) => {
    return radians * (180 / Math.PI);
  };
  
  /**
   * Clamp a number between min and max values
   * @param {number} value Value to clamp
   * @param {number} min min value
   * @param {number} max max value
   * @returns {number} clamped value
   */
  export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };