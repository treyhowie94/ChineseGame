/*Initialization of the Preloader object of LanguageGame.  This object represents the Preloader state, and its respective
 * variables and parameters.  The purpose of this state is to load all assets for our game.
 */
LanguageGame.Preloader = function(game) {
    this.preloadBar = null;     //Image to be displayed while the preLoader is loading assets
    this.titleText=null;        //The title text to be displayed while loading
    this.ready = false;         //Boolean that is true once the preloader has loaded all assets
};

//Utility function to get the media URL for android, given a filename
function getMediaURL(s) {
    if(isAndroid) return "/android_asset/www/" + s;
    return s;
}

//Function to display media errors
function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

//Prototype for the Preloader object of LanguageGame
LanguageGame.Preloader.prototype = {

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running

    /* Built-in function used by Phaser.  Called on instantiation of object but before
     * the create() method.  Loads all the relevant assets for LanguageGame.
     */
    preload: function() {

        //Loading Preloader specfic assets
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5,0.5);
        this.preloadBar.cropEnabled = false;
        this.load.setPreloadSprite(this.preloadBar);

        //Loading textual assets
        this.load.bitmapFont('eightbitwonder', 'assets/fonts/eightbitwonder.png', 'assets/fonts/eightbitwonder.fnt');
        this.titleText=this.add.image(this.world.centerX,this.world.centerY-220,'titleimage');
        this.titleText.anchor.setTo(0.5,0.5);

        //Loading image assets
        this.load.image('building','assets/images/building.png'); //title page image
        this.load.image('dojo','assets/images/dojo.png'); //ninja background
        this.load.image('card','assets/images/Paper.png'); //blank card
        this.load.image('bg','assets/images/RedBack.png'); //generic background
        this.load.image('box','assets/images/box.png'); // "button" place holder
        this.load.image('stars','assets/images/Stars.png'); //wordaga background
        this.load.image('belt','assets/images/Conveyor.png'); //conveyor background
        this.load.image('back', 'assets/images/back_arrow.png');//back button
        this.load.image('help', 'assets/images/question.png');//help button
        this.load.image('sword','assets/images/katana.png'); //life image for ninja
        this.load.image('rotatedCard','assets/images/PaperRotated.png'); //rotated blank card

        //Loading audio assets
         //we use regular phaser sounds
            this.load.audio('welcome', 'assets/audio/welcomeSound.mp3');
            this.load.audio('woops','assets/audio/youSuck.mp3');
            this.load.audio('yea','assets/audio/yea.mp3');
            this.load.audio('gameOver','assets/audio/gameOver.mp3');
        
    },

    /* Built-in function used by Phaser.  Is called 30 times a second, but only after the
     * preload() function is completed.  Starts the Title state.
     */
    update:function(){
        this.ready=true;
        this.state.start('Title');
    }

};