import React from 'react';
import cn from 'classnames';
import { makeStyles } from '../../provider/theme';
import { generateComponent } from '../../utils/component';
import { TYPE_TEXTFIELD, TYPE_SUBMIT } from '../../constants/fields';
import { exists } from '../../utils/basics';
import { REPLACE } from '../../constants/reducer-actions';

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
    if (type === REPLACE) {
        return { ...state, ...payload };
    }

    return state;
}

const FormContext = React.createContext({});

/**
 * `FormControls` returns computed Components.
 *
 * This Wrapper is needed because, directly including the function call as `child` inside `Provider`
 * makes the `Provider` to immediately invoke function execution before `FormContext` is available.
 * Wrapping this inside `FormControls` makes delayed execution so that `FormContext` is available inside `generateComponent` function.
 *
 * @param {Object|undefined} controls - form controls (text field, submit button etc.) received from Config Descriptor.
 */
const FormControls = ({ controls }) => generateComponent(controls);

const Form = ({ form: { controls } = {}, className, onSubmit, ...props }) => {
    const classes = styles();

    // Data/Error stores.
    const [formData, dispatchData] = React.useReducer(storeUpdaterFn, {});
    const [formError, dispatchError] = React.useReducer(storeUpdaterFn, {});


    // Event callbacks.
    const handleTextFieldOrAreaInput = event => {
        const { target: { name, value } } = event;

        if (exists(name) && exists(value)) {
            dispatchData({ type: REPLACE, payload: { [name]: value } });
        }
    }

    const handleSubmit = () => {
        console.log('Data submitted: ', formData);
        onSubmit && onSubmit();
    }


    const formEvents = {
        [TYPE_TEXTFIELD]: {
            onChange: handleTextFieldOrAreaInput
        },
        [TYPE_SUBMIT]: {
            onClick: handleSubmit
        }
    }

    const contextData = React.useMemo(() => ({ formData, formError, formEvents }), [ formData, formError ]);

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