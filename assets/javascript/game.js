


// global variables
var wordsToGuess = ["potatoes", "hobbits", "aragorn","shelob","boromir" ];
var GollumsRiddles = ["What has more eyes than you but cannot see? (We hates them)", "They are the short people that stole the precious!", "He stuffed us in a sack - not very kingly if yu ask us.","She can do the works for us - nasty hobbits deserve her attention!","he wants the precious too!  why is he loved and we aren't?"];
var currentWordArray = [""];
var guessedLettersArray = [""];
var guessWord = "";
var wrongLettersArray = [""];
var wrongLetters = "";
//objects 
// game object that runs the rules of the game
var currentGame = {
    name: 'Hangman Game',
    totalWins: 0,
    guessMax: 12,
    guessesLeft: this.guessMax,
    currentWord: "",
    currentWordIndex: 0,
    gollumsRiddle: "",
    
    startNewWord  () {
    currentWordArray = [""];
    guessedLettersArray = [""];
    guessWord = "";
    wrongLetters = "";
    wrongLettersArray = [""];
    this.guessesLeft = this.guessMax;
    this.currentWord = wordsToGuess[this.currentWordIndex];
    this.populateWordArrays();
    this.populateGollumsRiddle();
    this.currentWordIndex++;
    },

    populateWordArrays() {
        if (this.currentWordIndex < wordsToGuess.length) {
            for (var i = 0; i < this.currentWord.length; i++ ){
                currentWordArray[i]= this.currentWord.charAt(i);
                guessedLettersArray[i] = "_";
                guessWord = guessWord + "_";
            }
        }
        else {
            alert("That's all - now goes away!");
        }
    },

    populateGollumsRiddle() {
        this.gollumsRiddle = GollumsRiddles[this.currentWordIndex];
    },

    incomingGuess(letter) {
        var isCorrect = false;
        for (var i = 0; i < this.currentWord.length; i++ ){
            if (currentWordArray[i] == letter){
                guessedLettersArray[i] = letter;
                isCorrect = true;
            }
        }
        //Actions if the letter is a correct guess
        if (isCorrect) {
            guessWord = ""
            for (var j = 0; j < this.currentWord.length; j++){
                guessWord = guessWord + guessedLettersArray[j];
            }
        }
            //Actions if the letter is an incorrect guess
        else {
            if (this.wasAlreadyGuessed (letter)){
                //do nothing
            }
            else {
                this.guessesLeft--;
                wrongLettersArray.push(letter);
                if (wrongLettersArray.length <= 2) {
                    wrongLetters = letter;
                }
                else {
                    wrongLetters = wrongLetters + ", " + letter;
                }
            }        
        }
        return isCorrect;
    },

    wasAlreadyGuessed (checkLetter){
        var returnValue = false;
        if (wrongLettersArray.indexOf(checkLetter) > -1){returnValue = true;}
        return returnValue;
    },

    win (){
        var returnValue = true;
        if (guessedLettersArray.indexOf("_") > -1){returnValue = false;}
        return returnValue;
    },

    loss (){
        var returnvalue = false;
        if (this.guessesLeft <=0) {returnvalue = true;}
        return returnvalue;
    }

 }; // Game object closed
//display object controls the presentation to the user
var display = {
    clearScreen() {
        document.getElementById('guessword').innerHTML="";
        document.getElementById('wrongletters').innerHTML = "";
        document.getElementById('gollumsriddle').innerHTML = "";
        document.getElementById('wins').innerHTML = "";
        document.getElementById('guesses').innerHTML = "";
    },

    updateScreen() {
        document.getElementById('guessword').innerHTML = guessWord;
        document.getElementById('wrongletters').innerHTML = wrongLetters;
        document.getElementById('gollumsriddle').innerHTML = currentGame.gollumsRiddle;
        document.getElementById('wins').innerHTML = currentGame.totalWins;
        document.getElementById('guesses').innerHTML = currentGame.guessesLeft; 
        document.getElementById("gollumwalking").style.left= (10 + ((currentGame.guessMax -currentGame.guessesLeft) * 12))   + "px"; 
        document.getElementById("precious").style.left= (82 + (currentGame.guessMax) * 10)   + "px";
    },

    playAudio(ElementName) { 
        var myElement  = document.getElementById(ElementName); 
        myElement.play(); 
    } 

}; //Display object closed

//  Operational code begins:
//Initial setup
display.clearScreen();
currentGame.startNewWord();
display.updateScreen();
// runs on key stroke event by user
document.onkeyup = function(event) {
    var userGuess = event.key;
    //passes the key to the currentgame object for evaluation
    if (currentGame.incomingGuess(userGuess)) { 
        // returned true (correct guess): check for win
        if (currentGame.win()) {
            currentGame.totalWins++;            
            display.playAudio ("winaudio");
            currentGame.startNewWord();
        }
    }
    else {
        // returned false (incorrect guess):  check for loss
        if (currentGame.loss()) {
            display.playAudio ("loseaudio");
            currentGame.startNewWord();
        }
    }             
    display.clearScreen ();
    display.updateScreen();
};


