import React from 'react';
import mergeOptions from 'merge-options';
import { createTheme, makeStyles, ThemeProvider as ReactThemeProvider } from '@material-ui/core/styles';
import { getThemeResource } from '../utils/resource-path';
import { fetchJsonResource } from '../utils/fetch';

// Default theme settings can be provided here which can be then overridden by client specific theme settings.
const DEFAULT_THEME = {
	props: {
		MuiButtonBase: {
			disableRipple: true //Ripple used for select states
		}
	},
	palette: {
		custom: {} // Custom CSS rules that can be added in client specific theme config files.
	}
};

export default function ThemeProvider(props) {
    const [theme, setTheme] = React.useState();

    React.useEffect(() => {
        fetchJsonResource(getThemeResource())
            .then(overrides => {
                setTheme(mergeOptions(DEFAULT_THEME, overrides))
            }).catch(e => {
                console.log(`Falling back to default theming due to error: ${e}`);
                setTheme(DEFAULT_THEME);
            });
    }, []);

    return theme ? <ReactThemeProvider {...props} theme={createTheme(theme)}/>: null
};

export { makeStyles };