import { useState } from 'react'
export const operaciones = (mensaje, setMensaje) => {
  const operadores = ["-", "+", "/", "x", "%"];
  const handleChange = (e) => {
    setMensaje({[e.target.name]: agregarValor(mensaje) }); };

  const agregarValor = (num) => {
    if(noEsValido())
      mensaje=borrarTodo();
    return mensaje + num;
  };

  const noEsValido=()=>{
    return ( mensaje===""||mensaje == null||mensaje.includes("NaN")|| mensaje.includes("No se puede"))
  }

  const noEsValidoMsj=(msj)=>{
    return ( msj===""||msj == null||msj.includes("NaN")|| msj.includes("No se puede"))
  }

  const borrar = () => {
    if(noEsValido())
      return borrarTodo();
    return mensaje.toString().slice(0, -1); //Se devuelve todo, exceptuando el último caracter
  };

  const agregarPunto = () => {
    if (noEsValido()) 
      return agregarValor("0."); //Si se desea poner primero un punto, agrega un 0 para evitar que se rompa el programa

    const operador =encontrarOperador(mensaje);
    if(operador!="undefined"&& operador!=null)
    {
      const valorSeparado = mensaje.split(operador);
      
      const segundoValor= agregarPuntoMultiple(valorSeparado[1]);
      borrarTodo();
      return segundoValor;
    }

    if (mensaje.includes(".")) 
      return mensaje; //Si contiene un . no hace nada
    return agregarValor(".");
  };

  const agregarPuntoMultiple =(valor)=>{
    if (noEsValido()) 
      return agregarValor("0."); 
    if (valor.includes(".")) 
      return valor;  
    return agregarValor(".");
  }

  const agregarOperador = (operador) => {
    if (operadores.some(v => mensaje.includes(v)))  {
        mensaje=borrar();
        return agregarValor(operador);
    }
    if(noEsValido())
      mensaje="0";
    return agregarValor(operador);
  };

  const resolverOperacion = () => {
    const operador = encontrarOperador(mensaje);
    if(noEsValido())
      return borrarTodo();
    const valorSeparado = mensaje.split(operador);
    if(noEsValidoMsj(valorSeparado[1])){
      valorSeparado[1]="0";
    }
    switch (operador) {
      case "-":
        return (parseFloat(valorSeparado[0]) - parseFloat(valorSeparado[1])).toString();

      case "+":
        return (parseFloat(valorSeparado[0]) + parseFloat(valorSeparado[1])).toString();

      case "/":
        if(valorSeparado[1]==0)
          return "No se puede dividir por 0";
        return( parseFloat(valorSeparado[0]) / parseFloat(valorSeparado[1])).toString();

      case "x":
        return (parseFloat(valorSeparado[0]) * parseFloat(valorSeparado[1])).toString();

      case "%":
        if(valorSeparado[1]==0)
          return "No se puede modular por 0";
        return (parseFloat(valorSeparado[0]) % parseFloat(valorSeparado[1])).toString();
    }
  };

  const encontrarOperador = (valores) => {
    if (valores == null|| valores==="") 
      return " ";
    return operadores.find((operador) => valores.includes(operador));
  };

  const borrarTodo=()=>{return ""}

  return {
    handleChange,
    agregarValor,
    borrar,
    agregarPunto,
    agregarOperador,
    resolverOperacion,
    borrarTodo
  };
};
