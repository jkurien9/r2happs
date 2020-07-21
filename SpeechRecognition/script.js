const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
 
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

console.log("Number: ", randomNum);

// Initialize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// Speech recognition object
let recognition = new window.SpeechRecognition();

// Start the game
recognition.start();

// Create inSpeak function
function onSpeak(e) {
    //console.log(e);
    const msg = e.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}

// Listen for the result event
recognition.addEventListener('result', onSpeak);

function writeMessage(msg) {
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span class="box"> ${msg} </span>`
};

function checkNumber(msg) {
    const num = +msg;
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div> That is not a valid number </div>';
        return;
    }
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div> Your number must be between 1 - 100 </div>';
        return;
    }
    if(num === randomNum) {
        document.body.innerHTML = `
        <h2> Congrats! You guessed the number <br><br>
        It was ${num} </h2>
        <button class="Play-again" id="Play-again"> Play again </button>`;
    } else if(num > randomNum) {
        msgEl.innerHTML += '<div> GO LOWER </div>';
    } else {
        msgEl.innerHTML += '<div> GO HIGHER </div>';
    }
}

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})

