
export const operaciones = (mensaje, setMensaje) => {
  const operadores = ["-", "+", "/", "x", "%"];
  const handleChange = (e) => {
    setMensaje({ [e.target.name]: agregarValor(mensaje) });
  };

  /**
   * Se utiliza para agregar un nuevo dígito al mensaje
   * @param {String} num Valor a ser agregado
   * @returns {String} mensaje con el nuevo valor agregado
   */
  const agregarValor = (num) => {
    if (noEsValido()) mensaje = borrarTodo();
    return mensaje + num;
  };

  /**
   * Se utiliza para saber si el mensaje que contiene actualmente la pantalla no está vacío,
   * nulo, NaN o un mensaje personalizado
   * @returns {Boolean} valor que espeficica si contiene algo de lo anterior
   */
  const noEsValido = (msj=mensaje) => {
    return (
      msj == "" ||
      msj == null ||
      msj == undefined ||
      msj.includes("NaN") ||
      msj.includes("No se puede")
    );
  };
  /**
   * Se utiliza para borrar el último valor que contiene la pantalla
   * @returns {String} El mensaje anterior sin el último espacio
   */
  const borrar = () => {
    if (noEsValido()) return borrarTodo();
    return mensaje.toString().slice(0, -1); //Se devuelve todo, exceptuando el último caracter
  };

  /**
   * Se utiliza para agregar un punto en la pantalla, en donde se verifica la posición en que será
   * puesto en donde se siguen reglas para evitar errores matemáticos
   * @returns {String} Nuevo mensaje con el punto y reglas si lleva
   * @see encontrarOperador
   */

  const agregarPunto = (msj=mensaje) => {
    if (noEsValido()) return agregarValor("0."); //Si se desea poner primero un punto, agrega un 0 para evitar que se rompa el programa

    const operador = encontrarOperador(msj);
    if (operador != "undefined" && operador != null) {
      const valorSeparado = msj.split(operador);

      const segundoValor = agregarPunto(valorSeparado[1]); //Se agrega punto para el segundo valor
      borrarTodo(); //segundovalor contiene el primer valor, el operador y el segundo valor con el punto
      return segundoValor;
    }

    if (msj.includes(".")) return msj; //Si contiene un . no hace nada
    return agregarValor(".");
  };

  /**
   * Se utiliza para agregar un operador en la pantalla, en donde se evita la presencia
   * de múltiples operadores, además de que se evitan errores matemáticos de operadores
   * sin operandos
   * @param {String} operador Operador que será ingresado en la pantalla
   * @returns {String} Mensaje con operador agregado
   */
  const agregarOperador = (operador) => {
    if (noEsValido()&&operador!="-") mensaje = "0"; //Se agrega 0 para evitar error matemático y error del .includes()
    const actualizaPantalla= encontrarOperador(mensaje);
    if (operadores.includes(actualizaPantalla))
      mensaje=resolverOperacion(mensaje)
    if (operadores.some((v) => mensaje.includes(v))) {
      if(mensaje[0]!="-")
        mensaje = borrar();
      return agregarValor(operador);
    }
    return agregarValor(operador);
  };

  /**
   * Se utiliza para encontrar la respuesta a la operación planteado en la pantalla según
   * el operador presente
   * @returns {number} Resultado de la operación
   */
  const resolverOperacion = (msj) => {
    const operador = encontrarOperador(msj);
    if (noEsValido()){
      return msj;}
    const valorSeparado = msj.split(operador);
    if (noEsValido(valorSeparado[1])) {
      valorSeparado[1] = "0";
    }
    switch (operador) {
      case "-":
        return (
          parseFloat(valorSeparado[0]) - parseFloat(valorSeparado[1])
        ).toString();

      case "+":
        return (
          parseFloat(valorSeparado[0]) + parseFloat(valorSeparado[1])
        ).toString();

      case "/":
        if (valorSeparado[1] == 0) return "No se puede dividir por 0";
        return (
          parseFloat(valorSeparado[0]) / parseFloat(valorSeparado[1])
        ).toString();

      case "x":
        return (
          parseFloat(valorSeparado[0]) * parseFloat(valorSeparado[1])
        ).toString();

      case "%":
        if (valorSeparado[1] == 0) return "No se puede modular por 0";
        return (
          parseFloat(valorSeparado[0]) % parseFloat(valorSeparado[1])
        ).toString();
      default: 
        return msj;
    }
  };
  /**
   * Se utiliza para encontrar el operador en un mensaje
   * @param {String} valores Mensaje a encontrar el operador
   * @returns {(string | undefined)} Retorna el operador si se encuentra, de lo contrairio retorna
   * undefined
   */
  const encontrarOperador = (valores) => {
    if (valores == null || valores === "") 
      return " ";
    if(valores[0]=="-")
      valores=valores.slice(1, -1)
    return operadores.find((operador) => valores.includes(operador));
  };

  /**
   * Se utiliza para vaciar la pantalla
   * @returns {String} Cadena de texto vacía
   */
  const borrarTodo = () => {
    return "";
  };

  return {
    handleChange,
    agregarValor,
    borrar,
    agregarPunto,
    agregarOperador,
    resolverOperacion,
    borrarTodo,
  };
};
