  // Função debounce para limitar chamadas da mesma função em um curto espaço de tempo
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId); // Cancela o timeout anterior
      timeoutId = setTimeout(() => func(...args), delay); // Define um novo timeout
    };
  };

  export default debounce;