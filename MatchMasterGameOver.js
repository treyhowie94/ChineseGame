/**
 * Created by sgbyers on 06-Dec-15.
 */
LanguageGame.MatchMasterGameOver = function (game) {
    this.ninjaBG = null;        //Background assets for the Ninja game
    this.lives = 0;             //The number of lives the player has remaining
    this.score = 0;             //The current score for the player
    this.style = "";            //The default style to be used by text in the game
    this.multiplier = 1;        //The multiplier for score
};

LanguageGame.MatchMasterGameOver.prototype = {
    create: function () {
        this.ninjaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'stars');

        //Set the default font style for the game, using CSS styling
        this.style = {font: "30px Georgia", fill: "000000", align: "center"};

        this.score = LanguageGame.score;
        LanguageGame.score = null;

        this.multiplier = LanguageGame.multiplier;
        LanguageGame.multiplier = null;

        this.buildBackBox();
        this.buildRestartBox();
        this.addScore();

    },

    addScore: function () {
        var style = {font: "50px Georgia", fill: "000000", align: "center"};
        //this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
        if (LanguageGame.lives == 0) {
            var text = this.add.bitmapText(this.world.width / 2, this.world.height / 2 - 150, 'eightbitwonder', 'Game Over', 42);
            text.anchor.set(0.5);
            LanguageGame.lives = null;
        } else {
            var text = this.add.bitmapText(this.world.width / 2, this.world.height / 2 - 150, 'eightbitwonder', ' Congratulations', 35);
            text.anchor.set(0.5);
        }

        var h1 = this.add.bitmapText(this.world.width / 2, this.world.height / 2 - 50, 'eightbitwonder', 'Your Score Was', 30);
        h1.anchor.set(0.5);
        var scoreAsText = matchScore.toString();
        var scoreText = this.add.bitmapText(this.world.width / 2, this.world.height / 2, 'eightbitwonder', scoreAsText, 30);
        scoreText.anchor.set(0.5);

    },

    buildBackBox: function () {
        var graphics = this.game.add.graphics(100, 100);
        var backText = this.add.bitmapText(this.world.centerX - 125, this.game.height - 100, 'eightbitwonder', 'To Menu', 30);
        graphics.beginFill(0x990000, 0.5);
        graphics.drawRect(this.world.centerX - (230 + backText.width / 2), this.game.height - 215, backText.width, backText.height);
        graphics.endFill();

        backText.anchor.set(0.5);
        backText.inputEnabled = true; //now we can accept clicks/touches
        backText.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    buildRestartBox: function () {
        var graphics = this.game.add.graphics(100, 100);
        var newGameText = this.add.bitmapText(this.world.centerX + 125, this.game.height - 100, 'eightbitwonder', 'New Game', 30);
        graphics.beginFill(0x990000, 0.5);
        graphics.drawRect(this.world.width / 2 + 20 - newGameText.width / 2, this.game.height - 215, newGameText.width, newGameText.height);
        graphics.endFill();

        newGameText.anchor.set(0.5);
        newGameText.inputEnabled = true; //now we can accept clicks/touches
        newGameText.events.onInputDown.addOnce(this.restart, this); //will happen when input happens
    },
    //Function to return to the MainMenu
    back: function (pointer) {
        this.state.start('MainMenu');
    },

    restart: function (pointer) {
        this.state.start('MatchMaster');
    }

};
