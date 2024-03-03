import { TerrainTextureHeight, TerrainTextureWidth } from './constants.js';

export class Terrain {
    textures = [];
    width;
    height;
    rows;
    columns;

    constructor(rows, columns) {
        this.width = rows * TerrainTextureWidth;
        this.height = columns * TerrainTextureHeight;
        this.rows = rows;
        this.columns = columns;
    }

    addTexture(texture) {
        this.textures.push(texture);
    }

    generate() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.addTexture(new Ground(j, i));
            }
        }
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