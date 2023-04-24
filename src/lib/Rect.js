// @ts-check

/** @typedef {import('./Transform').TransformType} TransformType */
/** @typedef {import('./Game').GameObject} GameObject */


/**
 * @typedef {Object} RectType
 * @property {number} width
 * @property {number} height
 * @property {string} color
 * @property {TransformType} transform
 * 
 */


/**
 * @param {Object} props
 * @param {number} [props.width]
 * @param {number} [props.height]
 * @param {string} [props.color]
 * @param {TransformType} props.transform
 * @param {(deltaTime) => void} props.onUpdate
 * @returns {(RectType & GameObject)}
 */
export const Rect = ({
  width = 10,
  height = 10,
  color = "magenta",
  transform,
  onUpdate,
}) => {
  let context;

  return {
    width,
    height,
    color,
    transform,


    draw() {
      if (context === undefined) {
        throw new Error("Contexto no definido.");
      }
      context.fillStyle = this.color;
      const { x, y } = this.transform.position;
      context.fillRect(x, y, this.width, this.height);
    },

    update: onUpdate,

    setContext(ctx) {
      context = ctx;
    }
  };
};
