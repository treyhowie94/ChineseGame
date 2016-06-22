/*Initialization of the Ninja object of LanguageGame.  This object represents the entire Ninja game, and its
 * respective variables and parameters.
 */

LanguageGame.Ninja = function (game) {
    this.ninjaBG = null;        //Background assets for the Ninja game
    this.wordBox = null;        //Box containing the correct word in English
    this.backBox = null;        //Box containing the "back arrow" to exit the Ninja game to the Main Menu
    this.livesBox = null;       //Box containing the number of lives remaining
    this.scoresBox = null;      //Box containing the score
    this.boxText = "";
    this.numCards = 0;          //The number of Cards onscreen at a given instant
    this.goodCard = 0;          //The number of cards that match with the correct answer onscreen. Should be 1 or 0 at the present time.
    this.goodCardIdx = 0;       //The index of the correct card in cardArray
    this.cardArray = [];        //An array to hold all the cards in the game at a given moment
    this.category = "";         //The category for the current round (e.g. numbers, colors etc.)
    this.lives = 0;             //The number of lives the player has remaining
    this.score = 0;             //The current score for the player
    this.style = "";            //The default style to be used by text in the game
    this.multiplier = 1;        //The multiplier for score
    this.gameOver=null;         //The sound byte asset for when the game is over
    this.woops=null;            //The sound byte asset for when the player picks the wrong card
    this.yea=null;              //The sound byte asset for when the player picks the correct card
    this.card1Unicode = "";     //The unicode for the first card
    this.card2Unicode = "";     //The unicode for the second card
    this.card3Unicode = "";     //The unicode for the third card
};

