import React from 'react'
import Boton from './Boton.jsx'
import { operaciones } from './helpers/operaciones.js'
const PanelLateral = ({mensaje,setMensaje}) => {
    const { handleChange, agregarValor, borrar, agregarPunto, agregarOperador, resolverOperacion } = operaciones(mensaje, setMensaje);
  return (
    <div className='grid2'>
        <Boton nombre={"÷"} funcion={()=>setMensaje(agregarOperador("/"))}/>
        <Boton nombre={"x"} funcion={()=>setMensaje(agregarOperador("x"))}/>
        <Boton nombre={"+"} funcion={()=>setMensaje(agregarOperador("+"))}/>
        <Boton nombre={"-"} funcion={()=>setMensaje(agregarOperador("-"))}/>
        <Boton nombre={"="} funcion={()=>setMensaje(resolverOperacion(mensaje))}/>
    </div>
  )
}

export default PanelLateral