import { Model } from '@/types/component';

export class Panel implements Model {
  public element: HTMLDivElement;
  public position: {
    x: number;
    y: number;
  };

  public constructor() {
    this.element = document.createElement('div');
    this.position = { x: 0, y: 0 };

    this.element.style.position = 'absolute';
    this.element.style.zIndex = '999';
    this.element.style.left = '0px';
    this.element.style.top = '0px';

    this.element.className = 'bg-light border border-dark h4 m-3 p-3';
  }

  public setPosition(position: { x?: number; y?: number }) {
    this.position = {
      x: position.x ?? this.position.x,
      y: position.y ?? this.position.y,
    };

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  public setContent(content: string) {
    this.element.innerHTML = content;
  }
}
