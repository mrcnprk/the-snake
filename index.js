const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// pointing and stats:

let score = 0;

const games = [];
const bestgame = [];

const pickbest = () => {

}

// prompts

const prompt = document.querySelector('.prompt')
prompt.textContent = "Hit space button to start the game!"


// set unit and time:

const unit = 10
let time = 100

const current = document.getElementById("current")
current.textContent = score
const last = document.getElementById("last")

const best = document.getElementById("best")


// the start snake:

let snake = [];
snake[0] = {
    x: 22 * unit,
    y: 22 * unit,
}

// food position:

let food;
const drawFood = () => {
    food = {
        x: Math.floor(Math.random()*45) * unit,
        y: Math.floor(Math.random()*45) * unit
    }
}

drawFood()



// control settings:

let currentDirection = "right"

const controlSnake = (e) => {

    if(e.keyCode === 40 && currentDirection !== "up") {
        currentDirection = "down"
    }
    else if(e.keyCode === 38 && currentDirection !== "down"){
        currentDirection = "up"
    }
    else if(e.keyCode === 39 && currentDirection !== "left"){
        currentDirection = "right"
    }
    else if(e.keyCode === 37 && currentDirection !== "right"){
        currentDirection = "left"
    }
}

document.addEventListener("keydown", controlSnake)

// the game:

const draw = () => {

    // the backgorund:

    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // the food:

    ctx.fillStyle = "green";
    ctx.fillRect(food.x, food.y, unit, unit)

    // the snake:

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = "white"
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit)
        ctx.strokeStyle = "#222222";
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit)
    }

    // previous head possition:

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // removing tail:

    snake.pop();

    // direction:

    if(currentDirection == "left" ) snakeX -= unit;
    if(currentDirection == "up" ) snakeY -= unit;
    if(currentDirection == "right" ) snakeX += unit;
    if(currentDirection == "down" ) snakeY += unit;

    // new snake head:

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead)

    // collision:

    // gameOver function:

    const gameOver = () => {
        clearInterval(game)
        prompt.textContent = "Game over!"
        prompt.classList.add("active");
        snake = [];
        games.push(score)
        score = 0;
        current.textContent = score
        last.textContent = games[games.length - 1]
        best.textContent = Math.max.apply(Math, games)
        snake[0] = {
            x: 22 * unit,
            y: 22 * unit,
        }
        window.addEventListener("keydown", gameStart)
    }

    // own tail:

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            gameOver()
        }
    }

    // band:

    if(snakeX < -unit || snakeX > (45 * unit) || snakeY < -unit || snakeY > (45*unit)){
        gameOver()
        document.getElementById("game").style.borderColor = "red"
    }

    // when the snake eat the food:

    if(snakeX === food.x && snakeY === food.y){
        if(score == 3){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        else if (score == 5){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        else if (score == 9){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        else if (score == 19){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        else if (score == 29){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        else if (score == 39){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        else if (score == 70){
            clearInterval(game);
            time = time - 10
            game = setInterval(draw, time)
        }
        score++;
        current .textContent = score
        snake.push({
            x: food.x,
            y: food.y
        });
        drawFood();
    }

}

// start the game:

let game;
const gameStart = (e) => {
    if(e.keyCode === 32){
        prompt.classList.remove("active")
        time = 100
        game = setInterval(draw, time)
        window.removeEventListener("keydown", gameStart)
        document.getElementById("game").style.borderColor = "";
    }
}

window.addEventListener("keydown", gameStart)
