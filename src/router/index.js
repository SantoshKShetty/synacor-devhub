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

    return composeComponents(BrowserRouter, Switch)(
        routes.map(({ path, exact = true, descriptor, redirectTo, screen, layout, subScreens }, key) => {
            const Screen = Screens[screen];
            const Layout = Layouts[layout];
            const routeKey = `route-${key}`;

            if (exists(redirectTo)) {
                return composeComponents(
                    [Route, { key: routeKey, path, exact }],
                    [Redirect, { to: redirectTo }]
                )()
            } else if (exists(Screen) && exists(Layout)) {
                return composeComponents(
                    [Route, { key: routeKey, path, exact }],
                    [Suspense, { fallback: <div>Loading app...</div> }],
                    descriptor && [DescriptorLoader, { descriptor, genericInfo, key: descriptor }]
                )(<Screen info={genericInfo} Layout={Layout} subScreens={subScreens} />)
            } else {
                return null;
            }
        }).filter(exists)
    );
}