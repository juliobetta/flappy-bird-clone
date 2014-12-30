import Pipe from 'prefabs/pipe';

class PipeGroup extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);

    this.topPipe    = new Pipe(this.game, 0, 0, 0);
    this.bottomPipe = new Pipe(this.game, 0, 440, 1);

    this.add(this.topPipe);
    this.add(this.bottomPipe);

    // determine if the bird passed between pipes and whether or not add it to the score
    this.hasScored = false;

    this.setAll('body.velocity.x', -200);
  }


  update() {
    this.checkWorldBounds();
  }


  /**
   * Reset group properties
   * @param {Integer} x
   * @param {Integer} y
   */
  reset(x, y) {
    this.topPipe.reset(0, 0);
    this.bottomPipe.reset(0, 440);

    this.x = x;
    this.y = y;

    this.setAll('body.velocity.x', -200);

    this.hasScored = false;
    this.exists    = true;
  }


  /**
   * Check if the object if in World.
   * If the object's exists property is set to false, its update() method doesn't run
   */
  checkWorldBounds() {
    if(!this.topPipe.inWorld) {
      this.exists = false;
    }
  }

}

export default PipeGroup;
