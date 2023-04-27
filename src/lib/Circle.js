// @ts-check

/** @typedef {import('./Transform').TransformType} TransformType */
/** @typedef {import('./Game').GameObject} GameObject */


/**
 * @typedef {Object} CircleType
 * @property {number} radius
 * @property {string} color
 * @property {TransformType} transform
 * 
 */


/**
 * @param {Object} props
 * @param {number} [props.radius]
 * @param {string} [props.color]
 * @param {TransformType} props.transform
 * @param {(deltaTime) => void} props.onUpdate
 * @returns {(CircleType & GameObject)}
 */
export const Circle = ({
  radius = 2,
  color = "magenta",
  transform,
  onUpdate,
}) => {
  /** @type {CanvasRenderingContext2D} */
  let context;

  return {
    radius,
    color,
    transform,


    draw() {
      if (context === undefined) {
        throw new Error("Contexto no definido.");
      }
      const { x, y } = this.transform.position;

      const circlePath = new Path2D();
      circlePath.arc(x, y, this.radius, 0, 2 * Math.PI, false);

      context.fillStyle = this.color;
      context.fill(circlePath);
    },

    update: onUpdate,

    setContext(ctx) {
      context = ctx;
    }
  };
};
