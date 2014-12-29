class Bird extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'bird');

    // set the sprite's anchor to the center
    this.anchor.setTo(0.5, 0.5);

    // and play animations
    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    // add physics
    this.game.physics.arcade.enableBody(this);
  }

  update() {}

}

export default Bird;
