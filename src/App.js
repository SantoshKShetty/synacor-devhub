import React from 'react';
import Router from "./router";
import { composeComponents } from "./utils/component";
import ConfigProvider from "./provider/config";
import ThemeProvider from "./provider/theme";
import ScreenAndLayoutProvider from "./provider/screen-layout";

export default function App() {
    return composeComponents(
        ConfigProvider,
        ThemeProvider,
        ScreenAndLayoutProvider
    )(<Router />);
}