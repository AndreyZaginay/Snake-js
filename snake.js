import { TerrainTexture } from "./terrain.js";
import { getRandomPoint, checkCollision } from './utils.js'
import { TerrainColumns, TerrainRows } from "./constants.js";

export class Food extends TerrainTexture {
    constructor(x = null, y = null, fillStyle = 'red') {
        super(x, y, fillStyle);
    }

    generateFood(snakeBody) {
        const { x, y } = getRandomPoint();
        this.x = x;
        this.y = y;
        for (let i = 0; i < snakeBody.length; i++){
            if (checkCollision(this.x, this.y, snakeBody[i].x, snakeBody[i].y)) {
                this.generateFood(snakeBody);
            }
        }
    }
}

export class SnakePart extends TerrainTexture {
    constructor(x, y) {
        super(x, y, 'blue');
    }
}

export class Snake {
    body = [];
    speed = 1;
    tailPreviousPos;
    head;
    lose = false;

    constructor() {
        this.body.push(new SnakePart(0, 0));
        this.head = this.body[0];
    }

    moveUp() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.y - this.speed;
        const edge = 0;
        this.head.y = position < edge ? TerrainColumns - 1 : position;
        this.bodyMove(lastMovedElementPosition);
        for (let i = 1; i < this.body.length; i++) {
            if (checkCollision(this.head.x, this.head.y, this.body[i].x, this.body[i].y)) {
                this.resetSnake();
                this.lose = true;
            }
        }
    }

    moveDown() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.y + this.speed;
        const edge = TerrainColumns - 1;
        this.head.y = position > edge ? 0 : position;
        this.bodyMove(lastMovedElementPosition);
        for (let i = 1; i < this.body.length; i++) {
            if (checkCollision(this.head.x, this.head.y, this.body[i].x, this.body[i].y)) {
                this.resetSnake();
                this.lose = true;
            }
        }
    }

    moveLeft() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.x - this.speed;
        const edge = 0;
        this.head.x  = position < edge ? TerrainRows - 1 : position;
        this.bodyMove(lastMovedElementPosition);
        for (let i = 1; i < this.body.length; i++) {
            if (checkCollision(this.head.x, this.head.y, this.body[i].x, this.body[i].y)) {
                this.resetSnake();
                this.lose = true;
            }
        }
    }

    moveRight() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.x + this.speed;
        const edge = TerrainRows - 1;
        this.head.x = position > edge ? 0 : position;
        this.bodyMove(lastMovedElementPosition);
        for (let i = 1; i < this.body.length; i++) {
            if (checkCollision(this.head.x, this.head.y, this.body[i].x, this.body[i].y)) {
                this.resetSnake();
                this.lose = true;
            }
        }
    }

    setTailPreviousPosition() {
        const tail = this.body[this.body.length - 1];
        this.tailPreviousPos = { x: tail.x, y: tail.y };
    }

    bodyMove(lastPos) {
        let newLastPos;
        for (let i = 1; i < this.body.length; i++) {
            newLastPos = lastPos;
            lastPos = { x: this.body[i].x, y: this.body[i].y };
            this.body[i].x = newLastPos.x;
            this.body[i].y = newLastPos.y;
        }
    }

    resetSnake() {
        this.body = [new SnakePart(0, 0)];
        this.head = this.body[0];
    }

    addBodyPart() {
        this.body.push(new SnakePart(this.tailPreviousPos.x, this.tailPreviousPos.y));
    }
}