export function getThemeResource(file = 'index.json') {
    return `/client-assets/theme/${file}`;
}

export function getConfigResource(file = 'index.json') {
    return `/client-assets/config/${file}`;
}

export function getImageResource(file) {
    return file && `/client-assets/images/${file}`;
}