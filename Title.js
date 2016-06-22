/*Initialization of the Title object of LanguageGame.  This object represents the Title state, and its respective
 * variables and parameters.  The purpose of this state is to display a Title screen and allow the user
 * to start the app proper.
 */
LanguageGame.Title=function(game){
    this.startPrompt;   //Prompt for user to click on to go to MainMenu
    this.startBG;       //Component for background of Title Screen
    this.startBG2;      //Component for background of Title Screen
    this.startBG3;      //Component for background of Title Screen
    this.welcome=null;  //Sound byte to welcome the player to the MainMenu
};

//Prototype for the Title object of LanguageGame
LanguageGame.Title.prototype={

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running


    /* Built-in function used by Phaser.  Called upon entering the Title state
     * Initializes the Title state.
     */
    create: function() {

      //Add the appropriate sound byte based on whether the device is or is not Android
      this.welcome=this.add.audio('welcome');

      //Add Background images
      startBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');//sky in left hand corner
      startBG2 = this.add.image(this.world.centerX - 120, this.world.centerY - 220, 'titleimage'); //ripped off
      startBG3 = this.add.image(this.world.centerX + 120, this.world.centerY+100, 'building');
      startBG3.anchor.set(0.5);//burns
      startBG.inputEnabled = true; //now we can accept clicks/touches
      startBG.events.onInputDown.addOnce(this.nextScreen, this); //will happen when input happens

      //Add the prompt to move to the MainMenu
      startPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+250,'eightbitwonder','Touch to Start', 24);
  },

    //-------------------------  UTILITY FUNCTONS -------------------------//
    //The following functions provide utilities that are used in create() and update()

    //Transfers to the mainMenu state
    nextScreen: function(pointer){
     this.welcome.play();
     this.state.start('MainMenu');
    }
};
