import StartButton from 'prefabs/start-button';

var SILVER = 0,
    GOLDEN = 1;

class Scoreboard extends Phaser.Group {

  constructor(game) {
    super(game);

    var gameover = this.create(this.game.width / 2, 100, 'gameover');
    gameover.anchor.setTo(0.5, 0.5);

    this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
    this.scoreboard.anchor.setTo(0.5, 0.5);

    this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
    this.add(this.scoreText);

    this.bestScoreText = this.game.add.bitmapText(
      this.scoreboard.width, 230, 'flappyfont', '', 18
    );
    this.add(this.bestScoreText);

    // add a button with a callback
    this.startButton = new StartButton(this.game);
    this.add(this.startButton);

    this.y = this.game.height;
    this.x = 0;
  }


  /**
   * Display the scoreboard
   * @param {Integer} score
   */
  show(score) {
    var medalPosition = null, medal, bestScore;

    this.scoreText.setText(score.toString());

    if(!!localStorage) {
      bestScore = localStorage.getItem('bestScore');

      if(!bestScore || bestScore < score) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
      }
    } else {
      // Fallback. localStorage isn't available
      bestScore = 'N/A';
    }

    this.game.add.tween(this).to({ y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

    this.bestScoreText.setText(bestScore.toString());

    if      (score >= 10 && score < 20) { medalPosition = SILVER; }
    else if (score >= 20)               { medalPosition = GOLDEN; }

    if(medalPosition !== null) {
      medal = this.game.add.sprite(-65, 7, 'medals', medalPosition);

      medal.anchor.setTo(0.5, 0.5);
      this.scoreboard.addChild(medal);

      var emitter = this.game.add.emitter(medal.x, medal.y, 400);
      this.scoreboard.addChild(emitter);

      emitter.width  = medal.width;
      emitter.height = medal.height;

      emitter.makeParticles('particle');
      emitter.setRotation(-100, 100);
      emitter.setXSpeed(0, 0);
      emitter.setYSpeed(0, 0);
      emitter.minParticleScale = 0.25;
      emitter.maxParticleScale = 0.5;
      emitter.setAll('body.allowGravity', false);

      emitter.start(
        /* explode       = */ false,
        /* lifespan(ms)  = */ 1000,
        /* frequency(ms) = */ 1000
      );
    }
  }

}

export default Scoreboard;
