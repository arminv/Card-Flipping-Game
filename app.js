const NUMBER_OF_PAIRS = 8;
const DEFAULT_IMG = './img/default.png';
// Number of clicks:
let numClick = 0;
// Values of clicks
let clickValues = [];
// This will be used for finding matched cards:
let myState = [3, 4, 3, 8, 6, 4, 8, 7, 2, 7, 5, 5, 2, 1, 6, 1];
// Number of card pairs matched:
let myWins = 0;

// TODO: Add a timer to see how long it takes the user to finish the game:

const resetState = () => {
    numClick = 0;
    clickValues = [];
}

const resetImages = () => {
    document.getElementById(clickValues[0].toString()).src = DEFAULT_IMG;
    document.getElementById(clickValues[1].toString()).src = DEFAULT_IMG;
}

const shuffle = array => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

shuffle(myState);

const myNewGame = () => {
    resetState();
    myWins = 0;
    shuffle(myState);
    for (i = 1; i < 17; i++) {
        document.getElementById(i.toString()).style.visibility = 'visible';
        document.getElementById(i.toString()).src = DEFAULT_IMG;
    }
}

const myReplace = original => {
    clickValues.push(original);

    if (numClick == 0) {
        var elOne = document.getElementById(original.toString());
        elOne.src = './img/' + myState[clickValues[numClick] - 1].toString() + '.jpg';
        numClick++;

    } else if (numClick == 1) {
        if (clickValues[0] === clickValues[1]) {
            alert('Choose a different card please!');
            resetImages();
            resetState();
        }

        var elTwo = document.getElementById(original.toString());
        elTwo.src = './img/' + myState[clickValues[numClick] - 1].toString() + '.jpg';
        numClick++;

        if (myState[clickValues[0] - 1] === myState[clickValues[1] - 1]) {
            document.getElementById(clickValues[0].toString()).style.visibility = 'hidden';
            document.getElementById(clickValues[1].toString()).style.visibility = 'hidden';
            resetState();
            myWins++;
        } else {
            setTimeout(resetImages, 500);
            setTimeout(resetState, 500);
        }
    }
    if (myWins >= NUMBER_OF_PAIRS) {
        if (confirm("Game is Over! Would you like to play again?")) {
            myNewGame();
        } else {
            return;
        }
    }
};
