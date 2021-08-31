import { Game } from '@/core/game';
import { AboveObstacle } from '@/models/above-obstacle';
import { BelowObstacle } from '@/models/below-obstacle';
import { Player } from '@/models/player';
import { randomArbitrary } from '@/utilities/math/number';
import { color } from '@/utilities/theme';

export const renderObstacle = (game: Game, player: Player) => {
  const level = {
    distance: player.height + 500,
    sparseness: game.window.width / 2,
    speed: 20,
    time: 3000,
  };

  const obstacles: { above: AboveObstacle; below: BelowObstacle }[] = [];

  for (let index = 0; index < 10; index++) {
    const aboveObstacle = new AboveObstacle({
      side1: 50,
      side2: 50,
      side3: randomArbitrary(0, game.window.height - level.distance),
      angle1: 120,
      angle2: 120,
      color: color.success,
    });
    const belowObstacle = new BelowObstacle({
      side1: 50,
      side2: 50,
      side3: game.window.height - level.distance - aboveObstacle.side3,
      angle1: 120,
      angle2: 120,
      color: color.success,
    });

    game.renderModel(aboveObstacle, { x: game.window.width + level.sparseness * index, y: 0 });

    game.renderModel(belowObstacle, { x: game.window.width + level.sparseness * index, y: aboveObstacle.side3 + level.distance });

    game.renderAnimation('OBSTACLE_MOVE', () => {
      let newPositionX = aboveObstacle.position.x - level.speed;

      if (newPositionX + aboveObstacle.width <= 0) {
        newPositionX = game.window.width + level.sparseness * 9;
      }

      aboveObstacle.setPosition({ x: newPositionX });
      belowObstacle.setPosition({ x: newPositionX });

      // if (player.position.x + player.width >= newPositionX && ) {
      //   game.stopAnimation();
      //   game.stop = true;
      // }
    });

    obstacles.push({
      above: aboveObstacle,
      below: belowObstacle,
    });
  }
};
