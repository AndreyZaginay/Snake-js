const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const score = document.getElementById('score');

const cellSize = 20;

const checkCollision = (x1,y1,x2,y2) => x1 === x2 && y1 === y2;
const geRandomCoordinate = () => Math.floor(Math.random() * 25);

class Render {
    context;

    constructor (context) {
        this.context = context;
    }

    render(textures) {
        this.context.clearRect(0, 0, innerWidth, innerHeight);
        for (const { x, y, width, height, fillStyle } of textures) {
            this.context.strokeRect(x * width, y * height, width, height);
            this.context.fillStyle = fillStyle; 
            this.context.fillRect(x * width, y * height, width, height);
        }
    }
}

class Terrain {
    textures = [];

    addTexture(texture) {
        this.textures.push(texture);
    }

    generate() {
        for (let i = 0; i * 20 < canvas.height; i++) {
            for (let j = 0; j * 20 < canvas.width; j++) {
                const newTexture = new Ground(j, i);
                this.addTexture(newTexture);
            }
        }
    }
}

class TerrainTexture {
    x = null;
    y = null;
    fillStyle = null;
    width = 20;
    height = 20;

    constructor(x, y, fillStyle) {
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
    }
}

class Ground extends TerrainTexture {
    constructor(x, y, fillStyle = 'grey') {
        super(x, y, fillStyle);
    }
}   

class Food extends TerrainTexture {
    constructor(x = null, y = null, fillStyle = 'red') {
        super(x, y, fillStyle);
    }

    generateFood(snakeBody) {
        debugger;
        this.x = geRandomCoordinate();
        this.y = geRandomCoordinate();
        for (let i = 0; i < snakeBody.length; i++){
            if (checkCollision(this.x, this.y, snakeBody[i].x, snakeBody[i].y)) {
                this.generateFood(snakeBody);
            }
        }
    }
}

class SnakePart extends TerrainTexture {
    width = 20;
    height = 20;
    constructor(x, y) {
        super(x, y, 'blue');
    }
}

class Snake {
    body = [];
    speed = 1;
    tailPreviosPos;
    head;

    constructor() {
        this.body.push(new SnakePart(0, 0));
        this.head = this.body[0];
    }

    moveUp() {
        this.setTailPreviosPos();
        const lastMovedElemtPos = {x: this.head.x, y: this.head.y};
        const position = this.head.y - this.speed;
        const edge = 0;
        this.head.y = position * this.head.height < edge ? 24 : position;
        this.bodyMove(lastMovedElemtPos);
    }

    moveDown() {
        this.setTailPreviosPos();
        const lastMovedElemtPos = {x: this.head.x, y: this.head.y};
        const position = this.head.y + this.speed;
        const edge = canvas.height - this.head.height;
        this.head.y = position * this.head.height > edge ? 0 : position;
        this.bodyMove(lastMovedElemtPos);
    }

    moveLeft() {
        this.setTailPreviosPos();
        const lastMovedElemtPos = {x: this.head.x, y: this.head.y};
        const position = this.head.x - this.speed;
        const edge = 0;
        this.head.x  = position * this.head.width < edge ? 24 : position;
        this.bodyMove(lastMovedElemtPos);
    }

    moveRight() {
        this.setTailPreviosPos();
        const lastMovedElemtPos = {x: this.head.x, y: this.head.y};
        const position = this.head.x + this.speed;
        const edge = canvas.width - this.head.width;
        this.head.x = position * this.head.width > edge ? 0 : position;
        this.bodyMove(lastMovedElemtPos);
    }

    setTailPreviosPos() {
        const tail = this.body[this.body.length - 1];
        this.tailPreviosPos = { x: tail.x, y: tail.y };
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
        this.body.push(new SnakePart(this.tailPreviosPos.x, this.tailPreviosPos.y));
    }
}

const renderer = new Render(context);
const terrain = new Terrain;
const snake = new Snake;
const food = new Food;
food.generateFood(snake.body);
terrain.generate();
for(let i = 0; i < snake.body.length; i++) {
    terrain.addTexture(snake.body[i]);
}
terrain.addTexture(food);
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