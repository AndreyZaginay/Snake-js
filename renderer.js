export class Canvas {
    _canvas;

    get context() {
        return this._canvas.getContext('2d');
    }

    constructor() {
        this._canvas = document.createElement('canvas');
        this._canvas.width = innerWidth;
        this._canvas.height = innerHeight;
        document.body.appendChild(this._canvas);
    }
}

export class Renderer {
    context;

    constructor(context) {
        this.context = context;
    }

    translate({ width: terrainWidth, height: terrainHeight }) {
        const { width: canvasWidth, height: canvasHeight } = this.context.canvas;
        const x = Math.floor((canvasWidth - terrainWidth) / 2);
        const y = Math.floor((canvasHeight - terrainHeight) / 2);
        this.context.translate(x, y);
    }

    clearCanvas() {
        const { width, height } = this.context.canvas;
        this.context.clearRect(0, 0, width, height);
    }

    renderTextures(textures) {
        for (const { x, y, width, height, fillStyle } of textures) {
            this.context.strokeRect(x * width, y * height, width, height);
            this.context.fillStyle = fillStyle;
            this.context.fillRect(x * width, y * height, width, height);
        }
    }

    renderTexture({ x, y, height, width, fillStyle }) {
        this.context.strokeRect(x * width, y * height, width, height);
        this.context.fillStyle = fillStyle;
        this.context.fillRect(x * width, y * height, width, height);
    }
    
}
