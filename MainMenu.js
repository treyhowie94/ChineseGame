/*Initialization of the MainMenu object of LanguageGame.  This object represents the MainMenu state, and its respective
 * variables and parameters.  The purpose of this state is give the user a nice way to navigate between games.
 */

var gradeLevel = 1; 

  var results; 

   $.ajax({
    dataType: 'json',
    url: 'ChineseGame.php/' + gradeLevel,
    success: function(data){
        results = data; 
    }
    })



LanguageGame.MainMenu=function(game){
    this.game1 = null;              //Text/Card for Conveyor Game
    this.game2 = null;              //Text/Card for MatchMaster Game
    this.game3 = null;              //Text/Card for Card Ninja Game
    
    this.grade1 = null; 
    this.grade2 = null; 
    this.grade3 = null; 
    this.grade4 = null; 
    this.grade5 = null; 
    this.grade6 = null; 
    this.grade7 = null; 
    
    this.selectionPrompt = null;    //Text telling the user to choose a game
    this.mainBG = null;             //Background for Main Menu
    this.cardText1 = null;          //Text for Conveyor card
    this.cardText2 = null;          //Text for MatchMaster card
    this.cardText3 = null;          //Text for Card Ninja card
    
    this.cardTextg1 = null; 
    this.cardTextg2 = null; 
    this.cardTextg3 = null; 
    this.cardTextg4 = null; 
    this.cardTextg5 = null; 
    this.cardTextg6 = null; 
    this.cardTextg7 = null; 
    
    this.style = null;              //Default style for text
    this.help = null;   
    this.gradeSelect; 
    //Text/Card for "How to play" display
};

