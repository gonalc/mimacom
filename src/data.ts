import { get, patch } from './functions';

export const apiUrl = 'http://localhost:3000/';

export const fetchGroceries = () => get(`${apiUrl}grocery`);
export const fetchFavoriteProducts = () => get(`${apiUrl}grocery?favorite=1`);
export const updateProduct = (id: string, data: {}) => patch(`${apiUrl}grocery/${id}`, data);

// Helper objects and constants
export const COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    red: '#FF5C5C',
    pink: '#FF49B6',
    purple: '#9C27B0',
    deepPurple: '#7E57C2',
    indigo: '#3F51B5',
    blue: '#2196F3',
    lightBlue: '#03A9F4',
    cyan: '#00BCD4',
    teal: '#009688',
    darkGreen: '#2E7D32',
    green: '#4CAF50',
    lightGreen: '#8BC34A',
    lime: '#CDDC39',
    yellow: '#FDD835',
    amber: '#FFC107',
    orange: '#FF9800',
    deepOrange: '#FF8730',
    brown: '#795548',
    darkGray: '#666666',
    gray: '#c4c4c4',
    lightGray: '#EBEBEB',
    blueGray: '#78909C',
};
