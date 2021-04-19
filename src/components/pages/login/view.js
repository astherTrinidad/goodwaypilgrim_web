import React, { useState, useEffect, useCallback } from 'react'
import isEmpty from 'lodash/isEmpty' //lodash->ayuda a trabajar con arrays.comprueba si un objeto, colleción.. es vacío
import some from 'lodash/some' //verificamos los elementos de un array
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import { TextInput, Button, FormHeader, List } from '../../atoms/'
import { validateEmail, validatePassword } from '../../../utils'
// import * as api from '../../../api'
import gwpLogo from '../../../assets/images/gwp-blanco-logo.png'

import Styles from './styled'
import useToken from '../../system/useToken'

/**
 * Función para solicitar al servidor con el método POST
 * Agregamos el servicio directamente en el componente
 * ***** Es conveniente llamar a una API mediante Hook - actualizar - ****
 */

 async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export default function Login() {
  /**
   * Guardamos en un estado local el usuario y la contraseña
   */
    // const [email, setUserName] = useState();
    // const [password, setPassword] = useState();
  
   // const Login = ({ setToken }) => {
    const {setToken} = useToken();
    const history = useHistory();

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
   const handleSubmit = async e => {
    e.preventDefault();
    const invalidForm = some(errors, error => !isEmpty(error))
    if (!invalidForm) {
      console.log({ data })
      try {
        setIsfetching(true)
        const token = await loginUser({
          data
        });
        setToken(token);
        toast.success('Bienvenido/a!!!')
        history.replace('/dashboard')
      } catch(e) {
        setIsfetching(false)
        toast.error('Ha ocurrido un error')
      }
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
          onChange={handleChange}//{e => setUserName(e.target.value)}
          onBlur={handleBlur}
        />
        <TextInput
          placeholder='Contraseña'
          name='password'
          type='password'
          value={data.password}
          touched={touched.password}
          error={errors.password}
          onChange={handleChange}//{e => setPassword(e.target.value)}//
          onBlur={handleBlur}
        />
        <Button label='Enviar' type="submit" isFetching={isFetching} />
      </form>
    </Styles>
  )
}

//export default Login

