import { useState } from 'react'
import { operaciones } from './components/helpers/operaciones.js'
import Pantalla from './components/Pantalla.jsx'
import './App.css'
import PanelPrincipal from './components/PanelPrincipal.jsx'
import PanelSuperior from './components/PanelSuperior.jsx'
import PanelLateral from './components/PanelLateral.jsx'

function App() {
  const [mensaje, setMensaje] = useState("")
  const { handleChange, agregarValor, borrar, agregarPunto, agregarOperador, resolverOperacion } = operaciones(mensaje, setMensaje);
//
  return (
    <div className="App">
      <Pantalla mensaje={mensaje} setMensaje={setMensaje}/>
      <div className="segundoPanel">
         
          <div style={{display:'flex', flexDirection:"column"}}> 
            <PanelSuperior mensaje={mensaje} setMensaje={setMensaje} />
            <PanelPrincipal mensaje={mensaje} setMensaje={setMensaje}/>
          </div>
          
          <PanelLateral mensaje={mensaje} setMensaje={setMensaje}/>
      </div>
    
    </div>
  )
}

export default App
