import { Model } from '@/types/component';

export class Game {
  public stop: boolean;
  public animations: {
    [animation: string]: boolean;
  };
  public window: {
    height: number;
    width: number;
  };
  public settings: {
    fps: number;
  };

  public constructor() {
    this.stop = false;
    this.animations = {};
    this.settings = {
      fps: 60,
      ...JSON.parse(window.localStorage.settings ?? '{}'),
    };
    window.localStorage.settings = JSON.stringify(this.settings);

    this.window = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  public renderModel(model: Model, position: { x: number; y: number }) {
    document.body.appendChild(model.element);
    model.setPosition(position);
  }

  public renderAnimation(name: string, action: () => void) {
    this.animations[name] = true;

    const animate = () => {
      if (!this.animations[name]) {
        return;
      }

      action();
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / this.settings.fps);
    };

    animate();
  }

  public onClick(action: (event: MouseEvent) => void) {
    document.onclick = (event) => {
      action(event);
    };
  }

  public stopAnimation(animation?: string) {
    if (animation) {
      this.animations[animation] = false;
      return;
    }

    for (const animation in this.animations) {
      this.animations[animation] = false;
    }
  }
}
