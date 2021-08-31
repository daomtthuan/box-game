import Color from 'color';

import { Model } from '@/types/component';
import { sin } from '@/utilities/math/triangle';

export class AboveObstacle implements Model {
  public element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public side1: number;
  public side2: number;
  public side3: number;
  public angle1: number;
  public angle2: number;
  public width: number;
  public height: number;
  public color: Color;
  public position: {
    x: number;
    y: number;
  };

  public constructor(props: { side1: number; side2: number; side3: number; angle1: number; angle2: number; color: Color }) {
    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d')!;
    this.side1 = props.side1;
    this.side2 = props.side2;
    this.side3 = props.side3;
    this.angle1 = props.angle1;
    this.angle2 = props.angle2;
    this.color = props.color;
    this.position = { x: 0, y: 0 };

    const width1 = sin.side(this.side1, 90, 180 - this.angle1);
    const width2 = sin.side(this.side2, 90, 180 - this.angle2);
    const height1 = sin.side(this.side1, 90, this.angle1 - 90);
    const height2 = sin.side(this.side1, 90, this.angle2 - 90);

    this.width = width1 + width2;
    this.height = height1 + height2 + this.side3;

    this.element.width = Math.ceil(this.width);
    this.element.height = Math.ceil(this.height);
    this.element.style.position = 'absolute';

    this.context.strokeStyle = Color(this.color).lighten(0.5).string();

    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(width1, 0);
    this.context.lineTo(width1, this.height);
    this.context.lineTo(0, height2 + this.side3);
    this.context.closePath();
    this.context.stroke();
    this.context.fillStyle = Color(this.color).darken(0.15).string();
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(width1, 0);
    this.context.lineTo(this.width, 0);
    this.context.lineTo(this.width, height1 + this.side3);
    this.context.lineTo(width1, this.height);
    this.context.closePath();
    this.context.stroke();
    this.context.fillStyle = Color(this.color).string();
    this.context.fill();
  }

  public setPosition(position: { x?: number; y?: number }) {
    this.position = {
      x: position.x ?? this.position.x,
      y: position.y ?? this.position.y,
    };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }
}
