import { Game } from '@/core/game';
import { Player } from '@/models/player';
import { color } from '@/utilities/theme';

export const renderPlayer = (game: Game) => {
  const player = new Player({
    side1: 50,
    side2: 50,
    side3: 50,
    angle1: 120,
    angle2: 120,
    color: color.primary,
  });

  game.renderModel(player, { x: player.width, y: (game.window.height - player.height) / 2 });

  game.renderAnimation('PLAYER_FALL_DOWN', () => {
    const newPositionY = player.position.y + 5;

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
      const newPositionY = player.position.y - 120;

      if (newPositionY <= 0) {
        return;
      }

      player.setPosition({ y: newPositionY });

      if (player.position.y <= newPositionY) {
        game.stopAnimation('PLAYER_FLY_UP');
      }
    });
  });

  return player;
};
