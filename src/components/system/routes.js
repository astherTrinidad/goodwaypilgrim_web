import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from '../../config/routes'
import Login from '../pages/login/index'
import Register  from '../pages/register/index'
import Dashboard from '../pages/dashboard/index'
import useToken from './useToken';


/**
 * Dentro de setToken, guardamos el userToken como argumento para almacenarlo en la sesión
 * 'token'-> clave /cadena->2º argumento 
 * convertimos userToken de un objeto a un objeto JSON
 */
//  function setToken(userToken) {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
// }

function Routes(){
    //Establecemos valores de retorno para token y setToken
    const {token, setToken} = useToken();
    
    //Agregamos la función setToken como prop al Login
    if(!token) {
        return <Login setToken={setToken} />
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