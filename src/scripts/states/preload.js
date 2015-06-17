class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  preload() {
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    // preloading assets ...

    // images
    this.load.image('background',   'assets/images/background.png');
    this.load.image('ground',       'assets/images/ground.png');
    this.load.image('title',        'assets/images/title.png');
    this.load.image('startButton',  'assets/images/start-button.png');
    this.load.image('instructions', 'assets/images/instructions.png');
    this.load.image('getReady',     'assets/images/get-ready.png');
    this.load.image('gameover',     'assets/images/gameover.png');
    this.load.image('scoreboard',   'assets/images/scoreboard.png');
    this.load.image('particle',     'assets/images/particle.png');

    // fonts
    this.load.bitmapFont(
      'flappyfont', 'assets/fonts/flappyfont.png', 'assets/fonts/flappyfont.fnt'
    );

    // sounds
    this.load.audio('score',     'assets/sounds/piu.wav');
    this.load.audio('flap',      'assets/sounds/boing.wav');
    this.load.audio('pipeHit',   'assets/sounds/pff.wav');
    this.load.audio('groundHit', 'assets/sounds/kaploft.wav');

    // sprite sheets
    this.load.spritesheet('bird',   'assets/images/bird.png', 34, 24, 3);
    this.load.spritesheet('pipe',   'assets/images/pipes.png', 54, 320, 2);
    this.load.spritesheet('medals', 'assets/images/medals.png', 44, 46, 2);
  }


  create() {
    this.asset.cropEnabled = false;
  }


  update() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  }


  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

  onLoadComplete() {
    this.ready = true;
  }

}

export default Preload;
