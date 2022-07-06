import { exists, isArray, isObject } from "../../utils/basics";


/**
 * Function `normalizeFormData` normalizes the `data` provided such that,
 * the returned data can be easily submitted for the validation as well as to the APIs.
 *
 * @param {Object} data - Data saved by `Form` component
 * @param {Object} accumulator - Storage container for our output.
 * 
 * @returns - An Object containing flattened data.
 * 
 * 
 * Refer below examples for more info.
 * =====================================
 * 
 * Eg. - 1
 * data - { name: 'abc', occupation: 'developer' }
 * outputs - { name: 'abc', occupation: 'developer' }
 * 
 * ---------------------------------------------------
 * 
 * Eg. - 2
 * data - { name: 'abc', occupation: 'developer', email: [ 'xyz@pqr.com', 'pnq@mpg.org' ] }
 * outputs - { name: 'abc', occupation: 'developer', email: [ 'xyz@pqr.com', 'pnq@mpg.org' ] }
 * 
 * --------------------------------------------------------------------------------------------
 * 
 * Eg. - 3
 * data - { name: 'abc', occupation: 'developer', company: { name: 'XUZ CORP', size: 200 } }
 * outputs - { name: 'abc', occupation: 'developer', company: { name: 'XUZ CORP', size: 200 } }
 * 
 * --------------------------------------------------------------------------------------------
 * 
 * Eg. - 4:- SPECIAL CASE WHEN WE ARE DEALING WITH TOGGLE BUTTONS HAVING INPUT CONTROLS UNDER TOGGLE BUTTON.
 *   For toggle buttons, we store data as object - { value: '...', otherInputDataUnderToggleBtn }
 * data - { name: 'abc', occupation: 'developer', accountType: { value: 'COMPANY', companyName: 'XUZ CORP', companySize: 200 } }
 * outputs - { name: 'abc', occupation: 'developer', accountType: 'COMPANY', companyName: 'XUZ CORP', companySize: 200 }
 */
export function normalizeFormData(data, accumulator = {}) {
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
                if (exists(value)) return normalizeFormData(restObj, acc);
                // It could be a group of inputs which all relate to one parent (which is not a `Toggle Button`).
                else acc[key] = normalizeFormData(restObj);
            }
        }
        return acc;
    }, accumulator);
}


/**
 * Function `getFieldValidationRules` returns the collection of rules for given `fieldName`.
 * 
 * @param {String} fieldName - HTML Attribute `name` for a given field
 * @param {Array of Rules (Objects)} validationRules - Form validation rules
 * 
 * @returns `undefined` OR collection of rules pulled from `validationRules` for a given `fieldName`.
 */
export function getFieldValidationRules(fieldName, validationRules) {
    if (!exists(fieldName) || !isArray(validationRules)) return;
    return validationRules.find(({ field }) => field === fieldName)?.rules;
}


/**
 * Plain object referring to various functions based on validation type (regexp, comparison etc.).
 */
 const VALIDATORS = {
    REGEXP: (value, pattern) => new RegExp(pattern).test(value),
    COMPARE: {
        TO_EQUAL: (src, target) => src === target
    }
}


/**
 * Function `getFormDataForField` searches inside `formData` and returns the value for given `fieldName`.
 *
 * @param {Object} formData - Complete Form data that's saved by `Form`. It includes data of each and every field.
 * @param {String} fieldName - HTML Attribute `name` for a given field
 *
 * @returns The value, found inside `formData` for given `fieldName`.
 *
 * // TO DO:- Deep lookup the given `fieldName` key.
 */
const getFormDataForField = (formData, fieldName) => {
    return formData[fieldName]
}


/**
 * Function `validateField` will validate a single field for a given `fieldName`, `fieldValue` and `rules`.
 * 
 * @param {String} fieldName - HTML Attribute `name` for a given field
 * @param {String | Boolean | Object | Array | Any} fieldValue - HTML Attribute `value` for a given field. However, here it's read using `Form's` state object.
 * @param {Array of Rules (Objects)} rules - Validation rules specific to this given field (based on `fieldName`).
 * @param {Object} formData - Complete Form data that's saved by `Form`. It includes data of each and every field.
 * 
 * @returns `undefined` OR Error Object - { [fieldName]: First error that occured during validation }
 */
export function validateField(fieldName, fieldValue, rules, formData) {
    if (!exists(fieldName) || !exists(fieldValue) || !isArray(rules)) return;

    let error;

    for (const { pattern, matchToField, symbol, message } of rules) {
        if (exists(pattern)) {
            !VALIDATORS.REGEXP(fieldValue, pattern) && (error = message);
        } else if (exists(matchToField)) {
            !VALIDATORS.COMPARE.TO_EQUAL(fieldValue, getFormDataForField(formData, matchToField)) && (error = message);
        } else if (exists(symbol)) {
            // Code for math symbol comparisons. E.g:- >, <, === etc.
        }

        // We'll stop at first error itself.
        if (error) break;
    }

    return error && { [fieldName]: error };
}


/**
 * Function `validateForm` will validate entire Form data `formData`, for errors against given `validationRules`.
 * 
 * @param {Object} formData - Complete Form data that's saved by `Form`. It includes data of each and every field.
 * @param {Array of Rules (Objects)} validationRules - Complete Form Validation Rules (includes rules for all necessary fields)
 * 
 * @returns - `null` OR Collection of Errors for each field validated:- { [fieldName1]: '...', [fieldName2]: '...', [fieldName3]: '...' }
 */
export function validateForm(formData, validationRules) {
    if (!isObject(formData) || !isArray(validationRules)) return;

    return Object.entries(formData).reduce((acc, [name, value]) => {
        // Nested Input data structure... like complex Toggle Button system OR related inputs under common group.
        if (isObject(value)) return validateForm(value, validationRules);

        const rules = getFieldValidationRules(name, validationRules);
        const error = validateField(name, value, rules, formData);

        // Save the validation error data.
        if (error) acc = { ...(acc || {}), ...error };

        return acc;
    }, null);
}