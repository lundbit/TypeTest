/*   Match your constants to match html components */

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
// This allows you to have setInterval to a variable to close when all matches
var interval;
// Need variable to reset the timer
var timerRunning = false;




// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <=9) {
    // taking advantage of a string combing with a number!!
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck () {
  let inputEntry = testArea.value;
  // truncate the original text to match as user tyes
  // .substring (where you want to match within the string, amount of characters)
  let originTextMatch = originText.substring(0,inputEntry.length);
  if (inputEntry == originText) {
    // This stops the clock once everything mathces perfectly
    clearInterval(interval);
    testWrapper.style.borderColor = "#429890";
  } else {
    if(inputEntry == originTextMatch) {
        testWrapper.style.borderColor = "#65CCf3";
    } else {
        testWrapper.style.borderColor = "#E95D0F";
    }
  }
}

// Start the timer on very first key pressed:
function start() {
  // .value is the data being entered in field .length measures characters
  // when inputLengthtext=0 ,or the first entry, start the timer

  let inputLengthtext = testArea.value.length;
  if (inputLengthtext === 0 && !timerRunning) {
    /*toggles if the test has started to true and keeps at true to prevent
     timer from running again */
    timerRunning = true;
    // assign to interval for use in functions that match accuracy on timer
    interval = setInterval(runTimer, 10);
  }

}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00"
  testWrapper.syle.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
// reminder that id test-area turns into testArea for script
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click", reset, false);
