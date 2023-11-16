document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const status = document.querySelector(".status");
  const restartButton = document.querySelector(".restart");
  const startGameButton = document.querySelector("#startGame");
  const inputContainer = document.querySelector(".input-container");
  const playerXInput = document.querySelector("#playerX");
  const playerOInput = document.querySelector("#playerO");

  let currentPlayer = "X";
  let gameActive = false;
  let board = ["", "", "", "", "", "", "", "", ""];
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes("")) {
      return "tie";
    }
    return null;
  };

  const handleCellClick = (cell, index) => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    board[index] = currentPlayer;

    cell.setAttribute("data-value", currentPlayer);

    const winner = checkWin();
    if (winner) {
      gameActive = false;
      if (winner === "tie") {
        status.textContent = "It's a tie!";
      } else {
        const winnerName =
          currentPlayer === "X" ? playerXInput.value : playerOInput.value;
        status.textContent = `${winnerName} wins!`;
      }
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const nextPlayerName =
        currentPlayer === "X" ? playerXInput.value : playerOInput.value;
      status.textContent = `${nextPlayerName}'s turn`;
    }
  };

  const startGame = () => {
    const playerXName = playerXInput.value;
    const playerOName = playerOInput.value;

    if (playerXName.trim() === "" || playerOName.trim() === "") {
      alert("Please enter names for both players.");
      return;
    }

    inputContainer.style.display = "none"; // Hide input container
    gameActive = true;
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.removeAttribute("data-value");
    });
    status.textContent = `${playerXName}'s turn`;
  };

  const restartGame = () => {
    inputContainer.style.display = "flex"; // Show input container
    playerXInput.value = ""; // Reset player names
    playerOInput.value = "";
    status.textContent = ""; // Clear status
    startGame();
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });

  startGameButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
});
