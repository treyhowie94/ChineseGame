/**
 * Created by sgbyers on 11/3/2015.
 */

/**
 * DOUBLE CREATED BY MATT BIGELOW 4/5/2016
 */
var arr = [];
var arr2 = [];
var arr3 = [];
var engChinese = [];
var count = [];
var keyPosition = [];
var langCheck = [];
var check;
var matchScore = 0;


LanguageGame.MatchMaster = function (game) {
    this.score;
    this.flipCount;
    this.card = null;
    this.cardArray = [];
    this.tweenArray = [];
    this.wordBG = null;
    this.wordBox = null;
    this.backBox = null;
    this.livesBox = null;
    this.scoreBox = null;
    this.style = "";
    this.Flip = 0;
    this.sFlip = false;
    this.match = true;;
    this.cardOneKey;
    this.cardTwoKey;
    this.fTween = null;
    this.sTween = null;
    this.count = [];
    this.keys = [];
    this.chineseChars = [];
    this.englishWords = [];
    this.textArray = [];
    this.fCard;
    this.sCard;
    this.cardText = [];
    this.endCount = 0;

    this.gameOver;
    this.yea;
    this.woops;

};

LanguageGame.MatchMaster.prototype = {
    create: function () {
        this.wordBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'stars');
        this.card = this.add.image(800,800, 'rotatedCard');//dummy card
        this.card.width = "135";
        this.card.height = "105";
        this.style = {font: "50px Georgia", fill: "000000", align: "center"};
        this.createButtons();
        this.makeCards();
        this.makeTweens();
        this.repopulateSounds();

        //look at this again
        //move outside? or inside?

         var arr = []

         while(arr.length < 8){
             var randomnumber=Math.ceil(Math.random()*results.length)
             var found=false;

             for(var i=0;i<arr.length;i++){
                 if(arr[i]==randomnumber){found=true;break}
                }
             if(!found)arr[arr.length]=randomnumber;
            }

        //gets random keys from result into an array
        for(var i = 0; i<8; i++){
            arr2[i]  = results[arr[i]];
            }

        //check arrays
        for(var i=0; i<8; i++){
            count[i] = 0;
            langCheck[i]= 0;
            }

        //random function
        function getRandomInt(min, max){
            return Math.floor(Math.random() * (max-min+1)) + min;
            }

        //picks positions for english and chinese pairs
        for(var i=0; i<16; i++){
            check = false;
            while(check === false){
                place = getRandomInt(1,9);
                if(count[place-1] < 2){
                keyPosition[i]=arr2[place-1].id;
                    //puts in the correct character/english
                    if(langCheck[place-1]==0){
                        if(Math.random()>.5){
                            engChinese[i]=arr2[place-1].charText;
                            langCheck[place-1]=1;
                            }
                        else {
                            engChinese[i]=arr2[place-1].reducedDefinition;
                            langCheck[place-1]=2;
                            }
                        }
                    else
                    if(langCheck[place-1]==1){
                        engChinese[i]=arr2[place-1].reducedDefinition;
                        }
                    else
                    if(langCheck[place-1]==2){
                        engChinese[i]=arr2[place-1].charText;
                        }

                count[place-1]++;
                check = true;
                }
            }
        }
        
    },

    repopulateSounds:function(){
        this.gameOver = this.game.add.audio('gameOver');
        this.woops = this.game.add.audio('woops');
        this.yea = this.game.add.audio('yea');
    },

    getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max-min+1)) + min;
    },

    createButtons: function () {
        /*
         Method to create the back buttons, etc...
         * */
        this.backBox = this.add.image(this.world.centerX - 250, this.game.height - 120, 'back');
        this.backBox.inputEnabled = true; //now we can accept clicks/touches
        this.backBox.events.onInputDown.addOnce(this.back, this); //will happen when input happens


        this.livesBox = this.add.image(this.world.width + 125, this.world.height + 60, 'box');
        ;
    },

    stopCard: function () {
        this.fTween.stop(true);
        this.sTween.stop(true);
        this.endCount++;

        this.cardText[this.fCard].destroy();
        this.cardText[this.sCard].destroy();

    },

    back: function (pointer) {
        this.state.start('MainMenu');
    },

    makeTweens: function () {

        for (var i = 0; i < 16; i++) {
            this.tweenArray[i] = this.game.add.tween(this.cardArray[i]).to({
                x: this.cardArray[i].x,
                y: this.cardArray[i].y
            }, 1);

            var tweenFin = this.game.add.tween(this.cardArray[i]).to({x: 800, y: 800}, 1);
            this.tweenArray[i].chain(tweenFin);
            this.tweenArray[i].repeat(Infinity);
            this.tweenArray[i].start();
            var flipped = false;
            this.cardArray[i].events.onInputDown.add(this.flipped, this, this.cardArray[i], this.tweenArray[i], i);
            this.cardArray[i].events.onInputDown.add(this.setCardText, this, this.cardArray[i], this.tweenArray[i], i);//will happen when input happens
        }


    },

    flipped: function(pointer, cards, tween, n) {

        if(this.Flip == 0) {
            this.cardOneKey = keyPosition[n];
            this.fCard = n;
            this.fTween = tween;
        }

        else if(this.Flip == 1){
            this.cardTwoKey = keyPosition[n];
            this.sCard = n;
            this.Flip += 1;
            this.sTween = tween;
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetCard, this);
        }

    },

    resetCard: function(){
        this.flipCount --;

        if(this.Flip == 3){
        if(this.cardOneKey == this.cardTwoKey && this.fCard != this.sCard){
                this.score = this.score + 10; //earn 10 points for a match
                this.yea.play();
                //alert("Correct! +10 Points");
                this.Flip = 0;
                this.stopCard()

                if(this.endCount == 8){
                    this.yea.play();
                    //alert("You Won!");
                    matchScore = this.score
                    this.state.start('MatchMasterOver');
                }
            }

            else {
                this.score = this.score - 1; //lose 5 points for a non-match
                this.woops.play();
                //alert("Incorrect! -5 Points");
                this.match = false;

                if(this.flipCount == 0){
                    this.gameOver.play();
                    matchScore = this.score
                    this.state.start('MatchMasterOver');
                }


                this.cardText[this.fCard].destroy();
                this.cardText[this.sCard].destroy();
                this.Flip = 0;

                //this.makeTweens();
                //flip to original state
            }
        }
        else {//alert("Please Select 2 Cards!");}
        }
      },


    setCardText: function (pointer, cards, tween, n) {

        if(this.Flip!=3){
            var style;

            if(engChinese[n].length < 2){
                style = {font: "60px Georgia", fill: "000000", align: "center"};
            }
            else if(engChinese[n].length < 6){
                style = {font: "35px Georgia", fill: "000000", align: "center"};
            }
            else {
                style = {font: "20px Georgia", fill: "000000", align: "center"};
            }

        var j=Math.floor(n/4);

        var height = (this.card.height + 15)*j+153;
        var width = this.world.centerX - 260 + ((this.card.width+25)*(n%4));

        this.cardText[n] = this.game.add.text(width, height, engChinese[n], style);
        this.cardText[n].anchor.set(0.5);
        this.Flip += 1;
        return (this.cardText[n]);

        }
    },

    makeCards: function () {
        this.score = 10;
        this.flipCount = 70;

        var j= 0;
        for (var i=0; i<16; i++){

            this.cardArray[i] = this.add.image(this.world.centerX - 320 + ((this.card.width+25)*(i%4)),(this.card.height + 15)*j+100, 'rotatedCard');
            this.cardArray[i].width = "135";
            this.cardArray[i].height = "105";
            this.cardArray[i].inputEnabled = true;
            if(i%4==3){j++;}
        }

    },

    updateScore: function () {
        var style = {font: "40px Georgia", fill: "000000", align: "center", height:"500px", width:"100px"};
        this.scoreBox = null;
        this.scoreBox = this.add.image(this.world.centerX - 100, this.game.height - 100, 'box');
        var scoreText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, "Score: " + this.score, style);
        scoreText.anchor.set(0.5);
        this.scoreBox.addChild(scoreText);
    },

    updateLives: function () {
        var style = {font: "40px Georgia", fill: "000000", align: "center", height:"500px", width:"100px"};

        this.livesBox = null;
        this.livesBox = this.add.image(this.world.centerX + 125, this.game.height - 100, 'box');
        var lifeText = this.game.add.text(this.livesBox.width / 2, this.livesBox.height / 2 - 35, "Flips: " +  this.flipCount, style);
        
        lifeText.anchor.set(0.5);
        this.livesBox.addChild(lifeText);
    },

    update: function(){
        this.updateScore();
        this.updateLives();
    }
};