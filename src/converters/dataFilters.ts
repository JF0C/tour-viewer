import savitzkyGolay from "ml-savitzky-golay";

export const savGol = (values: number[]): number[] => {
    const filtered = savitzkyGolay(values, 1, 
        {
            derivative: 0,
            windowSize: 15, 
            polynomial: 5
        });
    return filtered;
}

export type movingAverageOptions = {
    windowSize: number
}

const average = (values: number[]): number => {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b) / values.length;
}

export const movingAverage = (values: number[], options: movingAverageOptions): number[] => {
    const padding = Math.ceil(options.windowSize / 2);
    if (values.length < 2 * padding) {
        return values;
    }
    const result = Array<number>(values.length);
    for (let k = 0; k < padding; k ++) {
        result[k] = average(values.slice(0, k + padding))
    }
    for (let k = padding; k < values.length - padding; k++) {
        result[k] = average(values.slice(k - padding, k + padding));
    }
    for (let k = values.length - padding; k < values.length; k++) {
        result[k] = average(values.slice(k - padding, values.length))
    }
    return result;
}
