import React, { useCallback } from 'react'
import { useState } from 'react'
import Boton from './Boton.jsx'
import { operaciones } from './helpers/operaciones.js'
import "./PanelPrincipal.css"
const PanelPrincipal = ({mensaje, setMensaje}) => {
  const { agregarValor, agregarPunto} = operaciones(mensaje, setMensaje);
  return (
    <div className='gridContenedor'>
        <Boton nombre={"7"} funcion={()=>setMensaje(agregarValor("7"))}/>
        <Boton nombre={"8"} funcion={()=>setMensaje(agregarValor("8"))}/>
        <Boton nombre={"9"} funcion={()=>setMensaje(agregarValor("9"))}/>
        <Boton nombre={"4"} funcion={()=>setMensaje(agregarValor("4"))}/>
        <Boton nombre={"5"} funcion={()=>setMensaje(agregarValor("5"))}/>
        <Boton nombre={"6"} funcion={()=>setMensaje(agregarValor("6"))}/>
        <Boton nombre={"3"} funcion={()=>setMensaje(agregarValor("3"))}/>
        <Boton nombre={"2"} funcion={()=>setMensaje(agregarValor("2"))}/>
        <Boton nombre={"1"} funcion={()=>setMensaje(agregarValor("1"))}/>
        <Boton nombre={"00"} funcion={()=>setMensaje(agregarValor("00"))}/>
        <Boton nombre={"0"} funcion={()=>setMensaje(agregarValor("0"))}/>
        <Boton nombre={"."} funcion={()=>setMensaje(agregarPunto())}/>
    </div>
  )
}

export default PanelPrincipal