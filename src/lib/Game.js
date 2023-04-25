// @ts-check

/**
 * @typedef {Object} GameObject
 * @property {(deltaTime: number) => void} [update]
 * @property {() => void} [draw]
 * @property {(context: CanvasRenderingContext2D) => void} [setContext]
 */

/**
 *
 * @param {Object} props
 * @param {HTMLCanvasElement|HTMLElement|null} props.canvas
 * @param {number} props.height
 * @param {number} props.width
 * @returns
 */
export const Game = ({ canvas, height, width }) => {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("El elemento canvas no es valido.");
  }
  canvas.style.height = `${height}px`;
  canvas.style.width = `${width}px`;
  canvas.height = height;
  canvas.width = width;

  const context = canvas.getContext("2d");

  if (!(context instanceof CanvasRenderingContext2D)) {
    throw new Error("No se pudo obtener el contexto del canvas.");
  }

  /** @type {{ id: string, gameObjects: GameObject[], start: () => void }[]} */
  const scenes = [];

  return {
    context,

    /**
     * @param {string} id
     * @param {GameObject[]} _gameObjects
     */
    addScene(id, _gameObjects) {
      _gameObjects?.forEach((go) => go.setContext?.(this.context));

      scenes.push({
        id: id,

        /** @type {any[]} */
        gameObjects: _gameObjects,

        start() {
          let deltaTime = 0;
          let oldDeltaTime = 0;

          const update = (delta) => {
            const newDeltaTime = delta - oldDeltaTime;
            oldDeltaTime = delta;
            deltaTime = newDeltaTime;

            context.clearRect(0, 0, width, height);

            for (const gameObject of this.gameObjects) {
              gameObject.update?.(deltaTime/1000);
              gameObject.draw?.();
            }

            requestAnimationFrame(update);
          };

          update(16);
        },
      });
    },

    /**
     * @param {string} id 
     */
    startScene(id) {
      const scene = scenes.find((s) => s.id === id);
      if (scene === undefined) {
        throw new Error(
          `No existe una escena con el id proporcionado (id: ${id}).`
        );
      }
      scene.start();
    },
  };
};
