import '@/assets/styles/app.scss';

import { Game } from './core/game';
import { renderObstacle } from './game/obstacle';
import { renderPlayer } from './game/player';

const game = new Game();

const player = renderPlayer(game);
renderObstacle(game, player);
