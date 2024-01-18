let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let playerTurnDisplay = document.querySelector("#player-turn");
let scoreO = 0;
let scoreX = 0;
let gameOver = false;

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameOver && !box.innerText) {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
            checkDraw();
            updatePlayerTurn();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            displayWinner(boxes[a].innerText, pattern);
            updateScore(boxes[a].innerText);
            gameOver = true;
        }
    }
};

const checkDraw = () => {
    if (!gameOver && [...boxes].every((box) => box.innerText !== "")) {
        alert("It's a draw!");
        resetGame();
    }
};

const displayWinner = (winner, winningCombination) => {
    alert(`${winner} is the winner!`);
    // Highlight the winning combination
    winningCombination.forEach((index) => {
        boxes[index].style.backgroundColor = "lightgreen";
    });
};

const updateScore = (winner) => {
    if (winner === "O") {
        scoreO++;
    } else {
        scoreX++;
    }
    updateScoreboard();
};

const updateScoreboard = () => {
    // Update the scoreboard on the UI
    // Example: document.getElementById("score-o").innerText = scoreO;
};

const updatePlayerTurn = () => {
    playerTurnDisplay.innerText = `Player's Turn: ${turnO ? 'O' : 'X'}`;
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.backgroundColor = ""; // Reset background color
        box.disabled = false;
    });
    turnO = true;
    updatePlayerTurn();
    gameOver = false;
};

resetBtn.addEventListener("click", resetGame);
