export function generateRandomNumberID(length:number) {
    // 1. Calcular el valor mínimo (10^(length - 1), ej: 100000 para length=6)
    const min = Math.pow(10, length - 1);
    
    // 2. Calcular el valor máximo (10^length - 1, ej: 999999 para length=6)
    const max = Math.pow(10, length) - 1;
    
    // 3. Generar un entero aleatorio dentro del rango [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}