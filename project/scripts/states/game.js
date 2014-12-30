import Bird      from 'prefabs/bird';
import Ground    from 'prefabs/ground';
import PipeGroup from 'prefabs/pipe-group';

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
    this.game.physics.arcade.gravity.y = 1200;

    // add background
    this.background = this.game.add.sprite(0, 0, 'background');

    // create a new Bird object ...
    this.bird = new Bird(this.game, 100, this.game.height/2);
    // ... and add it to the game
    this.game.add.existing(this.bird);


    this.pipes = this.game.add.group();


    // add ground to the game
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    // add a timer
    this.pipeGenerator = this.game.time.events.loop(
      /* delay    = */ Phaser.Timer.SECOND * 1.25, // call every 1.25 seconds
      /* callback = */ this.generatePipes,
      /* context  = */ this
    );
    this.pipeGenerator.timer.start();

    this.addBirdControls();
  }


  update() {
    this.game.physics.arcade.collide(this.bird, this.ground, this.onBirdDie, null, this);
    this.pipes.forEach(function(pipeGroup) {
      this.game.physics.arcade.collide(this.bird, pipeGroup, this.onBirdDie, null, this);
    }, this);

    if(!this.bird.alive) {
      this.onBirdDie();
    }
  }


  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

  /**
   * Add bird controls
   */
  addBirdControls() {
    // keep spacebar from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add keyboard controls
    var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    flapKey.onDown.add(this.bird.flap, this.bird);

    // add mouse/touch controls
    this.input.onDown.add(this.bird.flap, this.bird);
  }


  /**
   * Generate Pipes
   */
  generatePipes() {
    var pipeY     = this.game.rnd.integerInRange(-100, 100),
        pipeGroup = this.pipes.getFirstExists(false);

    if(!pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }

    pipeGroup.reset(this.game.width + pipeGroup.width/2, pipeY);
  }


  /**
   * On bird die collider handler
   */
  onBirdDie() {
    this.game.state.start('gameover');
  }


  /**
   * When we leave a game state, Phaser calls the game state's shutdown() method
   */
  shutDown() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
  }
}

export default Game;
