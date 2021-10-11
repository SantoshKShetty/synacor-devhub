import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import dlv from 'dlv';
import { useConfig } from '../provider/config';
import { useScreenAndLayout } from '../provider/screen-layout';
import { composeComponents } from '../utils/component';
import { exists } from '../utils/basics';

export default function Router() {
    const { routes = [] } = useConfig();
    const screenAndLayout = useScreenAndLayout();

    return composeComponents(
        BrowserRouter,
        Switch,
        [Suspense, { fallback: <div>Loading app...</div> }]
    )(
        routes.map(({ path, descriptor, screen, layout }, key) => {
            const Screen = dlv(screenAndLayout, `screens.${screen}`, null);
            const Layout = dlv(screenAndLayout, `layouts.${layout}`, null);

            if (!exists(Screen) || !exists(Layout)) return;

            const RouteComponent = (
                <Layout>
                    <Screen descriptor={descriptor} />
                </Layout>
            );

            return composeComponents(
                [Route, {key: `route-${key}`, path, exact: true }]
            )(RouteComponent);
        })
    );
}