
export const range = (n) => {
    // @ts-ignore
    return Array.from({length: n}, (value, key) => key);
};

export const getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};
