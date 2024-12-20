const questions = [
    { 
        question: "Quelle est la capitale de la France ?",
        a: "Berlin",                    
        b: "Paris",
        c: "Rome",
        d: "Madrid",
        correct: "b"
    },
    { 
        question: "Quelle est la capitale du Japon ?",
        a: "Séoul",
        b: "Pékin",
        c: "Tokyo",
        d: "Bangkok",
        correct: "c"
    },
    { 
        question: "Quelle est la capitale du Brésil ?",
        a: "Brasília",
        b: "Rio de Janeiro",
        c: "Buenos Aires",
        d: "Lima",
        correct: "a"
    },
    { 
        question: "Quelle est la capitale de l'Australie ?",
        a: "Sydney",
        b: "Melbourne",
        c: "Canberra",
        d: "Wellington",
        correct: "c"
    },
    { 
        question: "Quelle est la capitale du Canada ?",
        a: "Toronto",
        b: "Vancouver",
        c: "Montréal",
        d: "Ottawa",
        correct: "d"
    },
    { 
        question: "Quelle est la capitale de l'Égypte ?",
        a: "Le Caire",
        b: "Alger",
        c: "Tunis",
        d: "Rabat",
        correct: "a"
    },
    { 
        question: "Quelle est la capitale de l'Inde ?",
        a: "New Delhi",
        b: "Mumbai",
        c: "Calcutta",
        d: "Islamabad",
        correct: "a"
    },
    { 
        question: "Quelle est la capitale de la Russie ?",
        a: "Saint-Pétersbourg",
        b: "Moscou",
        c: "Kiev",
        d: "Minsk",
        correct: "b"
    },
    { 
        question: "Quelle est la capitale de l'Allemagne ?",
        a: "Berlin",
        b: "Munich",
        c: "Vienne",
        d: "Bruxelles",
        correct: "a"
    },
    { 
        question: "Quelle est la capitale de l'Italie ?",
        a: "Madrid",
        b: "Lisbonne",
        c: "Rome",
        d: "Athènes",
        correct: "c"
    }
];


// Sélection des éléments
const questionEl = document.getElementById("question");
const questionNumberEl = document.getElementById("question-number");
const countQuestionEl = document.getElementById("count-question");
const totalQuestionsEl = document.getElementById("total-questions");
const optionsText = {
    a: document.getElementById("option-text-a"),
    b: document.getElementById("option-text-b"),
    c: document.getElementById("option-text-c"),
    d: document.getElementById("option-text-d"),
};
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const options = document.querySelectorAll("input[name='option']");
const correctAudio = document.getElementById("correct-audio");
const wrongAudio = document.getElementById("wrong-audio");
const applauseAudio = document.getElementById("applause-audio");
const failureAudio = document.getElementById("failure-audio");

let currentQuestionIndex = 0;
let score = 0;

// Charger la question actuelle
// Variables pour stocker les réponses utilisateur
let userAnswers = [];

// Charger la question actuelle
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    questionNumberEl.innerText = currentQuestionIndex + 1;
    countQuestionEl.innerText = currentQuestionIndex + 1;
    totalQuestionsEl.innerText = questions.length;

    // Remplir les options
    for (let key in optionsText) {
        optionsText[key].innerText = currentQuestion[key];
    }

    // Réinitialiser les boutons radio
    options.forEach(option => option.checked = false);

    // Afficher le bouton approprié
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
    } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
    }
}

// Vérifier et sauvegarder la réponse de l'utilisateur
function checkAnswer() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
        const selectedValue = questions[currentQuestionIndex][selectedOption.value]; // Récupère la valeur textuelle

        userAnswers.push(selectedOption.value); // Stocker la réponse
        if (selectedOption.value === questions[currentQuestionIndex].correct) {
            score++;
            correctAudio.play(); // Jouer le son correct
        } else {
            wrongAudio.play(); // Jouer le son faux
        }
    } else {
        userAnswers.push("Aucune réponse"); // Si l'utilisateur n'a rien sélectionné
    }
}

// Passer à la question suivante
nextBtn.addEventListener("click", () => {
    checkAnswer();
    currentQuestionIndex++;
    loadQuestion();
});

// Soumettre le quiz
submitBtn.addEventListener("click", () => {
    checkAnswer();
    quizEnd();
});

// Afficher le score, réponses utilisateur et corrections
function quizEnd() {
    document.getElementById("quiz").style.display = "none";
    resultEl.style.display = "block";

    // Afficher le score
    scoreEl.innerText = `Votre score est de ${score} / ${questions.length}`;

    // Construire la correction
    let resultDetails = '<h3 class="correction-title">Correction :</h3><ul class="correction-list">';
questions.forEach((q, index) => {
    const correctResponse = q[q.correct]; // Réponse correcte textuelle
    const userResponse = userAnswers[index] 
        ? q[userAnswers[index]] // Réponse utilisateur textuelle
        : "Aucune réponse";

    resultDetails += `
    <li class="correction-item">
        <strong class="question-title">Question ${index + 1} :</strong> ${q.question}<br>
        <br>
        <span class="correct-answer">
            Réponse correcte : ${correctResponse}
        </span>
    </li>
    `;
});
resultDetails += "</ul>";

// Ajouter le détail des réponses sous le score
scoreEl.insertAdjacentHTML("afterend", resultDetails);


    // Jouer un son selon le score final
    if (score >= 5) {
        applauseAudio.play(); // Son d'applaudissement
    } else {
        failureAudio.play(); // Son d'échec
    }
}

// Initialiser le quiz
loadQuestion();
