let tog = 1;
let p1sum = 0;
let p2sum = 0;

const constitutionQuizzes = [
    {
        question: "Which Article deals with Right to Equality?",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        correct: "Article 14"
    },
    {
        question: "Which Article abolishes Untouchability?",
        options: ["Article 15", "Article 17", "Article 21", "Article 25"],
        correct: "Article 17"
    },
    {
        question: "Right to Education is covered under which Article?",
        options: ["Article 21A", "Article 19", "Article 25", "Article 32"],
        correct: "Article 21A"
    },
    {
        question: "Which Article deals with Freedom of Speech?",
        options: ["Article 19", "Article 21", "Article 25", "Article 32"],
        correct: "Article 19"
    },
    {
        question: "Which Article provides Right to Constitutional Remedies?",
        options: ["Article 14", "Article 21", "Article 32", "Article 44"],
        correct: "Article 32"
    }
];

function showQuiz(type, player, currentSum) {
    return new Promise((resolve) => {
        const modal = document.getElementById("quizModal");
        const questionText = document.getElementById("questionText");
        const optionsDiv = document.getElementById("options");
        
        const randomQuiz = constitutionQuizzes[Math.floor(Math.random() * constitutionQuizzes.length)];
        
        questionText.textContent = randomQuiz.question;
        optionsDiv.innerHTML = "";
        
        randomQuiz.options.forEach(option => {
            const button = document.createElement("button");
            button.className = "quiz-option";
            button.textContent = option;
            button.onclick = () => {
                const isCorrect = option === randomQuiz.correct;
                handleAnswer(isCorrect, type, currentSum);
                modal.style.display = "none";
                resolve(isCorrect);
            };
            optionsDiv.appendChild(button);
        });
        
        modal.style.display = "block";
    });
}

function handleAnswer(isCorrect, type, currentSum) {
    if (type === "ladder") {
        if (isCorrect) {
            alert("Correct! You can climb the ladder!");
        } else {
            alert("Wrong answer! You'll stay at your current position.");
        }
    } else if (type === "snake") {
        if (isCorrect) {
            alert("Correct! You're safe from the snake!");
        } else {
            alert("Wrong answer! Snake will bite you!");
        }
    }
}

async function play(player, psum, correction, num) {
    let sum;
    if (psum == 'p1sum') {
        const newPosition = p1sum + num;
        
        if (newPosition > 100) {
            return;
        }

        const snakeHeads = [32, 36, 48, 62, 88, 95, 97];
        const ladderStarts = [1, 4, 8, 21, 28, 50, 71, 80];

        if (snakeHeads.includes(newPosition)) {
            const isCorrect = await showQuiz("snake", player, newPosition);
            if (isCorrect) {
                p1sum = newPosition;
            } else {
                p1sum = newPosition;
                if (newPosition === 32) p1sum = 10;
                if (newPosition === 36) p1sum = 6;
                if (newPosition === 48) p1sum = 26;
                if (newPosition === 62) p1sum = 18;
                if (newPosition === 88) p1sum = 24;
                if (newPosition === 95) p1sum = 56;
                if (newPosition === 97) p1sum = 78;
            }
        } else if (ladderStarts.includes(newPosition)) {
            const isCorrect = await showQuiz("ladder", player, newPosition);
            if (isCorrect) {
                p1sum = newPosition;
                if (newPosition === 1) p1sum = 38;
                if (newPosition === 4) p1sum = 14;
                if (newPosition === 8) p1sum = 30;
                if (newPosition === 21) p1sum = 42;
                if (newPosition === 28) p1sum = 76;
                if (newPosition === 50) p1sum = 67;
                if (newPosition === 71) p1sum = 92;
                if (newPosition === 80) p1sum = 99;
            } else {
                p1sum = newPosition;
            }
        } else {
            p1sum = newPosition;
        }
        
        sum = p1sum;
    }

    if (psum == 'p2sum') {
        const newPosition = p2sum + num;
        
        if (newPosition > 100) {
            return;
        }

        const snakeHeads = [32, 36, 48, 62, 88, 95, 97];
        const ladderStarts = [1, 4, 8, 21, 28, 50, 71, 80];

        if (snakeHeads.includes(newPosition)) {
            const isCorrect = await showQuiz("snake", player, newPosition);
            if (isCorrect) {
                p2sum = newPosition;
            } else {
                p2sum = newPosition;
                if (newPosition === 32) p2sum = 10;
                if (newPosition === 36) p2sum = 6;
                if (newPosition === 48) p2sum = 26;
                if (newPosition === 62) p2sum = 18;
                if (newPosition === 88) p2sum = 24;
                if (newPosition === 95) p2sum = 56;
                if (newPosition === 97) p2sum = 78;
            }
        } else if (ladderStarts.includes(newPosition)) {
            const isCorrect = await showQuiz("ladder", player, newPosition);
            if (isCorrect) {
                p2sum = newPosition;
                if (newPosition === 1) p2sum = 38;
                if (newPosition === 4) p2sum = 14;
                if (newPosition === 8) p2sum = 30;
                if (newPosition === 21) p2sum = 42;
                if (newPosition === 28) p2sum = 76;
                if (newPosition === 50) p2sum = 67;
                if (newPosition === 71) p2sum = 92;
                if (newPosition === 80) p2sum = 99;
            } else {
                p2sum = newPosition;
            }
        } else {
            p2sum = newPosition;
        }
        
        sum = p2sum;
    }
    
    updatePosition(player, sum, correction);
}

function updatePosition(player, sum, correction) {
    if (sum === 100) {
        alert(player === 'p1' ? "Red Won!" : "Yellow Won!");
        location.reload();
        return;
    }

    const piece = document.getElementById(player);
    piece.style.transition = 'linear all .5s';

    if (sum < 10) {
        piece.style.left = `${(sum - 1) * 62}px`;
        piece.style.top = `${-0 * 62 - correction}px`;
    } else {
        const numarr = Array.from(String(sum));
        const n1 = parseInt(numarr[0]);
        const n2 = numarr.length > 1 ? parseInt(numarr[1]) : 0;

        if (n1 % 2 !== 0) {
            if (n2 === 0) {
                piece.style.left = `${9 * 62}px`;
                piece.style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                piece.style.left = `${(9 - (n2 - 1)) * 62}px`;
                piece.style.top = `${-n1 * 62 - correction}px`;
            }
        } else {
            if (n2 === 0) {
                piece.style.left = `${0 * 62}px`;
                piece.style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                piece.style.left = `${(n2 - 1) * 62}px`;
                piece.style.top = `${-n1 * 62 - correction}px`;
            }
        }
    }
}

document.getElementById("diceBtn").addEventListener("click", async function() {
    const num = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = num;

    if (tog % 2 !== 0) {
        document.getElementById('tog').innerText = "Yellow's Turn";
        await play('p1', 'p1sum', 0, num);
    } else {
        document.getElementById('tog').innerText = "Red's Turn";
        await play('p2', 'p2sum', 55, num);
    }

    tog++;
});