//The prototype for the Ninja object
LanguageGame.Ninja.prototype = {

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running

    /* Built-in function used by Phaser.  Called upon entering the Ninja game-state
     * Initializes the Ninja game-state.
     */

    create: function () {

        //Add the sound assets appropriately based on whether we are on an Android device or on Web
        
           this.repopulateSounds();
        

        //Set the default font style for the game, using CSS styling
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};

        //------- select the category for the round ------------//

        //Retrieve all the categories in the DB, and select one at random
        //results = LanguageGame.gameDB.exec("SELECT DISTINCT category FROM test");
        //var len = results.length;
        //var rnd = Math.floor(Math.random() * len);
        //this.category = results[0]["values"][rnd][0];
        //---------------------------------------------//

        //------------- initialize game state ------------//

        //Retrieve all the english,unicode pairs from the DB, and add the background and wordBox assets
        //Note that this DB query is the only one that needs to be made in a given round
       // this.results = LanguageGame.gameDB.exec("SELECT english, unicode FROM test T WHERE T.category like '%" + this.category + "%'");
        this.ninjaBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'dojo');
        this.wordBox = this.add.image(this.world.centerX - 100, this.game.height - 60, 'box');

        //Create Back Button, and enable it to accept touch/click input and call this.back when that happens//
        this.backBox = this.add.image(this.world.centerX - 250, this.game.height - 100, 'back');
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens

        //Initialize the number of player lives and livesBox//
        this.lives = 3;
        this.setLivesBox();

        //Initialize the scoreBox
        this.setScoreBox();

        //Make the initial three starting cards, choosing one at random to be the card with the correct character
        this.goodCardIdx = Math.floor(Math.random() * 3);
        for (var i = 0; i < 3; i++) {
            this.aNewCard(this.goodCardIdx, i, this);
        }
        //------------------------------//
    },

    /* Built-in function used by Phaser.  Is called 30 times a second to update the game and its
     * relevant parameters
     */

    update: function () {

        //Set lives and score boxes, in case they have changed
        this.setLivesBox();
        this.setScoreBox();

        //For every card...
        for (var i = 0; i < this.cardArray.length; i++) {

            //If the card is not null and out of bounds...
            if (this.cardArray[i] != null && ( this.cardArray[i].x > this.game.width || this.cardArray[i].y > this.game.height)) {

                //If the card was the correct card, player loses and life and multiplier is reset.
                if (this.cardArray[i].goodCard == "true") {
                    this.goodCard--;
                    this.lives--;
                    this.multiplier = 1;
                }

                //Kill the card, reset that cardArray location, and decrement numCards
                this.cardArray[i].kill();
                this.cardArray[i] = null;
                this.numCards--;
            }
        }

        //If all cards are gone, spawn the next set of 3
        if (this.numCards == 0) {
            this.goodCardIdx = Math.floor(Math.random() * 3)
            for (var i = 0; i < 3; i++) {
                this.aNewCard(this.goodCardIdx, i, this);
            }
        }

        //If all lives are gone, play the gameOver sound and notify the player
        if (this.lives <= 0) {
            
            if(isAndroid){
                    this.yea.stop();
                    this.woops.stop();
            }
            else{
                if(this.yea.isPlaying)this.yea.stop();
                if(this.woops.isPlaying)this.woops.stop();
            }
            
            this.gameOver.play();
            
            this.lives = 3;
            LanguageGame.score = this.score;
            LanguageGame.multiplier = this.multiplier;
            LanguageGame.lives = 0;
            this.clear();
            this.state.start('NinjaOver');
        }
    },
    repopulateSounds:function(){
        this.gameOver = this.game.add.audio('gameOver');
        this.woops = this.game.add.audio('woops');
        this.yea = this.game.add.audio('yea');
    },
    //-------------------------  UTILITY FUNCTIONS -------------------------//
    //The following functions provide utilities that are used in create() and update()

    /* Stops a card, adjusting all the necessary information, and then killing the card. Is called when the
     *  onInputDown event fires on a card (See aNewCard() function).
     *
     *  parameters:  pointer - a reference to the card object that was touched/clicked (not used, had trouble using)
     *               game - a reference to the current game
     *               card - a reference to the card object that was touched/clicked
     *               tween - a reference to the tween attached to a card
     */
    stopCard: function (pointer, game, card, tween) {

        //Stop the card's tween
        tween.stop(true);

        //If the card was the correct card, add to the score, adjust the multiplier, and play good sound
        if (card.goodCard == "true") {
            this.score += 100 * this.multiplier;
            this.multiplier++;
            if(isAndroid){
                    this.gameOver.stop();
                    this.woops.stop();
            }
            else{
                if(this.gameOver.isPlaying)this.gameOver.stop();
                if(this.woops.isPlaying)this.woops.stop();
            }
            this.yea.play();

        //If the card was an incorrect card, deduct a life, reset multiplier, and play bad sound
        } else {
            this.lives--;
            this.setLivesBox();
            this.multiplier = 1;
            
            if(isAndroid){
                    this.yea.stop();
                    this.gameOver.stop();
            }
            else{
                if(this.yea.isPlaying)this.yea.stop();
                if(this.gameOver.isPlaying)this.gameOver.stop();
            }
            
            this.woops.play();
        }

        //Kill the card and decrement numCards
        card.kill();
        this.numCards--;
    },

    /*  Creates a new card
     *  parameters: goodCardIdx - the random index the correct card should have in cardArray
     *              i - the index in cardArray of the new card
     *              game - a reference to the current game
     */
    aNewCard: function (goodCardIdx, i, game) {

        //Choose a english-unicode pair at random
        var catLen = results.length;
        var randNumber = Math.floor(Math.random() * catLen);
        var boxWordText = results[randNumber].reducedDefinition;
        var unicodeVal = results[randNumber].charText;

        //Repeat until the chosen pair is different from any other cards pair
        while (unicodeVal == this.card1Unicode || unicodeVal == this.card2Unicode || unicodeVal == this.card3Unicode) {
            randNumber = Math.floor(Math.random() * catLen);
            boxWordText = results[randNumber].reducedDefinition;
            unicodeVal = this.results[randNumber].charText;
        }

        //Increment the number of cards
        this.numCards++;

        //Set the appropriate card unicode variable
        this.card1Unicode = (i == 0) ? unicodeVal : this.card1Unicode;
        this.card2Unicode = (i == 1) ? unicodeVal : this.card2Unicode;
        this.card3Unicode = (i == 2) ? unicodeVal : this.card3Unicode;

        //Add the card to the game, set the text inside the card, and default the card to not be the correct card
         var style; 
        
        if(boxWordText.length < 2){
                cardStyle = {font: "60px Georgia", fill: "000000", align: "center"};
            }
            else if(boxWordText.length < 6){
                cardStyle = {font: "35px Georgia", fill: "000000", align: "center"};
            }
            else {
                cardStyle = {font: "20px Georgia", fill: "000000", align: "center"};
            }
        
        var cardStyle = {font: "60px Serif", fill: "000000", align: "center"};
        var card = this.add.image(0, this.game.height, 'card');
        var cardText = this.game.add.text(card.width / 2, card.height / 2, unicodeVal, cardStyle);
        cardText.anchor.set(0.5);
        card.addChild(cardText);
        card.goodCard = "false";

        //If this card was meant to be the correct card, set it to be the correct card
        if (goodCardIdx == i) {
            card.goodCard = "true";
            this.goodCard++;
        }

        //If this card is the correct card, set the wordBox to have the English of the card's Chinese
        if (card.goodCard == "true") {
            var newBoxText = this.game.add.text(this.wordBox.width / 2, card.height / 8 + 10, boxWordText, this.style);
            newBoxText.anchor.set(0.5);
            this.wordBox.removeChild(this.boxText);
            this.wordBox.addChild(newBoxText);
            this.boxText = newBoxText;
        }

        //BEGIN TWEENING LOGIC

        //Points used to interpolate a Bezier curve
        var x1 = this.getRandomIntInclusive(0,10);
        var x2 = this.getRandomIntInclusive(0,(this.game.width*0.5));
        var x3 = this.getRandomIntInclusive((this.game.width*0.2),(this.game.width*0.7));
        var x4 = this.getRandomIntInclusive((this.game.width*0.4),(this.game.width*0.9));
        var x5 = this.getRandomIntInclusive((this.game.width*0.5),(this.game.width*0.99));
        var x6 = this.getRandomIntInclusive((this.game.width*0.7),(this.game.width));

        var y1 = this.getRandomIntInclusive((this.game.height*0.5),(this.game.height*0.9));
        var y2 = this.getRandomIntInclusive(0,(this.game.height*.5));
        var y3 = this.getRandomIntInclusive((this.game.height *.01),(this.game.height *0.5));
        var y4 = this.getRandomIntInclusive(0,(this.game.height*.5));
        var y5 = this.getRandomIntInclusive((this.game.height*0.02),(this.game.height*0.99));
        var y6 = (this.game.height+card.height);

        //Create a tween with these points
        var tween = this.add.tween(card).to({
            x: [x1, x2, x3, x4, x5, x6],
            y: [y1, y2, y3, y4, y5, y6]
        }, 5000);

        //Interpolate a Bezier curve with the tween
        tween.interpolation(function (v, k) {
            return Phaser.Math.bezierInterpolation(v, k);
        });

        //END TWEENING LOGIC

        //Allow the card to be affected by touch/click events, and add the appropriate method to the handler
        card.inputEnabled = true;
        cardText.inputEnabled = true;
        card.events.onInputDown.addOnce(this.stopCard, this, this.game, card, tween); //will happen when input happens

        //Start the tween with a greater delay depending on the number of cards
        tween.delay(1000 * this.numCards);
        tween.start();

        //Add the card to the cardArray.
        this.cardArray[this.numCards - 1] = card;
    },

    /* Resets all the variables in the Ninja game-state.  Necessary because it seems that restarting the Ninja game-state
     * does NOT reset the variables associated with that state.  Therefore, this method is called right before any
     * restarts or when leaving the Ninja game-state.
     */
    clear: function () {
        this.points = null;
        this.ninjaBG = null;
        this.wordBox = null;
        this.backBox = null;
        this.livesBox = null;
        this.scoresBox = null;
        this.boxText = "";
        this.numCards = 0;
        this.goodCard = 0;
        this.results = null;
        this.cardArray = [];
        this.category = "";
        this.lives = 0;
        this.score = 0;
        this.style = "";
        this.goodCardIdx = 0;
        this.multiplier = 1;
    },

    //Function to return to the MainMenu
    back: function (pointer) {
        this.clear();
        this.state.start('MainMenu');
    },

    //Function to set/reset the livesBox with the appropriate number of lives
    setLivesBox: function () {
        this.livesBox = this.add.image(this.world.width - 200, 10, 'box');

        for (var i = this.lives; i > 0; i--) {
            var life = this.add.image((30 * i), 0, 'sword');
            this.livesBox.addChild(life);
        }
    },

    //Function to set/reset the scoreBox with the appropriate score
    setScoreBox: function () {
        this.scoreBox = this.add.image(200, 10, 'box');
        var scoreText = this.game.add.text(this.scoreBox.width / 2, this.scoreBox.height / 2 - 35, this.score, this.style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    getRandomIntInclusive: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }


};


