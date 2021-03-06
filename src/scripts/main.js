import Analytics from 'utils/analytics';

import Boot     from 'states/boot';
import Preload  from 'states/preload';
import Menu     from 'states/menu';
import Game     from 'states/game';
import GameOver from 'states/gameover';

var game, App = {};

App.start = function() {
  game = new Phaser.Game(
    /* width     = */ 288,
    /* height    = */ 505,
    /* renderer  = */ Phaser.AUTO, // AUTO, CANVAS, WEBGL or HEADLESS
    /* elementId = */ 'game-container'
  );

  game.analytics = new Analytics('flappy-bird');

  game.state.add('boot',     Boot);
  game.state.add('preload',  Preload);
  game.state.add('menu',     Menu);
  game.state.add('game',     Game);
  game.state.add('gameover', GameOver);

  game.state.start('boot');

  return game;
};

export default App;
