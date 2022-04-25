import { exists, isObject } from "./basics";

export function flattenFormData(data, accumulator = {}) {
    return Object.entries(data).reduce((acc, [key, val]) => {
        if (!isObject(val)) acc[key] = val;
        else {
            const { value, ...restObj } = val;
            if (exists(value)) acc[key] = value;
            if (isObject(restObj)) return flattenFormData(restObj, acc);
        }
        return acc;
    }, accumulator);
}