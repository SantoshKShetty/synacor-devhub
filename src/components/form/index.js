import React from 'react';
import cn from 'classnames';
import dlv from 'dlv';
import { dset } from 'dset';
import { makeStyles } from '../../provider/theme';
import { generateComponent } from '../../utils/component';
import { createObjPath, exists, isObject } from '../../utils/basics';
import { INIT, REPLACE } from '../../constants/reducer-actions';
import { ACTION_TYPES, USER_INPUT_TYPES } from '../../constants/field-types';
import { flattenFormData, validateForm } from './utils';

const EVENT_HANDLER_RETURN_TYPE = {
    DEFAULT: 'DEFAULT',
    EXEC: 'EXEC_AND_RETURN'
};

const styles = makeStyles(
    ({ breakpoints }) => ({
        form: {
            [breakpoints.up('md')]: {
                width: 340
            }
        }
    })
);

function storeUpdaterFn(state, { type, payload }) {
    if (type === INIT) {
        return payload;
    } else if (type === REPLACE) {
        dset(state, payload.savePath, payload.value);
        return { ...state };
    }

    return state;
}


// Context to provide required values to `children` of `Form` rendered under `FormControls`.
const FormContext = React.createContext({});


/**
 * `FormControls` returns computed Components.
 *
 * This Wrapper is needed because, directly calling the function `generateComponent` inside the `FormContext` Provider
 * makes the `Provider` to immediately execute the function before `FormContext`'s required values are available.
 * Wrapping this inside `FormControls` makes delayed execution so that `FormContext` is available inside `generateComponent` function.
 *
 * @param {Object|undefined} controls - form controls (text field, submit button etc.) received from Config Descriptor.
 */
const FormControls = ({ controls }) => generateComponent(controls);


// Main `Form` Component
const Form = ({ form: { controls, validations } = {}, className, onSubmit, ...props }) => {
    const classes = styles();

    // State to maintain form data.
    const [formData, dispatchData] = React.useReducer(storeUpdaterFn, {});

    // Initialize `initialFormData` local variable and keep this in sync for future use.
    // This is used to set the state in one go instead of calling `dispatchData` many times within `bindFormEvents`.
    const initialFormData = { ...formData };

    // State to maintain form errors.
    const [formError, dispatchError] = React.useReducer(storeUpdaterFn, {});


    // Event callbacks.
    const handleTextFieldOrAreaInput = savePath => event => {
        const value = event?.target?.value;
        dispatchData({ type: REPLACE, payload: { savePath, value } });
    }

    const handleToggleBtnChange = savePath => value => {
        dispatchData({ type: REPLACE, payload: { savePath, value: { value } } });
    }

    const handleSubmit = () => {
        const dataToSubmit = flattenFormData(formData);
        const errors = validateForm(dataToSubmit, validations);

        if (isObject(errors)) {
            dispatchError({ type: INIT, payload: errors });
        } else {
            console.log('Data submitted: ', dataToSubmit);
            onSubmit && onSubmit(dataToSubmit);
        }
    }


    const formEvents = React.useMemo(() => ({
        [USER_INPUT_TYPES.TEXT_FIELD]: {
            onChange: {
                type: EVENT_HANDLER_RETURN_TYPE.EXEC,
                fn: handleTextFieldOrAreaInput
            }
        },
        [ACTION_TYPES.TOGGLE_BTN_GROUP]: {
            onChange: {
                type: EVENT_HANDLER_RETURN_TYPE.EXEC,
                fn: handleToggleBtnChange
            }
        },
        [ACTION_TYPES.BUTTON.SUBMIT]: {
            onClick: {
                type: EVENT_HANDLER_RETURN_TYPE.DEFAULT,
                fn: handleSubmit
            }
        }
    }), [formData, formError]);


    /**
     * Main Single event binder used by the Form Controls. Make sure the field has `name` attribute.
     * 
     * @param fieldType - input types like textfield, checkbox, radio etc.
     * @param fieldName - HTML `name` attribute
     * @param defaultValue - Default value set for the field
     * @param relatesToField - To which data set, the field belongs to.
     *      This is useful in case of `Toggle Buttons` which usually have multiple user input fields under them.
     *      E.g.:- consider every Toggle button as tab showing different input elements. So those input elements belong to one data set under `relatesToField`.
     */
    const bindFormEvents = React.useCallback(
        (fieldType, fieldName, defaultValue = '', relatesToField) => {
            // Create save path using both `relatesToField` and `fieldName`. In case, `relatesToField` present, data is stored under child object.
            const savePath = createObjPath(relatesToField, fieldName);

            if (exists(fieldName)) {
                /**
                 * Toggle Buttons will have complex input structure.
                 * E.g:- Under different buttons, there could be multiple child user inputs.
                 * Hence, such user inputs are stored as objects under `relatesToField` parameter.
                 * E.g:
                 */
                const value = dlv(formData, savePath, fieldType === ACTION_TYPES.TOGGLE_BTN_GROUP ? { value: defaultValue } : defaultValue);

                // Make an entry for fieldName.
                dset(initialFormData, savePath, value);
            }

            // Return the event handlers.
            return Object.entries(formEvents[fieldType] || {}).reduce(
                (acc, [eventType, { type, fn }]) => {
                    acc[eventType] = type === EVENT_HANDLER_RETURN_TYPE.DEFAULT ? fn : fn(savePath);
                    return acc;
                }, {}
            );
        }, [formData, formError]
    );


    // Final Context data to pass.
    const contextData = React.useMemo(() => ({ formData, formError, bindFormEvents }), [formData, formError]);


    // On mount, set the initial form state.
    React.useEffect(() => {
        dispatchData({ type: INIT, payload: initialFormData });
    }, []);


    return (
        <form {...props} className={cn(classes.form, className)}>
            <FormContext.Provider value={contextData}>
                <FormControls controls={controls} />
            </FormContext.Provider>
        </form>
    )
}

export default React.memo(Form);

export function useForm() {
    return React.useContext(FormContext);
}