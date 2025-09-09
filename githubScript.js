// --- Snake Game ---
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? "#58a6ff" : "#c9d1d9";
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "#f85149";
    ctx.fillRect(food.x, food.y, box, box);

    // If no direction chosen yet, just render and return
    if (!direction) return;

    // Move snake
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    // Game over conditions
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
        alert("Game Over!");
        resetGame();
        return;
    }

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function resetGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = null;
    food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box
    };
}
// Fullscreen button
const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            alert(`Error attempting fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});


// Run game loop
setInterval(draw, 200);
