var words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", "watermelon", "ximenia", "yuzu", "zucchini"];
var randomIndex = Math.floor(Math.random() * words.length); 
var selectedWord = words[randomIndex];
var hiddenWord = selectedWord.replace(/\w/g, "*");


var wordElement = document.getElementById("word");
wordElement.innerHTML = hiddenWord;

function checkGuess() {
    
    var guessInput = document.getElementById("guess-input");
    var guess = guessInput.value.toLowerCase();
    
    if (guess === selectedWord) {
        displayMessage("You win!");
        }
    else {
        displayMessage("Try again. The word was: " + selectedWord );
        }
    guessInput.value = "";

    }

function displayMessage(message) {
    var messageElement = document.getElementById("message");
    messageElement.textContent = message;
}