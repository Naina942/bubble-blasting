const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let score = 0;
let bubbles = [];
let gameInterval;
let bubbleSpeed = 1; // pixels per 20ms

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Random horizontal position inside container
  const x = Math.random() * (gameContainer.clientWidth - 50);
  bubble.style.left = `${x}px`;
  bubble.style.bottom = "0px";

  // Add click event to blast bubble
  bubble.addEventListener("click", () => {
    blastBubble(bubble);
  });

  gameContainer.appendChild(bubble);
  bubbles.push({ element: bubble, bottom: 0 });
}

function blastBubble(bubble) {
  // Remove bubble and add score
  bubble.remove();
  score++;
  scoreDisplay.textContent = `Score: ${score}`;

  // Remove from bubbles array
  bubbles = bubbles.filter(b => b.element !== bubble);
}

function updateBubbles() {
  bubbles.forEach(bubbleObj => {
    bubbleObj.bottom += bubbleSpeed;
    bubbleObj.element.style.bottom = `${bubbleObj.bottom}px`;

    // If bubble reaches top (container height), game over
    if (bubbleObj.bottom >= gameContainer.clientHeight - 50) {
      clearInterval(gameInterval);
      alert(`Game Over! Your score: ${score}`);
      resetGame();
    }
  });
}

function resetGame() {
  // Remove all bubbles
  bubbles.forEach(b => b.element.remove());
  bubbles = [];
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;

  startGame();
}

function startGame() {
  // Create bubbles every 1.5 seconds
  createBubble();
  gameInterval = setInterval(() => {
    createBubble();
  }, 1500);

  // Update bubble positions every 20ms
  setInterval(updateBubbles, 20);
}

startGame();
