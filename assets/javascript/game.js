


var wordsToGuess = ["potatoes","aragorn" ];
var GollumsRiddles = ["What has more eyes than you but cannot see? (We hates them)", "He stuffed us in a sack - not very kingly if yu ask us."];
var currentWordArray = [""];
var guessedLettersArray = [""];
var guessWord = "";
var wrongLettersArray = [""];
var wrongLetters = "";



var currentGame = {
    name: 'Hangman Game',
    totalWins: 0,
    guessMax: 7,
    guessesLeft: 7,
    currentWord: "",
    currentWordIndex: 0,
    gollumsRiddle: "",
    

    
    startNewWord  () {
    currentWordArray = [""];
    guessedLettersArray = [""];
    guessWord = "";
    this.currentWord = wordsToGuess[this.currentWordIndex];
    this.populateWordArrays();
    this.populateGollumsRiddle();
    this.currentWordIndex++;
    },

    populateWordArrays() {
        for (var i = 0; i < this.currentWord.length; i++ ){
            currentWordArray[i]= this.currentWord.charAt(i);
            guessedLettersArray[i] = "_";
            guessWord = guessWord + "_";
        }
        console.log (currentWordArray);
        console.log (guessedLettersArray);
        console.log (guessWord);
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
            //Actions if the letter is an incorret guess
        else {
            this.guessesLeft--;
            wrongLettersArray.push(letter);
            if (wrongLettersArray.length = 1) {
                wrongLetters = letter;
            }
            else {
            wrongLetters = wrongLetters + ", " + letter;
            }

        
        }
        return isCorrect;
    }


 }; // HangmanGame object closed


var display = {
    clearScreen() {
        document.getElementById('guessword').innerHTML="";
        document.getElementById('guessedletters').innerHTML = "";
        document.getElementById('gollumsriddle').innerHTML = "";
        document.getElementById('wins').innerHTML = "";
        document.getElementById('guesses').innerHTML = "";
    },

    updateScreen() {
        document.getElementById('guessword').innerHTML = guessWord;
        // document.getElementById('guessedletters').innerHTML = currentGame.gue ;
        document.getElementById('gollumsriddle').innerHTML = currentGame.gollumsRiddle ;
        document.getElementById('wins').innerHTML = currentGame.totalWins;
        document.getElementById('guesses').innerHTML = currentGame.guessesLeft ;   
    }

};


//  Initial operational code begins
display.clearScreen();
console.log (currentGame);
currentGame.startNewWord();
display.updateScreen();

// Captures key stroke by user
document.onkeyup = function(event) {
    // Determines which key was pressed.
    var userGuess = event.key;
    if (currentGame.incomingGuess(userGuess)) {
        // check for win
    }
    else {
        // check for loss
    }
        display.updateScreen();
};


