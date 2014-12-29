class Preload {

  constructor() {
    this.asset = null;
    this.ready = null;
  }


  preload() {
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    // preloading assets ...

    this.load.image('background',  'assets/background.png');
    this.load.image('ground',      'assets/ground.png');
    this.load.image('title',       'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');

    this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
  }


  create() {
    this.asset.cropEnabled = false;
  }


  update() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  }


  onLoadComplete() {
    this.ready = true;
  }

}

export default Preload;
