import React, { useState, useEffect, useCallback } from 'react'
import isEmpty from 'lodash/isEmpty' //lodash->ayuda a trabajar con arrays.comprueba si un objeto, colleción.. es vacío
import some from 'lodash/some' //verificamos los elementos de un array
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

import { TextInput, Button, FormHeader, List } from '../../atoms/'
import { validateEmail, validatePassword } from '../../../utils'
import * as api from '../../../api'
import gwpLogo from '../../../assets/images/gwp-blanco-logo.png'


import Styles from './styled'

/**
 * Función para solicitar al servidor con el método POST
 * Agregamos el servicio directamente en el componente
 * ***** Es conveniente llamar a una API mediante Hook - actualizar - ****
 */

 async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then(data => data.json());
}


export default function Login ({ setToken })  {
  /**
   * Guardamos en un estado local el usuario y la contraseña
   */
    // const [username, setUserName] = useState();
    // const [password, setPassword] = useState();
  


  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [isFetching, setIsfetching] = useState(false)

  const validate = useCallback(() => {
    const newErrors = {
      email: '',
      password: '',
    }

   // if (!data.firstName) newErrors.firstName = 'Campo obligatorio'

   // if (!data.lastName) newErrors.lastName = 'Campo obligatorio'

    if (!data.email) newErrors.email = 'Campo obligatorio'
    else if (!validateEmail(data.email)) newErrors.email = 'Email inválido'

    if (!data.password) newErrors.password = 'Campo obligatorio'
    else if (!validatePassword(data.password)) newErrors.password = 'Contraseña debe tener mínimo 8 caracteres'

    setErrors(newErrors)
  }, [data])

  useEffect(() => {
    validate()
  }, [data, validate])

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleBlur = event => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    })
  }
  /**
   * Creamos un controlador de envío de formulario que llamará a loginUser con user y pass
   */
  const handleSubmit = async event => {
    event.preventDefault()
    const token = await loginUser({
      data
    });
    setToken(token);
    //*** */
    const inValidForm = some(errors, error => !isEmpty(error))
    if (!inValidForm) {
      // eslint-disable-next-line no-console
      console.log({ data })

      setIsfetching(true)
      await api.register()
      setIsfetching(false)

      toast.success('Bienvenido/a!!!')
    } else {
      setTouched({
        email: true,
        password: true,
      })
    }
  }

  return (
    <Styles>
      <FormHeader logo={gwpLogo} title='' info='' />
      <form onSubmit={handleSubmit}>
      <List/>
        <TextInput
          placeholder='Email'
          name='email'
          type='email'
          value={data.email}
          touched={touched.email}
          error={errors.email}
          onChange={handleChange}//{e => setUserName(e.target.value)}//
          onBlur={handleBlur}
        />
        <TextInput
          placeholder='Contraseña'
          name='password'
          type='text'
          value={data.password}
          touched={touched.password}
          error={errors.password}
          onChange={handleChange}//{e => setPassword(e.target.value)}//
          onBlur={handleBlur}
        />
        <Button label='Enviar' isFetching={isFetching} />
      </form>
    </Styles>
  )
}
/**
 * Verificamos los props de nuestro componente Login de forma dinámica en tiempo de ejecución
 * Mediante una asignación desestructurada para extraer el prop del setToken
 */
 Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
//export default Login