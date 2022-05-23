import { isString } from "./basics";

export function fetchJsonResource(path) {
    if (!isString(path)) return Promise.reject(`Path argument - ${path} is not a string`);

    return fetch(path).then(res => {
        if (!res.ok) return Promise.reject(`Failed to download resource:- ${path} due to error:- ${res.statusText}`);
        return res.json();
    });
}