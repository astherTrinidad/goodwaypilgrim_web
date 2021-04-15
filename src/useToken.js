/** Creación de un enlace de token personalizado (Hook)
 * Eliminarmos la lógica de implementación del componente para reutilizarlo en varios componentes
 */

 import { useState } from 'react';

 export default function useToken() {
   /** Recuperamos el token para acceder a la página correspondiente
    * getItem: pasamos la clave como argumento
    * convertimos la cadena en un objeto y devolvemos el valor del token
    * Para encadenar el token con la aplicación usamos ?. ya que si nunca ha accedido aparecerá como "undefined"
    */
   const getToken = () => {
     const tokenString = sessionStorage.getItem('token');
     const userToken = JSON.parse(tokenString);
     return userToken?.token;
   };
 
   /**
    * useState Hook: creamos y declaramos el estado obteniendo el token
    */
   const [token, setToken] = useState(getToken());
 
   /** Almacenamos el argumento userToken en sessionStorage y en el estado
    * setItem: clave como primer argumento, cadena como segundo
    * convertimos el objeto userToken a una cadena
    */
   const saveToken = userToken => {
     sessionStorage.setItem('token', JSON.stringify(userToken));
     setToken(userToken.token);
   };
   /**
    * Devolvemos un objeto que tenga token y saveToken almacenados en setToken
    */
   return {
     setToken: saveToken,
     token,
   };
 }
 