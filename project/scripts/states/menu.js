import Ground      from 'prefabs/ground';
import StartButton from 'prefabs/start-button';

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

    // add ground to the game
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);

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
    this.startButton = new StartButton(this.game);
    this.game.add.existing(this.startButton);
  }
}

export default Menu;
