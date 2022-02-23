import { useRouteMatch } from 'react-router-dom';
import { exists, isArray, isString } from "./basics";

export function findMatchingRoute(slugs = [], exact = true) {
    if (!exists(slugs) || !isArray(slugs)) return null;

    return slugs.find(s => {
        const match = useRouteMatch({ path: s, strict: exact }); // TO DO:- Fix calling hooks inside loop.
        return match ? (
            exact ? (
                match.isExact ?
                    match.path : false
            ) : match.path
        ) : false;
    }) || null;
}

export function isActiveLink(path) {
    if (!path || !isString(path)) return false;

    const match = useRouteMatch({ path, strict: true });
    return !!match && match.isExact;
}