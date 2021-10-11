import React from 'react';
import { isArray, exists } from "./basics";

export function composeComponents() {
	return children => [...arguments].reverse().reduce((acc, item) => {
		const [Component, props] = isArray(item) ? item : [item, {}];

		// Pickup only non-null/non-undefined values as rendering such values as JSX is errorneous.
		if (exists(Component)) {
			acc = <Component {...props}>{acc}</Component>;
		}

		return acc;
	}, children);
}