//Prototype for MainMenu object of LanguageGame
LanguageGame.MainMenu.prototype={

    //-------------------------  TOP-LEVEL FUNCTIONS -------------------------//
    //The following are functions used by Phaser itself while the game is running


    /* Built-in function used by Phaser.  Called upon entering the MainMenu state
     * Initializes the MainMenu state.
     */
     create: function(){
         
    

     //Adding background
     this.mainBG = this.add.image(this.world.centerX - 270, this.world.centerY - 480, 'bg');

     //Adding help button
     this.help = this.add.image(this.world.centerX - 225,this.game.height-50, 'help');
     this.help.anchor.set(0.5);
     this.help.inputEnabled = true;
     this.help.events.onInputDown.addOnce(this.startHelp, this);
         
         
        //adding grade level cards 
        //grade 1
        this.grade1=this.add.image(this.world.centerX-250,this.world.centerY-210,'card');
        this.grade1.width = "70"; 
        this.grade1.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg1=this.game.add.text(70/2,90/2,"Grade: 1",this.style);
        this.cardTextg1.anchor.set(0.5);
        this.cardTextg1.x = Math.floor(this.grade1.x + 70/2);
        this.cardTextg1.y= Math.floor(this.grade1.y + 90/2);
         
        this.grade1.inputEnabled=true;
        this.grade1.events.onInputDown.add(this.gradeOne);   
         
        //grade 2
        this.grade2=this.add.image(this.world.centerX-250,this.world.centerY-110,'card');
        this.grade2.width = "70"; 
        this.grade2.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg2=this.game.add.text(70/2,90/2,"Grade: 2",this.style);
        this.cardTextg2.anchor.set(0.5);
        this.cardTextg2.x = Math.floor(this.grade2.x + 70/2);
        this.cardTextg2.y= Math.floor(this.grade2.y + 90/2);
         
        this.grade2.inputEnabled=true;
        this.grade2.events.onInputDown.add(this.gradeTwo);
         
        //grade 3

        this.grade3=this.add.image(this.world.centerX-250,this.world.centerY-10,'card');
        this.grade3.width = "70"; 
        this.grade3.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg3=this.game.add.text(70/2,90/2,"Grade: 3",this.style);
        this.cardTextg3.anchor.set(0.5);
        this.cardTextg3.x = Math.floor(this.grade3.x + 70/2);
        this.cardTextg3.y= Math.floor(this.grade3.y + 90/2);
         
        this.grade3.inputEnabled=true;
        this.grade3.events.onInputDown.add(this.gradeThree);
         
        //grade 4
        this.grade4=this.add.image(this.world.centerX-170,this.world.centerY-210,'card');
        this.grade4.width = "70"; 
        this.grade4.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg4=this.game.add.text(70/2,90/2,"Grade: 4",this.style);
        this.cardTextg4.anchor.set(0.5);
        this.cardTextg4.x = Math.floor(this.grade4.x + 70/2);
        this.cardTextg4.y= Math.floor(this.grade4.y + 90/2);
         
        this.grade4.inputEnabled=true;
        this.grade4.events.onInputDown.add(this.gradeFour);
        
         //grade 5
        this.grade5=this.add.image(this.world.centerX-170,this.world.centerY-110,'card');
        this.grade5.width = "70"; 
        this.grade5.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg5=this.game.add.text(70/2,90/2,"Grade: 5",this.style);
        this.cardTextg5.anchor.set(0.5);
        this.cardTextg5.x = Math.floor(this.grade5.x + 70/2);
        this.cardTextg5.y= Math.floor(this.grade5.y + 90/2);
         
        this.grade5.inputEnabled=true;
        this.grade5.events.onInputDown.add(this.gradeFive);
         
        //grade 6
        this.grade6=this.add.image(this.world.centerX-170,this.world.centerY-10,'card');
        this.grade6.width = "70"; 
        this.grade6.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg6=this.game.add.text(70/2,90/2,"Grade: 6",this.style);
        this.cardTextg6.anchor.set(0.5);
        this.cardTextg6.x = Math.floor(this.grade6.x + 70/2);
        this.cardTextg6.y= Math.floor(this.grade6.y + 90/2);
         
        this.grade6.inputEnabled=true;
        this.grade6.events.onInputDown.add(this.gradeSix);
                 
        //grade 7 
        this.grade7=this.add.image(this.world.centerX-210,this.world.centerY+90,'card');
        this.grade7.width = "70"; 
        this.grade7.height = "90"; 
         
        this.style={font: "18px Georgia",fill:"000000",align:"center"};
        this.cardTextg7=this.game.add.text(70/2,90/2,"Grade: 7",this.style);
        this.cardTextg7.anchor.set(0.5);
        this.cardTextg7.x = Math.floor(this.grade7.x + 70/2);
        this.cardTextg7.y= Math.floor(this.grade7.y + 90/2);
         
        this.grade7.inputEnabled=true;
        this.grade7.events.onInputDown.add(this.gradeSeven);
           
         //Adding Conveyor card and text
         this.game1=this.add.image(this.world.centerX-60,this.world.centerY+100,'card');

          this.style={font: "30px Georgia",fill:"000000",align:"center"};
          this.cardText1=this.game.add.text(138/2,180/2,"Card\nNinja",this.style);
          this.cardText1.anchor.set(0.5);
          this.cardText1.x = Math.floor(this.game1.x + 138/2);
          this.cardText1.y= Math.floor(this.game1.y+180/2);


         //Adding MatchMaster card and text
          this.game2=this.add.image(this.world.centerX-60,this.world.centerY-100,'card');

          this.style={font: "30px Georgia",fill:"000000",align:"center"};
          this.cardText2=this.game.add.text(138/2,180/2,"Match\nMaster",this.style);
          this.cardText2.anchor.set(0.5);
          this.cardText2.x = Math.floor(this.game2.x + 138/2);
          this.cardText2.y= Math.floor(this.game2.y+180/2);

          //Adding Card Ninja card and text
          this.game3=this.add.image(this.world.centerX-60,this.world.centerY-300,'card');

          this.style={font: "30px Georgia",fill:"000000",align:"center"};
          this.cardText3=this.game.add.text(138/2,180/2,"Conveyor",this.style);
          this.cardText3.anchor.set(0.5);
          this.cardText3.x = Math.floor(this.game3.x + 138/2);
          this.cardText3.y= Math.floor(this.game3.y+180/2);

          //Setting all the game cards to accept input, and start the appropriate games
          this.game1.inputEnabled=true;
          this.game1.events.onInputDown.addOnce(this.startNinja,this);

          this.game2.inputEnabled=true;
          this.game2.events.onInputDown.addOnce(this.startMatchMaster,this);

          this.game3.inputEnabled=true;
          this.game3.events.onInputDown.addOnce(this.startConveyor,this);

          //Set the selection prompt text.
          this.selectionPrompt=this.add.bitmapText(this.world.centerX-150, this.world.centerY+300, 'eightbitwonder', 'Choose a Game', 24);

  },

    //-------------------------  UTILITY FUNCTONS -------------------------//
    //The following functions provide utilities that are used in create() and update()

    //grade select 
    gradeOne: function(){
        gradeLevel = 1; 
        alert("You have selected - Grade Level 1!"); 
        
        
            $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });
    }, 
    
    gradeTwo: function(){
        gradeLevel = 2; 
        alert("You have selected - Grade Level 2!"); 
        
          $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });
    }, 
    
    gradeThree: function(){
        gradeLevel = 3; 
        alert("You have selected - Grade Level 3!"); 
        
          $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });
    },  
    
    gradeFour: function(){
        gradeLevel = 4; 
        alert("You have selected - Grade Level 4!"); 
        
          $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });
    },  
    
    gradeFive: function(){
        gradeLevel = 5; 
        alert("You have selected - Grade Level 5!"); 
        
          $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });
    },  
    
    gradeSix: function(){
        gradeLevel = 6; 
        alert("You have selected - Grade Level 6!"); 
        
          $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });

    },  
    
    gradeSeven: function(){
        gradeLevel = 7; 
        alert("You have selected - Grade Level 7+!"); 
        
          $.ajax({
            dataType: 'json',
            url: 'ChineseGame.php/' + gradeLevel,
            success: function(data){
            results = data; 
            }
            });
    }, 
    
    //Function to start the "How to play" state
    startHelp: function(pointer){
        this.state.start('HowTo');
    },
    //Function to start Card Ninja
    startNinja:function(pointer){
        this.state.start('Ninja');
    },
    //Function to start MatchMaster
    startMatchMaster:function(pointer){
      this.state.start('MatchMaster');
    },
    //Function to start Conveyor
    startConveyor:function(pointer){
        this.state.start('Conveyor');
    }
};