import Bird   from 'prefabs/bird';
import Ground from 'prefabs/ground';

class Game {

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  preload() {

  }


  create() {
    // enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 500;

    // add background
    this.background = this.game.add.sprite(0, 0, 'background');

    // create a new Bird object ...
    this.bird = new Bird(this.game, 100, this.game.height/2);
    // ... and add it to the game
    this.game.add.existing(this.bird);


    // add ground to the game
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);
  }


  update() {
    this.game.physics.arcade.collide(this.bird, this.ground);
  }

}

export default Game;
