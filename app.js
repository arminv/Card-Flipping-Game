// Number of clicks:
var numClick = 0;
// Values of clicks
var clickValues = [];
// This will be used for finding matched cards:
var myState = [3, 4, 3, 8, 6, 4, 8, 7, 2, 7, 5, 5, 2, 1, 6, 1];
// Number of card pairs matched:
var myWins = 0;

function resetState() {
    this.numClick = 0;
    this.clickValues = [];
}

function resetImages() {
    document.getElementById(this.clickValues[0].toString()).src = './img/default.jpg';
    document.getElementById(this.clickValues[1].toString()).src = './img/default.jpg';
}

function shuffle(array) {
    var currentIndex = array.length,
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

function myNewGame() {
    resetState();
    this.myWins = 0;
    shuffle(this.myState);
    for (i = 1; i < 17; i++) {
        document.getElementById(i.toString()).style.visibility = "visible";
        document.getElementById(i.toString()).src = './img/default.jpg';
    }
}

function myReplace(original) {
    this.clickValues.push(original);

    if (this.numClick == 0) {
        var elOne = document.getElementById(original.toString());
        elOne.src = './img/' + this.myState[clickValues[numClick] - 1].toString() + '.jpg';
        this.numClick++;

    } else if (this.numClick == 1) {
        if (clickValues[0] === clickValues[1]) {
            alert('Choose a different card please!');
            resetImages();
            resetState();
        }

        var elTwo = document.getElementById(original.toString());
        elTwo.src = './img/' + this.myState[clickValues[numClick] - 1].toString() + '.jpg';
        this.numClick++;

        if (this.myState[clickValues[0] - 1] === this.myState[clickValues[1] - 1]) {
            document.getElementById(this.clickValues[0].toString()).style.visibility = "hidden";
            document.getElementById(this.clickValues[1].toString()).style.visibility = "hidden";
            resetState();
            myWins++;
        } else {
            setTimeout(resetImages, 500);
            setTimeout(resetState, 500);
        }
    }
    if (myWins >= 8) {
        alert('Game is Over!');
        myNewGame();
    }
};
