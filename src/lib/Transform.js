// @ts-check

/**
 * @typedef {Object} TransformType
 * @property {Object} position
 * @property {number} position.x
 * @property {number} position.y
 */

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {TransformType}
 */
export const Transform = (x = 0, y = 0) => {
  return {
    position: {
      x,
      y,
    },
  };
};
