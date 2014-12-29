class Ground extends Phaser.TileSprite {

    constructor(game, x, y, width, height) {
        super(game, x, y, width, height, 'ground');

        // start scrolling our ground
        this.autoScroll(-200, 0);

        // enable physics to the ground, so that it can detect collision
        this.game.physics.arcade.enableBody(this);

        // we don't want the ground's body to be affected by gravity
        this.body.allowGravity = false;

        // make the ground ot not react on collisions
        this.body.immovable = true;
    }

    update() {}

}

export default Ground;
