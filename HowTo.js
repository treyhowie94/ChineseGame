LanguageGame.HowTo = function (game) {
};

LanguageGame.HowTo.prototype = {
    create: function () {
        var howBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');
        this.buildBackBox();
        this.addTitle();
        this.addInstructions();
    },

    addTitle: function(){
        var howToHeader = this.add.bitmapText(this.world.centerX-150,80, 'eightbitwonder', 'How To Play', 36);
    },

    addInstructions: function(){
        this.addConveyorInstructions();
        this.addMatchmasterInstructions();
        this.addNinjaInstructions();
    },

    addConveyorInstructions: function(){
        var h1 = this.add.bitmapText(this.world.centerX - 200, 150, 'eightbitwonder','Conveyor Game', 26);
        var conveyorInstruct = 'Click on the words that do\nnot match the given word \nand allow the correct card \nto continue off of the \nscreen';
        var h1I = this.add.bitmapText(this.world.centerX - 175, 200, 'eightbitwonder',conveyorInstruct, 16);

    },

    addMatchmasterInstructions: function(){
        var h2 = this.add.bitmapText(this.world.centerX - 200, 300, 'eightbitwonder','MatchMaster Game', 26);
        var wordInstruct = 'Flip a card to match a word\nto another flipped word';
        var h2I = this.add.bitmapText(this.world.centerX - 175, 350, 'eightbitwonder',wordInstruct, 16);

    },

    addNinjaInstructions: function(){
        var h3 = this.add.bitmapText(this.world.centerX - 200, 400, 'eightbitwonder','Ninja Game', 26);
        var ninjaInstruct = 'Click on the words that do\nmatch the given word and\nallow the remaining cards\nto continue off of the\nscreen';
        var h3I = this.add.bitmapText(this.world.centerX - 175, 450, 'eightbitwonder',ninjaInstruct, 16);
    },

    buildBackBox: function () {
        var backBox = this.add.image(this.world.centerX - 250, this.game.height - 100, 'back');
         backBox.inputEnabled = true; //now we can accept clicks/touches
         backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens

    },

    back: function (pointer) {
        this.state.start('MainMenu');
    }

};