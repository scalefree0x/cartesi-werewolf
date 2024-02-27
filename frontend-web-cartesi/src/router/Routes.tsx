import React from 'react';
import { BrowserRouter as Router, Routes as Switch, Route, } from 'react-router-dom'
import { Route as RouteType } from '../types';

const Routes = ({ routes }: { routes: RouteType[] }) => {
    return (
        <Router>
            <Switch>
                {routes.map((route: RouteType) => (
                    <Route path={route.path} element={<route.element />} />
                ))}
            </Switch>
        </Router>
    )
}

export default Routes