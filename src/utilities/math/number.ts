export const randomArbitrary = (number1: number, number2: number) => Math.random() * Math.abs(number2 - number1) + (number1 < number2 ? number1 : number2);

export const positiveNumber = (number: number) => (number < 0 ? 0 : number);
