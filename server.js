//Inicializo una nueva app llamada express y almaceno el resultado en una constante (app)
const express = require('express');
/**
 * //importación de cors: intercambio de recursos de origen cruzado.
 * Restringe las solicitudes HTTP complejas de varios orígenes a los recursos de la API REST
 */
const cors = require('cors');
const app = express();

app.use(cors()); //añadimos cors como un middleware
//Escuchamos una ruta específica
app.use('/login', (req, res) => {
  res.send({
    token: 'token1',
  });
});
//ejecutamos el servidor en el puerto 8080
app.listen(8080, () =>
  console.log('La API se está ejecutando en http://localhost:8080/login')
);
