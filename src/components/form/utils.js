import { exists, isArray, isObject } from "../../utils/basics";


/**
 * To do:- Fill in the documentation
 * @param {*} data 
 * @param {*} accumulator 
 * @returns 
 */
export function flattenFormData(data, accumulator = {}) {
    return Object.entries(data).reduce((acc, [key, val]) => {
        if (!isObject(val)) {
            acc[key] = val;
        } else {
            const { value, ...restObj } = val;

            // If `value` exists, we're dealing with `Toggle Button` inputs
            if (exists(value)) acc[key] = value;

            // We may have other data as well.
            if (isObject(restObj)) {
                // If `value` exists, we're dealing with `Toggle Button` inputs. We may have child input elements inside toggle button.
                if (exists(value)) return flattenFormData(restObj, acc);
                // It could be a group of inputs which all relate to one parent (which is not a `Toggle Button`).
                else acc[key] = flattenFormData(restObj);
            }
        }
        return acc;
    }, accumulator);
}


/**
 * To do:- Fill in the documentation
 * @param {*} fieldName 
 * @param {*} validationRules 
 * @returns 
 */
export function getFieldValidationRules(fieldName, validationRules) {
    if (!exists(fieldName) || !isArray(validationRules)) return;
    return validationRules.find(({ field }) => field === fieldName)?.rules;
}


/**
 * To do:- Fill in the documentation
 */
 const VALIDATORS = {
    REGEXP: (value, pattern) => new RegExp(pattern).test(value)
}


/**
 * To do:- Fill in the documentation
 * @param {*} fieldName 
 * @param {*} fieldValue 
 * @param {*} rules 
 */
export function validateField(fieldName, fieldValue, rules) {
    if (!exists(fieldName) || !exists(fieldValue) || !isArray(rules)) return;

    let error;

    for (const { pattern, match, symbol, message } of rules) {
        if (exists(pattern)) {
            !VALIDATORS.REGEXP(fieldValue, pattern) && (error = message);
        } else if (exists(symbol)) {
            // Code for math symbol comparisons. E.g:- >, <, === etc.
        } else if (exists(match)) {
            // Code for matching value exactness with another field whose [name] is provided as value of [match]
        }

        // We'll stop at first error itself.
        if (error) break;
    }

    return error && { [fieldName]: error };
}


/**
 * To do:- Fill in the documentation
 * @param {*} formData 
 * @param {*} validationRules 
 */
export function validateForm(formData, validationRules) {
    if (!isObject(formData) || !isArray(validationRules)) return;

    return Object.entries(formData).reduce((acc, [name, value]) => {
        // Nested Input data structure... like complex Toggle Button system OR related inputs under common group.
        if (isObject(value)) return validateForm(value, validationRules);

        const rules = getFieldValidationRules(name, validationRules);
        const error = validateField(name, value, rules);

        // Save the validation error data.
        if (error) acc = { ...(acc || {}), ...error };

        return acc;
    }, null);
}