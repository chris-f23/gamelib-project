// @ts-check
import { Game } from "./src/lib/Game";
import { KeyListener } from "./src/lib/KeyListener";
import { Rect } from "./src/lib/Rect";
import { Transform } from "./src/lib/Transform";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const inputs = KeyListener({
  left: ["ArrowLeft", "KeyA"],
  right: ["ArrowRight", "KeyD"],
});

const game = Game({
  canvas: document.getElementById("canvas"),
  height: CANVAS_HEIGHT,
  width: CANVAS_WIDTH,
});

const paddleMinSpeed = 0;
const paddleMaxSpeed = 180;
const paddleSpeedIncrement = 10;
let paddleCurrentSpeed = paddleMinSpeed;
let paddleDirection = 0;

const paddle = Rect({
  width: 200,
  height: 20,
  color: "red",
  transform: Transform(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20),
  onUpdate: (delta) => {
    if (!inputs.left && !inputs.right) {
      if (paddleCurrentSpeed > paddleMinSpeed) {
        paddleCurrentSpeed -= paddleSpeedIncrement;
      } else {
        paddleCurrentSpeed = 0;
        paddleDirection = 0;
      }
    } else {
      if (inputs.left) {
        paddleDirection = -1;
      } else if (inputs.right) {
        paddleDirection = 1;
      }

      if (paddleCurrentSpeed < paddleMaxSpeed) {
        paddleCurrentSpeed += paddleSpeedIncrement;
      }
    }

    paddle.transform.position.x += paddleDirection * paddleCurrentSpeed * delta;
  },
});

let ballSpeed = 72;
const ball = Rect({
  width: 20,
  height: 20,
  color: "blue",
  transform: Transform(
    paddle.transform.position.x,
    paddle.transform.position.y - 10
  ),
  onUpdate: (delta) => {
    ball.transform.position.y -= ballSpeed * delta;
  },
});

game.addScene("main", [paddle, ball]);

game.startScene("main");

// @ts-ignore
window.game = game;
