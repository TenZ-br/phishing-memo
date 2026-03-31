// Questions for quiz
const questions = [
    {
        text: "Вы получили SMS: «Ваша карта заблокирована. Разблокируйте по ссылке: http://sber-secure.ru» — это фишинг?",
        options: ["Да, это фишинг", "Нет, это официальное сообщение"],
        correct: 0,
        explanation: "Официальный домен Сбербанка — sberbank.ru. Любые вариации (secure, safe, verify) — признак фишинга."
    },
    {
        text: "Ссылка https://gosuslugi.ru/pay — это фишинг?",
        options: ["Да", "Нет"],
        correct: 1,
        explanation: "Это официальный домен Госуслуг — gosuslugi.ru. Ссылка ведет на легитимный сайт."
    },
    {
        text: "Письмо от «техподдержки Wildberries»: «Ваш заказ не может быть доставлен. Перейдите по ссылке: https://wb-verify.com» — что это?",
        options: ["Это официальное уведомление", "Это фишинговая атака"],
        correct: 1,
        explanation: "Официальный домен Wildberries — wildberries.ru. Домен wb-verify.com — подделка."
    },
    {
        text: "Вы навели курсор на ссылку и увидели: https://google.com@phishing-site.ru — это безопасно?",
        options: ["Да, потому что есть google.com", "Нет, это фишинг"],
        correct: 1,
        explanation: "В URL всё, что после символа @ — реальный адрес. Настоящий сайт — phishing-site.ru, а google.com — только приманка."
    },
    {
        text: "Ссылка https://vk.com/security (официальный ВКонтакте) — это фишинг?",
        options: ["Да", "Нет"],
        correct: 1,
        explanation: "vk.com — официальный домен ВКонтакте. Это безопасная ссылка."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizNextBtn = document.getElementById('quizNextBtn');
const quizResult = document.getElementById('quizResult');
const quizContainer = document.getElementById('quizContainer');

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    quizQuestion.textContent = q.text;
    
    quizOptions.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = 'quiz-option';
        btn.addEventListener('click', () => checkAnswer(index, btn));
        quizOptions.appendChild(btn);
    });
    
    quizFeedback.innerHTML = '';
    quizNextBtn.style.display = 'none';
}

function checkAnswer(selectedIndex, btnElement) {
    if (answered) return;
    answered = true;
    
    const q = questions[currentQuestion];
    const isCorrect = (selectedIndex === q.correct);
    
    if (isCorrect) {
        score++;
    }
    
    const allBtns = document.querySelectorAll('.quiz-option');
    allBtns.forEach((btn, idx) => {
        if (idx === q.correct) {
            btn.classList.add('correct');
        }
        if (idx === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
        btn.classList.add('disabled');
    });
    
    quizFeedback.innerHTML = `<strong>Пояснение:</strong> ${q.explanation}`;
    quizNextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    
    let message = '';
    if (percentage === 100) {
        message = 'Отлично! Вы отлично распознаете фишинговые ссылки.';
    } else if (percentage >= 80) {
        message = 'Хороший результат. Но будьте внимательны — мошенники постоянно придумывают новые схемы.';
    } else if (percentage >= 60) {
        message = 'Неплохо, но есть над чем поработать. Перечитайте памятку еще раз.';
    } else {
        message = 'Рекомендуем внимательно изучить памятку. Фишинговые атаки становятся всё изощреннее.';
    }
    
    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';
    quizResult.innerHTML = `
        <h3>Ваш результат: ${score} из ${total} (${percentage}%)</h3>
        <p>${message}</p>
        <button class="quiz-next" onclick="restartTest()" style="margin-top: 1rem;">Пройти тест заново</button>
    `;
}

function restartTest() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    
    quizContainer.style.display = 'block';
    quizResult.style.display = 'none';
    quizResult.innerHTML = '';
    
    loadQuestion();
}

quizNextBtn.addEventListener('click', nextQuestion);

// Tab switching logic
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
    });
});

// Load first question
loadQuestion();