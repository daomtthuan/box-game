import { Model } from '@/types/component';
import { color } from '@/utilities/theme';

export class Background implements Model {
  public element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public position: {
    x: number;
    y: number;
  };

  public constructor(props: { width: number; height: number }) {
    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d')!;
    this.position = { x: 0, y: 0 };
    this.width = props.width;
    this.height = props.height;

    this.element.width = Math.ceil(this.width);
    this.element.height = Math.ceil(this.height);
    this.element.style.position = 'absolute';
    this.element.style.zIndex = '-999';
    this.element.style.left = '0px';
    this.element.style.top = '0px';

    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.width, 0);
    this.context.lineTo(this.width, this.height);
    this.context.lineTo(0, this.height);
    this.context.closePath();
    this.context.fillStyle = color.secondary.lighten(0.9).string();
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
