class Bird extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'bird');

    // set the sprite's anchor to the center
    this.anchor.setTo(0.5, 0.5);

    // and play animations
    this.animations.add('flap');
    this.animations.play('flap', 12, true);

    this.alive = false;

    // add physics and disable gravity until the game is started
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
  }

  update() {
    // check to see if our angle is less than 90.
    // if it is, rotate the bird towards the ground by 2.5 degrees
    if(this.angle < 90 && this.alive) {
      this.angle += 2.5;
    }
  }


  /**
   * Add flap animation properties
   */
  flap() {
    // jump upwards
    this.body.velocity.y = -400;

    // rotate the bird to -40 degrees
    this.game.add.tween(this).to({ angle: -40 }, 100).start();
  }
}

export default Bird;
