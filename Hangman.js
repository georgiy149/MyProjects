/*
Hangman: how to run

Requirements: Node.js (LTS) and WebStorm.

Open

In WebStorm: Get from VCS and paste the GitHub URL.
Click Clone, then Trust Project.

Run

Open the WebStorm terminal and run npm install (once).
Run node hangman/hangman.js.

Play

Both players enter their names.
Player 1 types a secret word. The screen clears.
Player 2 guesses one letter at a time, with 7 attempts.
Players swap roles each round.

Problems?

node is not recognized: install Node.js, restart WebStorm.
Cannot use import statement outside a module: add "type": "module" to package.json.
Cannot find module: run npm install.

*/
import io from "../utils/io-for-pf.js";
import {createArray} from "../utils/array-utils.js";

const MASK = "___";
const MAX_LIVES = 7;


function askName(question) {
    let name = "";
    while (name === "") {
        name = io.read(question).trim();
    }
    return name;
}

const PLAYERS = [
    askName("Naam van speler 1: "),
    askName("Naam van speler 2: ")
];


function playRound(secretWord, guesserName) {
    const hiddenWord = createArray(secretWord.length, MASK);
    const usedLetters = [];
    let lives = MAX_LIVES;

    while (lives > 0 && hiddenWord.includes(MASK)) {
        io.write(hiddenWord.join(" "));
        io.write(guesserName + ", u heeft nog " + lives + " pogingen over");
        if (usedLetters.length > 0) {
            io.write("Al geprobeerd: " + usedLetters.join(", "));
        }

        const guess = io.read("Doe een gok: ").toLowerCase();

        if (guess.length !== 1) {
            io.write("Geef één letter in.");
            continue;
        }
        if (usedLetters.includes(guess)) {
            io.write("Die letter heb je al geprobeerd.");
            continue;
        }
        usedLetters.push(guess);

        let found = false;
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === guess) {
                hiddenWord[i] = secretWord[i];
                found = true;
            }
        }

        if (!found) {
            lives--;
            io.write("Helaas, die letter zit er niet in.");
        }
    }

    return lives > 0;
}


function askSecretWord(setterName) {
    let word = "";
    while (word === "") {
        word = io.read(setterName + ", geef het geheime woord in: ").trim().toLowerCase();
    }

    io.write("\n".repeat(50));
    return word;
}

let setter = 0;
let playAgain = true;

while (playAgain) {
    const guesser = 1 - setter;
    const secretWord = askSecretWord(PLAYERS[setter]);

    const won = playRound(secretWord, PLAYERS[guesser]);

    if (won) {
        io.write( PLAYERS[guesser] + " heeft gewonnen. " );
    } else {
        io.write("Je hebt verloren, het woord was: " + secretWord);
    }

    setter = guesser;
    playAgain = io.read("Wil je nog spelen? [Ja/Nee]: ").toLowerCase() === "ja";
}

