
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
  const noEsValido = () => {
    return (
      mensaje === "" ||
      mensaje == null ||
      mensaje.includes("NaN") ||
      mensaje.includes("No se puede")
    );
  };
  /**
   * Se utiliza para saber si el mensaje que contiene actualmente la pantalla no está vacío,
   * nulo, NaN o un mensaje personalizado
   * @deprecated en la próxima actualización de optimización de código será removida
   * @param {String} msj mensaje a verificar la validez
   * @returns {Boolean} valor que espeficica si contiene algo de lo anterior
   */
  const noEsValidoMsj = (msj) => {
    return (
      msj === "" ||
      msj == null ||
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

  const agregarPunto = () => {
    if (noEsValido()) return agregarValor("0."); //Si se desea poner primero un punto, agrega un 0 para evitar que se rompa el programa

    const operador = encontrarOperador(mensaje);
    if (operador != "undefined" && operador != null) {
      const valorSeparado = mensaje.split(operador);

      const segundoValor = agregarPuntoMultiple(valorSeparado[1]); //Se agrega punto para el segundo valor
      borrarTodo(); //segundovalor contiene el primer valor, el operador y el segundo valor con el punto
      return segundoValor;
    }

    if (mensaje.includes(".")) return mensaje; //Si contiene un . no hace nada
    return agregarValor(".");
  };

  /**
   * Se utiliza para agregar un punto en la pantalla, en donde se verifica la posición en que será
   * puesto en donde se siguen reglas para evitar errores matemáticos
   * @deprecated en la próxima actualización de optimización de código será removida
   * @param {String} valor Valor al que será agregado un punto
   * @returns {String} Nuevo mensaje con el punto y reglas si lleva
   */

  const agregarPuntoMultiple = (valor) => {
    if (noEsValido()) return agregarValor("0.");
    if (valor.includes(".")) return valor;
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
    if (noEsValido()) mensaje = "0"; //Se agrega 0 para evitar error matemático y error del .includes()
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
  const resolverOperacion = () => {
    const operador = encontrarOperador(mensaje);
    if (noEsValido()) return mensaje;
    const valorSeparado = mensaje.split(operador);
    if (noEsValidoMsj(valorSeparado[1])) {
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
    }
  };
  /**
   * Se utiliza para encontrar el operador en un mensaje
   * @param {String} valores Mensaje a encontrar el operador
   * @returns {(string | undefined)} Retorna el operador si se encuentra, de lo contrairio retorna
   * undefined
   */
  const encontrarOperador = (valores) => {
    if (valores == null || valores === "") return " ";
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
