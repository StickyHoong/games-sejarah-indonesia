const questions = [
    {
        question: "Siapa tokoh yang dijuluki sebagai Proklamator Indonesia?",
        options: ["Soekarno-Hatta", "Tan Malaka", "Soeharto", "Bung Tomo"],
        correct: 0
    },
    {
        question: "Kerajaan apakah yang memiliki semboyan Bhinneka Tunggal Ika?",
        options: ["Sriwijaya", "Majapahit", "Kutai", "Singasari"],
        correct: 1
    },
    {
        question: "Dimana lokasi Konferensi Asia Afrika pertama kali diadakan?",
        options: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta"],
        correct: 2
    },
    {
        question: "Siapa pahlawan wanita yang berasal dari Aceh?",
        options: ["Cut Nyak Dien", "R.A. Kartini", "Dewi Sartika", "Christina Martha"],
        correct: 0
    },
    {
        question: "Kapan VOC didirikan?",
        options: ["1596", "1602", "1619", "1799"],
        correct: 1
    }
];

let currentQuestion = -1;
let score = 0;
let answered = false;
let timer;
let timeLeft = 30;

function updateTimer() {
    const timerElement = document.getElementById('time');
    timerElement.textContent = timeLeft;
    
    if (timeLeft === 0) {
        clearInterval(timer);
        selectOption(-1); // Auto-submit when time runs out
    }
    timeLeft--;
}

function startTimer() {
    timeLeft = 15;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    document.querySelector('.question').textContent = questionData.question;
    
    const optionsHtml = questionData.options.map((option, index) => 
        `<div class="option" onclick="selectOption(${index})">
            ${String.fromCharCode(97 + index)}. ${option}
        </div>`
    ).join('');
    
    document.querySelector('.options-grid').innerHTML = optionsHtml;
    document.querySelector('.final-score').textContent = '';
    startTimer();
    updateProgress();
}

function calculateBonus() {
    return Math.max(0, timeLeft * 2); // 2 points per second remaining
}

function selectOption(optionIndex) {
    if (answered) return;
    
    answered = true;
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].correct;
    
    if (optionIndex >= 0) {
        options[optionIndex].classList.add('selected');
    }
    
    setTimeout(() => {
        if (optionIndex === correctIndex) {
            if (optionIndex >= 0) options[optionIndex].classList.add('correct');
            const timeBonus = calculateBonus();
            score += 100 + timeBonus; // Base score + time bonus
        } else {
            if (optionIndex >= 0) {
                options[optionIndex].classList.add('wrong');
                options[correctIndex].classList.add('correct');
            } else {
                options[correctIndex].classList.add('correct');
            }
        }
        
        document.getElementById('score').textContent = score;
        document.querySelector('button').textContent = 'Lanjut';
        document.querySelector('button').style.display = 'block';
    }, 500);
}

function nextQuestion() {
    answered = false;
    
    if (currentQuestion >= questions.length - 1) {
        const maxPossibleScore = questions.length * (100 + 60); // Base score + max time bonus
        const percentage = (score / maxPossibleScore * 100).toFixed(1);
        document.querySelector('.question').textContent = 'Kuis Selesai!';
        document.querySelector('.options-grid').innerHTML = '';
        document.querySelector('.final-score').innerHTML = 
            `Skor Akhir: ${score} (${percentage}%)<br>
            <small>Jawaban benar + bonus waktu</small>`;
        document.querySelector('button').textContent = 'Mulai Ulang';
        document.querySelector('.progress').style.width = '100%';
        clearInterval(timer);
        currentQuestion = -1;
        score = 0;
        document.getElementById('score').textContent = '0';
    } else {
        currentQuestion++;
        showQuestion();
        document.querySelector('button').style.display = 'none';
    }
}

function goBack() {
    window.location.href = "Landingpage.html";
}

