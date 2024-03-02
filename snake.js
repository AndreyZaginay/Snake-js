import { TerrainTexture } from "./terrain.js";
import { getRandomPoint, checkCollision } from './utils.js'

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

    constructor() {
        this.body.push(new SnakePart(0, 0));
        this.head = this.body[0];
    }

    moveUp() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.y - this.speed;
        const edge = 0;
        this.head.y = position * this.head.height < edge ? 24 : position;
        this.bodyMove(lastMovedElementPosition);
    }

    moveDown() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.y + this.speed;
        const edge = canvas.height - this.head.height;
        this.head.y = position * this.head.height > edge ? 0 : position;
        this.bodyMove(lastMovedElementPosition);
    }

    moveLeft() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.x - this.speed;
        const edge = 0;
        this.head.x  = position * this.head.width < edge ? 24 : position;
        this.bodyMove(lastMovedElementPosition);
    }

    moveRight() {
        this.setTailPreviousPosition();
        const lastMovedElementPosition = {x: this.head.x, y: this.head.y};
        const position = this.head.x + this.speed;
        const edge = canvas.width - this.head.width;
        this.head.x = position * this.head.width > edge ? 0 : position;
        this.bodyMove(lastMovedElementPosition);
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

    addBodyPart() {
        this.body.push(new SnakePart(this.tailPreviousPos.x, this.tailPreviousPos.y));
    }
}