class Boot {

  preload() {
    this.load.image('preloader', 'assets/images/preloader.gif');
  }

  create() {
    // max number of fingers to detect
    this.input.maxPointers = 1;
    this.game.state.start('preload', true, false);

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      this.stage.scale.pageAlignHorizontally = true;
    }

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setScreenSize(true);
  }

}

export default Boot;
