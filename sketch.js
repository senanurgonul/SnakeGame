let snake;
let scl = 15;
let food;
let goldFood;
let score = 0;
let highScore = 0;
let currentBackground;
let playButton;
let gameOver = false;
let restartButton;
let goldFoodTimer = 0;
let goldFoodDuration = 5;


let logo;
let logoVisible = true;

let playImage;
let restartImage;
let backImage;
let yonImage;
let resizedYonImage;
let newWidth = 100;
let newHeight = 50;

let yonVisible = true;


let loseSound;
let eatSound;
let gameSound;
let snakeSound;

let snakeMusicDuration = 17;
let snakeMusicStartTime = 0;


let capture;
let capturedImage;

let flames = [];
let holes = [];

let infoMessage = "Amaç: Yılanı kontrol ederek yemleri yemek ve kazanmaya çalışmak. \n Oyun klavyedeki yön tuşları ile oynanır.\n Yanma, kameralara yakalanma 😎📸";

function preload() {
loseSound = loadSound('ses/lose.mp3');
eatSound = loadSound('ses/eat.mp3');
gameSound = loadSound('ses/music.mp3')
snakeSound = loadSound('ses/snake.mp3');

logo = loadImage('logo.png');
gameOverImage = loadImage('gameover.png');

playImage = loadImage('play.png');
restartImage = loadImage('restart.png');
backImage = loadImage('back.png');
yonImage = loadImage('yön.png');

playImage = loadImage('play.png', function(img) {
playImage = img.get();


let newWidth = 90;
let newHeight = 40;

playImage.resize(newWidth, newHeight);
});

restartImage = loadImage('restart.png', function(img) {
restartImage = img.get();


let newWidth = 90;
let newHeight = 40;

restartImage.resize(newWidth, newHeight);
});


}

function setup() {
createCanvas(540, 540);
currentBackground = color(0, 100, 0);

image(logo, width / 2 - logo.width / 2, height / 2 - logo.height / 2);

playButton = createButton("");
playButton.position(width / 2 - playImage.width / 2, height / 1.3 - playImage.height / 2);
playButton.style("background-color", "transparent");
playButton.style("border", "none");
playButton.style("outline", "none");
playButton.size(playImage.width, playImage.height);
playButton.mousePressed(startGame);

restartButton = createButton("");
restartButton.position(width / 2 - restartImage.width / 2, height / 1.4 - restartImage.height / 2);
restartButton.style("background-color", "transparent");
restartButton.style("border", "none");
restartButton.style("outline", "none");
restartButton.size(restartImage.width, restartImage.height);
restartButton.mousePressed(restartGame);
restartButton.hide(); 

capture = createCapture(VIDEO);
capture.hide();

snakeSound.setLoop(true);
snakeSound.setVolume(0.5);

resizedYonImage = yonImage.get();
resizedYonImage.resize(newWidth, newHeight);



}


function mousePressed() {
if (playButton.visible && mouseX > playButton.x && mouseX < playButton.x + playButton.width && mouseY > playButton.y && mouseY < playButton.y + playButton.height) {
startGame();
logoVisible = false;
}
}



function startGame() {
logoVisible = false;
yonVisible = false;
playButton.hide();
snake = new Snake();
frameRate(5);
pickLocation();
goldFoodTimer = millis();
gameOver = false;
gameSound.loop();



}

function pickLocation() {
food = createVector(floor(random(width / scl)), floor(random(height / scl)));
food.mult(scl);

if (score > 0 && score % 5 === 0 && !goldFood) {
if (millis() - goldFoodTimer >= goldFoodDuration * 1000) {
generateGoldFood();
goldFoodTimer = millis();
}
}

if (goldFood && millis() - goldFoodTimer >= goldFoodDuration * 1000) {
goldFood = null;
}


holes = [];
for (let i = 0; i < 5; i++) {
let hole = createVector(floor(random(width / scl)), floor(random(height / scl)));
hole.mult(scl);
holes.push(hole);
}
}

