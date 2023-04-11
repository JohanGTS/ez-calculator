import React from 'react'
import PropTypes from 'prop-types'
import "./Boton.css"

const Boton = ({nombre,funcion}) => {

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