import { Canvas, Renderer } from './renderer.js';
import { Terrain } from './terrain.js';
import { Snake, SnakePart } from './snake.js';
import { TerrainRows, TerrainColumns } from './constants.js';

const game = () => {
    const canvas = new Canvas;
    const renderer = new Renderer(canvas.context);
    const terrain = new Terrain(TerrainRows, TerrainColumns);
    renderer.translate(terrain);

    const resetGame = () => {
        snake.body = [new SnakePart(0, 0)];
        snake.head = snake.body[0];
        terrain.snake = snake.body;
    }
    
    terrain.generateBackround();
    const snake = new Snake;
    terrain.snake = snake.body;
    
    terrain.generateFood();

    const directions = {
        w: snake.moveUp.bind(snake),
        s: snake.moveDown.bind(snake),
        a: snake.moveLeft.bind(snake),
        d: snake.moveRight.bind(snake)
    }

    addEventListener('keydown', ({ key }) => {
        directions[key]?.();
        if (terrain.checkSnakeBodyCollision()) {
            resetGame();
        }
        if (terrain.checkFoodCollision()) {
            snake.addBodyPart();
            terrain.generateFood();
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.clearCanvas();
        renderer.renderTextures(terrain.background);
        renderer.renderTextures(terrain.snake);
        renderer.renderTexture(terrain.food);
    }

    animate();
}

game();