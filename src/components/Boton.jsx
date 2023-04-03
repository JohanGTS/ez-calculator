import React from 'react'
import PropTypes from 'prop-types'
import "./Boton.css"

import { useState } from 'react'
const Boton = ({nombre,funcion}) => {

  const [mensaje, setMensaje] = useState(nombre)
  return (
    <>
        <button  onClick={funcion} className='boton'>{nombre}</button> 
    </>
  )
}

Boton.propTypes = {
    nombre:PropTypes.string,
}

export default Boton