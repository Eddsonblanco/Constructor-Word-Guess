var Letter = require("./letter.js");

function Word(answer) {
    this.letterArr = [];

    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.letterArr.push(letter);
    }
   
    this.track = function () {
        trackAnswers = "";
        for (var i = 0; i < this.letterArr.length; i++) {
            trackAnswers += this.letterArr[i] + " ";
        }
        console.log(trackAnswers + "\n");
    }
    
    this.userLetter = function (guess) {
        for (var i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].guess(guess);
        }
    }
}

module.exports = Word;