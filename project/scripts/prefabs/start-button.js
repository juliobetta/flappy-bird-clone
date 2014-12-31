class StartButton extends Phaser.Button {

  constructor(game, x, y) {
    x = x || game.width / 2;
    y = y || 300;

    super(game, x, y, 'startButton', this.onClick, this);

    this.anchor.setTo(0.5, 0.5);
  }


  onClick() {
    this.game.state.start('game');
  }

}

export default StartButton;
