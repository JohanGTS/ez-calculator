import React from 'react'
import { operaciones } from './helpers/operaciones.js'
import "./PanelPrincipal.css"

const Pantalla = ({mensaje,setMensaje}) => {
  const { handleChange, agregarValor, borrar, agregarPunto, agregarOperador, resolverOperacion } = operaciones(mensaje, setMensaje);
  return (
    <div>
        <input className='pantalla' name={"pantalla"} type="text" value={mensaje} onChange={handleChange} readOnly/>
    </div>
  )
}

export default Pantalla