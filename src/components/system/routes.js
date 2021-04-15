import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from '../../config/routes'
import { Login, Register } from '../pages'
import Dashboard from '../pages/dashboard/index'
import useToken from '../../useToken'


function Routes(){
    const { token, setToken } = useToken();
    if (!token) {
        return <Login setToken={setToken} />; //insertar setToken(prop) al componente Login
    }
    return (
        <div>
<Switch>
        <Route path = {routes.register}>
            <Register/>
        </Route>
        {/* <Route path = {routes.login}>
            <Login />
        </Route> */}
        <Route path = {routes.dashboard}>
            <Dashboard />
        </Route>
    </Switch>
        </div>
    );
}

export default Routes