import { Canvas, Renderer } from './renderer.js';
import { Terrain } from './terrain.js';
import { Food, Snake } from './snake.js';
import { checkCollision } from './utils.js';
import { TerrainRows, TerrainColumns } from './constants.js';

const canvas = new Canvas;
const renderer = new Renderer(canvas.context);

const terrain = new Terrain(TerrainRows, TerrainColumns);
terrain.generate();
renderer.translate(terrain);

const snake = new Snake;

const food = new Food;
terrain.addTexture(food);
food.generateFood(snake.body);
terrain.addTexture(snake.body[0]);

const newGame = () => {
    terrain.clearTexuters();
    food.generateFood(snake.body);
    terrain.addTexture(food);
    terrain.addTexture(snake.body[0]);
    snake.lose = false;
}

const directions = {
    w: snake.moveUp.bind(snake),
    s: snake.moveDown.bind(snake),
    a: snake.moveLeft.bind(snake),
    d: snake.moveRight.bind(snake)
}

addEventListener('keydown', ({ key }) => {
    directions[key]?.();
    if (snake.lose) {
        newGame();
    }
    if (checkCollision(food.x, food.y, snake.head.x, snake.head.y)) {
        snake.addBodyPart();
        terrain.addTexture(snake.body[snake.body.length - 1]);
        food.generateFood(snake.body);
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(terrain.textures);
}

animate();