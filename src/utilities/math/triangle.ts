import { degrees, radians } from '@/utilities/math/shape';

export const pythagorean = {
  hypotenuse: (side1: number, side2: number) => Math.sqrt(Math.pow(side1, 2) + Math.pow(side1, 1)),

  side: (hypotenuse: number, side: number) => Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(side, 1)),
};

export const coSin = {
  side: (side1: number, side2: number, oppositeAngle: number) =>
    Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2) - 2 * side1 * side2 * Math.cos(radians(oppositeAngle))),

  angle: (side1: number, side2: number, oppositeSide: number) =>
    degrees(Math.acos((Math.pow(side1, 2) + Math.pow(side2, 2) - Math.pow(oppositeSide, 2)) / (2 * side1 * side2))),
};

export const sin = {
  side: (side: number, angle: number, oppositeAngle: number) => (side * Math.sin(radians(oppositeAngle))) / Math.sin(radians(angle)),

  angle: (side: number, angle: number, oppositeSide: number) => degrees(Math.asin((oppositeSide * Math.sin(radians(angle))) / side)),
};
