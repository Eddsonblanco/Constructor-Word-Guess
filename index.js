var Word = require("./word.js");
var inquirer = require("inquirer");
const chalk = require('chalk');

var letterArray = "abcdefghijklmnopqrstuvwxyz";
var animalArray = ["leopard", "antelope", "bird", "bison", "armadillo", "caiman", "manatee", "dolphin", "chimpanzee", "cougar",
 "crab", "eagle", "penguin", "falcon", "elephant", "lizard", "frog", "jellyfish", "kangaroo"];
var wordIndex = Math.floor(Math.random() * animalArray.length);
var randomWord = animalArray[wordIndex];
wordToGuess = new Word(randomWord);
var newWord = false;
var wrong = [];
var correct = [];
var guessesRemaining = 10;
 
function Play() {
    if (newWord) {
        var wordIndex = Math.floor(Math.random() * animalArray.length);
        var randomWord = animalArray[wordIndex];

        wordToGuess = new Word(randomWord);
        newWord = false;
    }
    
    var wordComplete = [];
    wordToGuess.letterArr.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: chalk.black.bgCyan.bold( "click any letter and guess the Animal, Good luck!"),
                    name: "userinput"
                }
            ])
            .then(function(input) {
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nTry again!\n");
                    Play();
                } else {  
                    if (wrong.includes(input.userinput) || correct.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed\n");
                        Play();
                    } else {
                        // Checks if guess is correct
                        var wordCheckArray = [];
                        wordToGuess.userLetter(input.userinput);
                        wordToGuess.letterArr.forEach(wordCheck);

                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            wrong.push(input.userinput);
                            guessesRemaining--;
                        } else {
                            console.log("\nCorrect!\n") 
                            correct.push(input.userinput);
                        }
                        wordToGuess.track();

                        console.log(chalk.redBright.bgCyan.bold("Guesses Left:" +  guessesRemaining) + "\n");
                        console.log("Letters Guessed: " + wrong.join(" ") + "\n");
                    
                        if (guessesRemaining > 0) {
                            // Call function 
                            Play();
                        } else {
                            console.log(chalk.black.bgBlueBright.bold("Sorry you lose!\n"));

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
        } else {
            console.log( chalk.gray.bgYellowBright.bold ("YAY  WINNER\n"));
            restartGame();
        }
        
        function completeCheck(key) {
            wordComplete.push(key.guessed);
        }
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select an option:",
                choices: ["TRY Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                newWord = true;
                wrongLetters = [];
                correctLetters = [];
                guessesRemaining = 10;
                playGame();
            } else {
                return
            }
        })
}

Play();