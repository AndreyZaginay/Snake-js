import { Canvas, Renderer } from './renderer.js';
import { Terrain } from './terrain.js';
import { Food, Snake } from './snake.js';
import { checkCollision } from './utils.js';
import { TerrainRows, TerrainColumns } from './constants.js';

const score = document.getElementById('score');

const canvas = new Canvas;
const renderer = new Renderer(canvas.context);

const terrain = new Terrain(TerrainRows, TerrainColumns);
terrain.generate();
renderer.translate(terrain);

const snake = new Snake;

const food = new Food;
food.generateFood(snake.body);
console.log(food);
terrain.addTexture(food);

for(let i = 0; i < snake.body.length; i++) {
    terrain.addTexture(snake.body[i]);
}

const directions = {
    w: snake.moveUp.bind(snake),
    s: snake.moveDown.bind(snake),
    a: snake.moveLeft.bind(snake),
    d: snake.moveRight.bind(snake)
}

addEventListener('keydown', ({ key }) => {
    directions[key]?.();
    if (checkCollision(food.x, food.y, snake.head.x, snake.head.y)) {
        snake.addBodyPart();
        terrain.addTexture(snake.body[snake.body.length - 1]);
        food.generateFood(snake.body);
        score.innerHTML = +score.innerHTML + 1;
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(terrain.textures);
}

animate();