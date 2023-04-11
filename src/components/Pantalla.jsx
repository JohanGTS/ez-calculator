import React from 'react'
import { operaciones } from './helpers/operaciones.js'
import "./PanelPrincipal.css"

const Pantalla = ({mensaje,setMensaje}) => {
  const { handleChange} = operaciones(mensaje, setMensaje);
  return (
    <div>
        <input className='pantalla' name={"pantalla"} type="text" value={mensaje} onChange={handleChange} readOnly style={{paddingLeft:"0.16rem"}}/>
    </div>
  )
}

export default Pantalla