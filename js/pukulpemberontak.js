const pahlawan = [
    "Soekarno",
    "Mohammad Hatta",
    "Sudirman",
    "Cut Nyak Dien",
    "Kartini",
    "Diponegoro",
    "Pattimura",
    "Imam Bonjol"
];

const pemberontak = [
    "Westerling",
    "Van der Plas",
    "Van Mook",
    "Douwes Dekker",
    "Van Heutsz",
    "Pieter Both",
    "Jan Pieterszoon Coen",
    "Herman Willem Daendels"
];

let score = 0;
let timeLeft = 30;
let gameInterval;
let characterInterval;
let isPlaying = false;
let soundOn = true;

function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    isPlaying = true;
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('gameOver').style.display = 'none';

    // Clear existing intervals
    clearInterval(gameInterval);
    clearInterval(characterInterval);

    // Start game intervals
    gameInterval = setInterval(updateTimer, 1000);
    characterInterval = setInterval(showRandomCharacter, 1000);
}

function showRandomCharacter() {
    const characters = document.querySelectorAll('.character');
    characters.forEach(char => char.classList.remove('active'));

    const randomHoles = new Set();
    while(randomHoles.size < 3) {
        randomHoles.add(Math.floor(Math.random() * 6));
    }

    randomHoles.forEach(holeIndex => {
        const character = characters[holeIndex];
        const isPahlawan = Math.random() < 0.5;
        const names = isPahlawan ? pahlawan : pemberontak;
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        character.textContent = randomName;
        character.className = `character active ${isPahlawan ? 'pahlawan' : 'pemberontak'}`;
        character.onclick = () => hitCharacter(isPahlawan);
    });
}

function hitCharacter(isPahlawan) {
    if (!isPlaying) return;

    if (isPahlawan) {
        score -= 5; // Pengurangan skor jika memukul pahlawan
    } else {
        score += 10; // Penambahan skor jika memukul pemberontak
    }
    
    document.getElementById('score').textContent = score;
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(characterInterval);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'block';

    // Clear active characters
    const characters = document.querySelectorAll('.character');
    characters.forEach(char => char.classList.remove('active'));
}

function goBack() {
    window.location.href = 'index.html';
}

function toggleSound() {
    soundOn = !soundOn;
    const soundButton = document.querySelector('.control-buttons button:last-child');
    soundButton.textContent = soundOn ? 'Suara On' : 'Suara Off';
}

// Prevent dragging of character names
document.addEventListener('dragstart', (e) => e.preventDefault());

function goBack() {
    window.location.href = "index.html";
}
