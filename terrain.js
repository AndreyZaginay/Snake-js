import { TerrainTextureHeight, TerrainTextureWidth } from './constants.js';
import { getRandomPoint, checkCollision } from './utils.js'

export class Terrain {
    width;
    height;
    rows;
    columns;
    background;
    snake;
    food;

    constructor(rows, columns) {
        this.width = rows * TerrainTextureWidth;
        this.height = columns * TerrainTextureHeight;
        this.rows = rows;
        this.columns = columns;
        this.food = new Food;
        this.background = [];
    }


    addBackgroundTexture(texture) {
        this.background.push(texture);
    }

    generateBackround() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.addBackgroundTexture(new Ground(j, i));
            }
        }
    }

    generateFood() {
        const { x, y } = getRandomPoint();
        this.food.x = x;
        this.food.y = y;
        for (let i = 0; i < this.snake.length; i++){
            if (checkCollision( this.food.x, this.food.y, this.snake[i].x, this.snake[i].y)) {
                this.generateFood();
            }
        }
    }
    
    checkSnakeBodyCollision() {
        return this.snake.find(({ x, y }, i) => {
            if (i === 0) return;
            return this.snake[0].x === x && this.snake[0].y === y;
        });
    }

    checkFoodCollision() {
        const snakeHead = this.snake[0];
        return checkCollision(snakeHead.x, snakeHead.y, this.food.x, this.food.y);
    }
}

export class TerrainTexture {
    x = null;
    y = null;
    fillStyle = null;
    width = TerrainTextureWidth;
    height = TerrainTextureHeight;

    constructor(x, y, fillStyle) {
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
    }
}

export class Ground extends TerrainTexture {
    constructor(x, y, fillStyle = 'grey') {
        super(x, y, fillStyle);
    }
}

export class Food extends TerrainTexture {
    constructor(x = null, y = null, fillStyle = 'red') {
        super(x, y, fillStyle);
    }
}
