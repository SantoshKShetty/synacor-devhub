export function exists(val) {
	return val !== undefined && val !== null;
}

export function isArray(val) {
    return exists(val) && Array.isArray(val);
}

export function isObject(val) {
    return exists(val) && Object.prototype.toString.call(val) === '[object Object]';
}

export function isString(val) {
    return exists(val) && typeof val === 'string';
}