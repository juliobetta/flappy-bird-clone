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

    // Da Bird!
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);

    this.pipes = this.game.add.group();

    // add ground to the game
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);


    this.createInstructions();
    this.addBirdControls();
  }


  update() {
    this.game.physics.arcade.collide(this.bird, this.ground, this.handleBirdDeath, null, this);

    this.pipes.forEach(function(pipeGroup) {
      this.game.physics.arcade.collide(this.bird, pipeGroup, this.handleBirdDeath, null, this);
    }, this);
  }


  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

  /**
   * Start the game
   */
  startGame() {
    this.bird.body.allowGravity = true;
    this.bird.alive = true;

    // add pipe timer
    this.pipeGenerator = this.game.time.events.loop(
      /* delay    = */ Phaser.Timer.SECOND * 1.25, // call every 1.25 seconds
      /* callback = */ this.generatePipes,
      /* context  = */ this
    );
    this.pipeGenerator.timer.start();

    this.instructionsGroup.destroy();
  }


  /**
   * Create game instructions
   */
  createInstructions() {
    this.instructionsGroup = this.game.add.group();
    this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 100, 'getReady'));
    this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 325, 'instructions'));
    this.instructionsGroup.setAll('anchor.x', 0.5);
    this.instructionsGroup.setAll('anchor.y', 0.5);
  }


  /**
   * Add bird controls
   */
  addBirdControls() {
    // add keyboard controls
    this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onDown.addOnce(this.startGame, this);
    this.flapKey.onDown.add(this.bird.flap, this.bird);

    // add mouse/touch controls
    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.onDown.add(this.bird.flap, this.bird);

    // keep spacebar from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
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
  handleBirdDeath() {
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
