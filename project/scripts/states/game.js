import Bird       from 'prefabs/bird';
import Ground     from 'prefabs/ground';
import PipeGroup  from 'prefabs/pipe-group';
import Pipe       from 'prefabs/pipe';
import Scoreboard from 'prefabs/scoreboard';

class Game {

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  create() {
    this.score    = 0;
    this.gameover = false;

    // enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    // add background
    this.background = this.game.add.sprite(0, 0, 'background');

    this.pipes = this.game.add.group();

    // Da Bird!
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);

    // add ground to the game
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

    this.addBirdControls();

    // add score text
    this.scoreText = this.game.add.bitmapText(
      this.game.width/2, 10, 'flappyfont', this.score.toString(), 24
    );
    this.scoreText.visible = false;

    // sounds!
    this.scoreSound     = this.game.add.audio('score');
    this.pipeHitSound   = this.game.add.audio('pipeHit');
    this.groundHitSound = this.game.add.audio('groundHit');

    this.createInstructions();
  }


  update() {
    // enable collision between the bird and the ground
    this.game.physics.arcade.collide(this.bird, this.ground, this.handleBirdDeath, null, this);

    if(!this.gameover) {
      this.pipes.forEach(function(pipeGroup) {
        this.checkScore(pipeGroup);

        // enable collision between the bird and the pipes
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.handleBirdDeath, null, this);
      }, this);
    }
  }


  render() {
    // this.game.debug.body(this.ground);
    // this.game.debug.body(this.bird);
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
    if(this.gameover || this.bird.alive) { return; }

    this.bird.body.allowGravity = true;
    this.bird.alive = true;
    this.scoreText.visible = true;

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
   * Check if bird passed through the pipes to increase its score
   * @param  {Array} pipeGroup
   */
  checkScore(pipeGroup) {
    if(pipeGroup.exists &&
      !pipeGroup.hasScored &&
      pipeGroup.topPipe.world.x <= this.bird.world.x
    ) {
      pipeGroup.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  }


  /**
   * On bird die collider handler
   * @param {Object} bird
   * @param {Object} object
   */
  handleBirdDeath(bird, object) {
    if (object instanceof Pipe) {
      this.pipeHitSound.play();
    } else if (object instanceof Ground && !this.bird.onGround) {
      this.groundHitSound.play();
      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score);
      this.bird.onGround = true;
    }

    if(this.gameover) { return; }

    this.gameover = true;
    this.bird.kill();
    this.pipes.callAll('stop');
    this.pipeGenerator.timer.stop();
    this.ground.stopScroll();
  }


  /**
   * When we leave a game state, Phaser calls the game state's shutdown() method
   */
  shutDown() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
    this.scoreboard.destroy();
  }
}

export default Game;
