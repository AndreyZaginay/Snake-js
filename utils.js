import { TerrainColumns, TerrainRows } from './constants.js';

export const checkCollision = (x1, y1, x2, y2) => x1 === x2 && y1 === y2;

export const getRandomPoint = () => ({ x: Math.floor(Math.random() * TerrainColumns), y: Math.floor(Math.random() * TerrainRows) });