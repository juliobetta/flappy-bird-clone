class Menu {

  /**
   * ########################################################################################
   * State Methods ##########################################################################
   * ########################################################################################
  */

  preload() {}


  create() {
    // add the background sprite
    this.background = this.game.add.sprite(
      /* x   = */ 0,
      /* y   = */ 0,
      /* key = */ 'background'
    );

    this.createGround();
    this.createTitle();
    this.createStartButton();
  }


  update() {}



  /**
   * ########################################################################################
   * Common Methods #########################################################################
   * ########################################################################################
  */

  /**
   * Create the background's moving ground
   */
  createGround() {
    // add the ground sprite as a title and start scrolling in the negative x direction
    this.ground = this.game.add.tileSprite(
      /* x      = */ 0,
      /* y      = */ 400,
      /* width  = */ 335,
      /* height = */ 112,
      /* key    = */ 'ground'
    );

    this.ground.autoScroll(
      /* xSpeed = */ -200,
      /* ySpeed = */ 0
    );
  }


  /**
   * Create menu's title
   */
  createTitle() {
    // create a group to put the title assets in so they can by manipulated as a wholes
    this.titleGroup = this.game.add.group();

    // create the title sprite and add it to the group
    this.title = this.game.add.sprite(0, 0, 'title');
    this.titleGroup.add(this.title);


    // create the bird sprite and add it to the group
    this.bird = this.game.add.sprite(200, 5, 'bird');
    this.titleGroup.add(this.bird);

    // add an animation to the bird and begin animation
    this.bird.animations.add('flap');
    this.bird.animations.play(
      /* animationKey = */ 'flap',
      /* frameRate    = */ 12,
      /* loop         = */ true
    );


    // set the originating location of the group
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;


    // create an oscilating animation tween for the group
    this.game.add.tween(this.titleGroup).to(
      /* properties = */ { y: 115 },
      /* duration   = */ 350,
      /* ease       = */ Phaser.Easing.Linear.NONE,
      /* autoStart  = */ true,
      /* delay      = */ 0,
      /* repeat     = */ 1000,
      /* yoyo       = */ true
    );
  }


  /**
   * Create a start button
   */
  createStartButton() {
    this.startButton = this.game.add.button(
      /* x               = */ this.game.width/2,
      /* y               = */ 300,
      /* key             = */ 'startButton',
      /* callback        = */ this.onClickStart,
      /* callbackContext = */ this
    );
    this.startButton.anchor.setTo(0.5, 0.5);
  }


  /**
   * Start button click handler to actually start the game
   */
  onClickStart() {
    this.game.state.start('game');
  }
}

export default Menu;
