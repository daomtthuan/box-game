import '@/assets/styles/app.scss';

import { Game } from '@/core/game';
import { AboveObstacle } from '@/models/above-obstacle';
import { Background } from '@/models/background';
import { BelowObstacle } from '@/models/below-obstacle';
import { Panel } from '@/models/panel';
import { Player } from '@/models/player';
import { randomArbitrary } from '@/utilities/math/number';
import { color } from '@/utilities/theme';

const game = new Game();
let score = 0;

const background = new Background({
  width: game.window.width,
  height: game.window.height,
});

game.renderModel(background, { x: 0, y: 0 });

const scorePanel = new Panel();
scorePanel.setContent(`Level: 0 - Score: 0`);
game.renderModel(scorePanel, { x: 0, y: 0 });

const player = new Player({
  side1: 50,
  side2: 50,
  side3: 50,
  angle1: 120,
  angle2: 120,
  color: color.primary,
});

const level = () => score / 10;

game.renderModel(player, { x: player.width, y: (game.window.height - player.height) / 2 });

game.renderAnimation('PLAYER_FALL_DOWN', () => {
  const newPositionY = player.position.y + 20 * (1 + level());

  if (newPositionY > game.window.height - player.height) {
    game.stopAnimation();
    game.stop = true;
    return;
  }

  player.setPosition({ y: newPositionY });
});

game.onClick(() => {
  if (game.stop) {
    return;
  }

  game.renderAnimation('PLAYER_FLY_UP', () => {
    const newPositionY = player.position.y - 200 * (1 + level());

    if (newPositionY <= 0) {
      return;
    }

    player.setPosition({ y: newPositionY });

    if (player.position.y <= newPositionY) {
      game.stopAnimation('PLAYER_FLY_UP');
    }
  });
});

const obstacles: { above: AboveObstacle; below: BelowObstacle }[] = [];

for (let index = 0; index < 10; index++) {
  const aboveObstacle = new AboveObstacle({
    side1: 50,
    side2: 50,
    side3: randomArbitrary(player.height, game.window.height - 3 * player.height),
    angle1: 120,
    angle2: 120,
    color: color.success,
  });
  const belowObstacle = new BelowObstacle({
    side1: 50,
    side2: 50,
    side3: game.window.height - 3 * player.height - aboveObstacle.side3,
    angle1: 120,
    angle2: 120,
    color: color.success,
  });

  game.renderModel(aboveObstacle, { x: game.window.width + 10 * player.width * index, y: 0 });

  game.renderModel(belowObstacle, { x: game.window.width + 10 * player.width * index, y: aboveObstacle.side3 + 3 * player.height });

  game.renderAnimation('OBSTACLE_MOVE', () => {
    let newPositionX = aboveObstacle.position.x - 20 * (1 + level());

    if (newPositionX + aboveObstacle.width <= 0) {
      newPositionX = game.window.width + 10 * player.width * 9;
      scorePanel.setContent(`Level: ${level()} - Score: ${++score}`);
    }

    aboveObstacle.setPosition({ x: newPositionX });
    belowObstacle.setPosition({ x: newPositionX });

    if (
      (player.position.x <= aboveObstacle.position.x && aboveObstacle.position.x <= player.position.x + player.width) ||
      (player.position.x <= aboveObstacle.position.x + aboveObstacle.width &&
        aboveObstacle.position.x + aboveObstacle.width <= player.position.x + player.width)
    ) {
      if (player.collisionAbove <= aboveObstacle.collision || player.collisionBelow >= belowObstacle.collision) {
        game.stopAnimation();
        game.stop = true;
        return;
      }
    }
  });

  obstacles.push({
    above: aboveObstacle,
    below: belowObstacle,
  });
}
