import { useState } from 'react'
export const operaciones = (mensaje, setMensaje) => {
  const operadores = ["-", "+", "/", "x", "%"];
  const handleChange = (e) => {
    setMensaje({[e.target.name]: agregarValor(mensaje) }); };

  const agregarValor = (num) => {
    if(mensaje.includes("No se puede dividir"))
      mensaje=borrarTodo();
    return mensaje + num;
  };

  const borrar = () => {
    if(mensaje.includes("NaN")|| mensaje.includes("No se puede dividir"))
      return borrarTodo();
    return mensaje.toString().slice(0, -1); //Se devuelve todo, exceptuando el último caracter
  };

  const agregarPunto = () => {
    if (mensaje == null|| mensaje==="") return agregarValor("0."); //Si se desea poner primero un punto, agrega un 0 para evitar que se rompa el programa

    if (mensaje.includes(".")) 
      return mensaje; //Si contiene un . no hace nada
    return agregarValor(".");
  };

  const agregarOperador = (operador) => {
    if (operadores.some(v => mensaje.includes(v)))  {
        mensaje=borrar();
        return agregarValor(operador);
    }
    return agregarValor(operador);
  };

  const resolverOperacion = () => {
    const operador = encontrarOperador(mensaje);
    const valorSeparado = mensaje.split(operador);
    switch (operador) {
      case "-":
        return parseFloat(valorSeparado[0]) - parseFloat(valorSeparado[1]);

      case "+":
        return parseFloat(valorSeparado[0]) + parseFloat(valorSeparado[1]);

      case "/":
        if(valorSeparado[1]==0)
          return "No se puede dividir por 0";
        return parseFloat(valorSeparado[0]) / parseFloat(valorSeparado[1]);

      case "x":
        return parseFloat(valorSeparado[0]) * parseFloat(valorSeparado[1]);

      case "%":
        return parseFloat(valorSeparado[0]) % parseFloat(valorSeparado[1]);
    }
  };

  const encontrarOperador = (valores) => {
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
