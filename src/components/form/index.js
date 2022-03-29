import React from 'react';
import cn from 'classnames';
import dlv from 'dlv';
import { dset } from 'dset';
import { makeStyles } from '../../provider/theme';
import { generateComponent } from '../../utils/component';
import { TYPE_TEXTFIELD, TYPE_SUBMIT, TYPE_TOGGLE_BTN_GROUP } from '../../constants/fields';
import { createObjPath, exists } from '../../utils/basics';
import { INIT, REPLACE } from '../../constants/reducer-actions';

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
const Form = ({ form: { controls } = {}, className, onSubmit, ...props }) => {
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
        console.log('Data submitted: ', formData);
        onSubmit && onSubmit();
    }


    const formEvents = React.useMemo(() => ({
        [TYPE_TEXTFIELD]: {
            onChange: {
                type: EVENT_HANDLER_RETURN_TYPE.EXEC,
                fn: handleTextFieldOrAreaInput
            }
        },
        [TYPE_TOGGLE_BTN_GROUP]: {
            onChange: {
                type: EVENT_HANDLER_RETURN_TYPE.EXEC,
                fn: handleToggleBtnChange
            }
        },
        [TYPE_SUBMIT]: {
            onClick: {
                type: EVENT_HANDLER_RETURN_TYPE.DEFAULT,
                fn: handleSubmit
            }
        }
    }), [formData, formError]);


    // Main Single event binder used by the Form Controls. Make sure the field has `name` attribute.
    const bindFormEvents = React.useCallback(
        (fieldType, fieldName, fieldValue = '', relatesToField) => {
            const savePath = createObjPath(relatesToField, fieldName);

            if (exists(fieldName)) {
                const value = dlv(formData, savePath, fieldType === TYPE_TOGGLE_BTN_GROUP ? { value: fieldValue } : fieldValue);

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