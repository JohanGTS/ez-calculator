import React from 'react'

import Boton from './Boton.jsx'
import "./PanelPrincipal.css"
import { operaciones } from './helpers/operaciones.js'
const PanelSuperior = ({mensaje,setMensaje}) => {

const { borrar, agregarOperador,borrarTodo } = operaciones(mensaje, setMensaje);

  return (
    <div className='gridContenedor'>
        <Boton nombre={"DEL"} funcion={()=>setMensaje(borrar())}/>
        <Boton nombre={"CE"} funcion={()=>setMensaje(borrarTodo())}/>
        <Boton nombre={"%"} funcion={()=>setMensaje(agregarOperador("%"))}/>
    </div>
  )
}

export default PanelSuperior