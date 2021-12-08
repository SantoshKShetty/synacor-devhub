import React from 'react';
import Router from "./router";
import { composeComponents } from "./utils/component";
import ConfigProvider from "./provider/config";
import ThemeProvider from "./provider/theme";
import LayoutProvider from './provider/layout';
import ScreenProvider from './provider/screen';

export default function App() {
    return composeComponents(
        ConfigProvider,
        ThemeProvider,
        LayoutProvider,
        ScreenProvider
    )(<Router />);
}