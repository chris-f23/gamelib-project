// @ts-check

/**
 * Escucha los eventos 'keydown' y 'keyup' del documento y devuelve un objeto que representa
 * el estado de las teclas definidas en un objeto de mapeo de teclas.
 * @template {string} T
 * @param {{ [key in T]: string[] }} keyMapping
 * @returns {{ [key in T]: boolean }}
 */
export const KeyListener = (keyMapping) => {
  const inputs = Object.fromEntries(Object.keys(keyMapping).map((k) => [k, false]));

  const setInput = (keyCode, value) => {
    const inputKey = Object.keys(keyMapping).find((k) =>
      keyMapping[k].includes(keyCode)
    );

    if (inputKey !== undefined) {
      inputs[inputKey] = value;
    }
  };

  document.onkeydown = ({ code }) => setInput(code, true);
  document.onkeyup = ({ code }) => setInput(code, false);

  // @ts-ignore
  return inputs;
};