function generateGoldFood() {
goldFood = createVector(floor(random(width / scl)), floor(random(height / scl)));
goldFood.mult(scl);
}

function draw() {
background(currentBackground);
image(backImage, 0, 0);
if (snake && !gameOver) {
if (snake.eat(food)) {
score++;
if (score > highScore) {
highScore = score;
}
pickLocation();
frameRate(frameRate() + 1);
}

if (score > 0 && score % 5 === 0 && !goldFood) {
if (millis() - goldFoodTimer >= goldFoodDuration * 1000) {
generateGoldFood();
goldFoodTimer = millis();
}
}

if (goldFood && millis() - goldFoodTimer >= goldFoodDuration * 1000) {
goldFood = null;
}

snake.death();
snake.update();
snake.show();

fill(255, 0, 100);
rect(food.x, food.y, scl, scl);

if (goldFood) {
fill(255, 215, 0);
rect(goldFood.x, goldFood.y, scl, scl);
}


fill(0);
for (let i = 0; i < holes.length; i++) {
rect(holes[i].x, holes[i].y, scl, scl);
}


if (snake.eatGoldFood(goldFood)) {
score += 2;
if (score > highScore) {
highScore = score;
}
goldFood = null;
goldFoodTimer = millis();
}

fill(255);
textSize(16);
textAlign(LEFT);
text("Score: " + score, 10, 20);
text("High Score: " + highScore, 10, 40);

for (let i = 0; i < flames.length; i++) {
let flame = flames[i];
flame.update();
flame.show();
if (flame.shouldRemove()) {
flames.splice(i, 1);
i--;
}
}

} else if (gameOver) {
fill(255);
textSize(50);
textAlign(CENTER);
image(gameOverImage, width / 2 - gameOverImage.width / 2, height / 3 - gameOverImage.height / 2);
textSize(20);
text("Your Score: " + score, width / 2, height / 2 + 20);
text("High Score: " + highScore, width / 2, height / 2 + 40);
restartButton.show();

fill(255, 0, 0);
circle(snake.deathPosition.x + scl / 2, snake.deathPosition.y + scl / 2, 10);
fill(255);
textSize(16);
text("death", snake.deathPosition.x + scl / 2, snake.deathPosition.y - 10);
gameSound.stop();


if (!capturedImage) {
capturedImage = capture.get();
capturedImage.resize(100, 100);
}


image(capturedImage, width / 2 - capturedImage.width / 2, height - capturedImage.height);

}

if (logoVisible) {
image(logo, width / 2 - logo.width / 2, height / 2 - logo.height / 2);
}
if (logoVisible) {
image(playImage, playButton.x, playButton.y);
fill(255);
textSize(16);
textAlign(RIGHT, TOP);
text(infoMessage, width - 10, 10);
}

if (gameOver) {
image(restartImage, restartButton.x, restartButton.y);
}

if (yonVisible) {
image(resizedYonImage, 430, 80);
}

checkWinCondition();



}

function keyPressed() {
if (!gameOver) {
if (keyCode === UP_ARROW && snake.ySpeed !== 1) {
snake.dir(0, -1);
} else if (keyCode === DOWN_ARROW && snake.ySpeed !== -1) {
snake.dir(0, 1);
} else if (keyCode === RIGHT_ARROW && snake.xSpeed !== -1) {
snake.dir(1, 0);
} else if (keyCode === LEFT_ARROW && snake.xSpeed !== 1) {
snake.dir(-1, 0);
}
}
}

function restartGame() {
gameOver = false;
score = 0;
restartButton.hide();
snake = new Snake();
frameRate(5);
pickLocation();
gameSound.play();

if (snakeSound.isPlaying()) {
snakeSound.stop();
}

}

function checkWinCondition() {
if (score === 50) {

fill(255);
textSize(70);
textAlign(CENTER);
text("Tebrikler! \n Kazandınız😁 ", width / 2, height / 2.7);
noLoop();

gameSound.stop();

snakeSound.play();
setTimeout(restartGame, snakeMusicDuration * 1000);
}
}