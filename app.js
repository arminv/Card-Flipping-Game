// TODO: Add a tracker to see how many attempts it took to win.

const NUMBER_OF_PAIRS = 8;
const DEFAULT_IMG = './img/default.png';

// Number of clicks:
var numClick = 0;
// Values of clicks:
var clickValues = [];
// This will be used for finding matched cards:
var gameState = [3, 4, 3, 8, 6, 4, 8, 7, 2, 7, 5, 5, 2, 1, 6, 1];
// Number of card pairs matched:
var numberOfWins = 0;
var firstGame = true;

const resetState = () => {
  numClick = 0;
  clickValues = [];
};

const resetImages = () => {
  document.getElementById(clickValues[0].toString()).src = DEFAULT_IMG;
  document.getElementById(clickValues[1].toString()).src = DEFAULT_IMG;
};

const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
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
};

shuffle(gameState);

const newGame = () => {
  numberOfWins = 0;
  restartTimer();
  resetState();
  shuffle(gameState);
  for (i = 1; i < 17; i++) {
    document.getElementById(i.toString()).style.visibility = 'visible';
    document.getElementById(i.toString()).src = DEFAULT_IMG;
  }
};

const runGame = (original) => {
  if (firstGame) {
    startTimer();
  }
  clickValues.push(original);

  if (numClick == 0) {
    var elOne = document.getElementById(original.toString());
    elOne.src =
      './img/' + gameState[clickValues[numClick] - 1].toString() + '.jpg';
    numClick++;
  } else if (numClick == 1) {
    if (clickValues[0] === clickValues[1]) {
      alert('Choose a different card please!');
      resetImages();
      resetState();
    } else {
      var elTwo = document.getElementById(original.toString());
      elTwo.src =
        './img/' + gameState[clickValues[numClick] - 1].toString() + '.jpg';
      numClick++;

      if (gameState[clickValues[0] - 1] === gameState[clickValues[1] - 1]) {
        document.getElementById(clickValues[0].toString()).style.visibility =
          'hidden';
        document.getElementById(clickValues[1].toString()).style.visibility =
          'hidden';
        resetState();
        numberOfWins++;
      } else {
        setTimeout(resetImages, 500);
        setTimeout(resetState, 500);
      }
    }
  }
  if (numberOfWins >= NUMBER_OF_PAIRS) {
    if (
      confirm(
        `Game is Over! Your Time Was: ${stopwatchEl.innerHTML}. Would you like to play again?`
      )
    ) {
      newGame();
    } else {
      pauseTimer();
      return;
    }
  }
};

// -----------------Stopwatch-----------------
// https://www.youtube.com/watch?v=oY8V6GuZrkM

var milliseconds = 0,
  seconds = 0,
  minutes = 0;
var timer;

const stopwatchEl = document.querySelector('.timer');

const startTimer = () => {
  if (!timer) {
    timer = setInterval(runTimer, 10);
  }
};

const runTimer = () => {
  stopwatchEl.innerHTML = getTimer();
  milliseconds++;
  if (milliseconds == 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
};

const pauseTimer = () => {
  clearInterval(timer);
  timer = false;
};

const stopTimer = () => {
  clearInterval(timer);
  timer = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  stopwatchEl.innerHTML = getTimer();
};

const restartTimer = () => {
  stopTimer();
  startTimer();
};

const getTimer = () => {
  return (
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds) +
    ':' +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds)
  );
};
// -------------------------------------------
