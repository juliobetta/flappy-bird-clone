class Preload {

  constructor() {
    this.asset = null;
    this.ready = null;
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

    this.load.image('background',   'assets/background.png');
    this.load.image('ground',       'assets/ground.png');
    this.load.image('title',        'assets/title.png');
    this.load.image('startButton',  'assets/start-button.png');
    this.load.image('instructions', 'assets/instructions.png');
    this.load.image('getReady',     'assets/get-ready.png');

    this.load.bitmapFont(
      'flappyfont', 'assets/fonts/flappyfont.png', 'assets/fonts/flappyfont.fnt'
    );

    this.load.audio('score',     'assets/score.wav');
    this.load.audio('flap',      'assets/flap.wav');
    this.load.audio('pipeHit',   'assets/pipe-hit.wav');
    this.load.audio('groundHit', 'assets/ground-hit.wav');

    this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
    this.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);
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
