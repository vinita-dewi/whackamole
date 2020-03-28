var hole = document.getElementsByClassName("holes");
var arrMole = document.getElementsByClassName("moles");
var score = document.getElementById("scorenum");
var countdown = document.getElementById("timernum");
var button = document.getElementById("startbutton")
var timeCount;
var chooseHole = 0;
var prevHole = 0;
var cek = false
var points = 0;

function timer(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomize(hole) {
    var index = Math.floor(Math.random() * hole.length);
    chooseHole = hole[index]
    if (chooseHole == prevHole) {
        console.log('samaa!')
        randomize(hole)

    }
    prevHole = chooseHole;
    return chooseHole;
}

function showMole() {
    var hideMole = timer(1000,1500)  
    var whichHole = randomize(hole)
    whichHole.classList.add('up')
    setTimeout(() => {
        whichHole.classList.remove('up');
        if (!cek) {
            showMole()
        }
    }, hideMole);
}

function gameBegin() {
    countTime(30)
    score.textContent = 0;
    cek = false;
    points = 0;
    showMole();
    setTimeout(() => cek = true, 30000) // timer 30s
}

function hit(e) {
    points++
    this.parentNode.classList.remove('up');
    score.textContent = points;
}

for (var i = 0; i < arrMole.length; i++) {
    arrMole[i].addEventListener('click', hit)
}

function countTime(second) {
    var now = Date.now();
    var later = now + second * 1000;
    displayTime(second)
    timeCount = setInterval(() => {
        var remainingTime = Math.round((later - Date.now()) / 1000);
        if (remainingTime < 0) {
            clearInterval(timeCount);
            return;
        }
        displayTime(remainingTime)
    }, 1000)
}

function displayTime(second) {
    countdown.textContent = second;
}
button.addEventListener('click',gameBegin)
