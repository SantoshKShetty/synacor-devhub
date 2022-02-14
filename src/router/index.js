import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useConfig } from '../provider/config';
import { useLayout } from '../provider/layout';
import { useScreen } from '../provider/screen';
import { composeComponents } from '../utils/component';
import { exists } from '../utils/basics';
import DescriptorLoader from '../enhancers/descriptor-loader';

export default function Router() {
    const { genericInfo = {}, routes = [] } = useConfig();
    const Layouts = useLayout();
    const [Screens] = useScreen();

    return composeComponents(
        BrowserRouter,
        Switch,
        [Suspense, { fallback: <div>Loading app...</div> }]
    )(
        routes.map(({ path, descriptor, redirectTo, screen, layout, subScreens }, key) => {
            const Screen = Screens[screen];
            const Layout = Layouts[layout];

            if (!exists(Screen) || !exists(Layout)) return;

            return composeComponents(
                [Route, { key: `route-${key}`, path, exact: true }],
                redirectTo ? [Redirect, { to: redirectTo }] : (descriptor && [DescriptorLoader, { descriptor, genericInfo }])
            )(<Screen info={genericInfo} Layout={Layout} subScreens={subScreens} />);
        })
    );
}