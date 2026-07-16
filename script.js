const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let background = new Image();

let playerImage = new Image();
playerImage.src = "Player2.png";

let gameStarted = false;
let hardMode = false;

background.src = "grassy.jpg";

let score = 0;


let player = {
    x: 100,
    y: 350,
    width: 50,
    height: 50,
    velocityY: 0,
    jumping: false
};


let coin = {
    x: 500,
    y: 250,
    width: 25,
    height: 25
};

let gravity = 0.8;
let jumpPower = -15;
let coinSpeed = 4;

document.addEventListener("keydown", function(e){
    if(!gameStarted) return;
    if(e.code === "Space" && player.jumping === false){
        player.velocityY = jumpPower;
        player.jumping = true;
    }
});
function update(){
    if(gameStarted){
        player.velocityY += gravity;
        player.y += player.velocityY;
        if(player.y >= 350){

            player.y = 350;
            player.velocityY = 0;
            player.jumping = false;

        }
        coin.x -= coinSpeed;
        if(
            player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y
        ){
        score++;
        document.getElementById("score").innerHTML =
        "Score: " + score;
        if(score >= 20){
            gameStarted = false;
            document.getElementById("winModal").style.display = "flex";
        }
            coin.x = canvas.width + Math.random()*200;
            let heights = [220,260,300];
            coin.y = heights[Math.floor(Math.random()*heights.length)];
        }
        if(coin.x < -20){
            coin.x = canvas.width + Math.random()*200;
            let heights = [220,260,300];
            coin.y = heights[Math.floor(Math.random()*heights.length)];
        }
    }
    draw();
    requestAnimationFrame(update);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
        if(background.complete){

        ctx.drawImage(
            background,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    ctx.drawImage(
        playerImage,
        player.x,
        player.y,
        player.width,
        player.height
    );

    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(
        coin.x,
        coin.y,
        12,
        0,
        Math.PI*2
    );
    ctx.fill();
}
update();
document.getElementById("hardModeBtn").addEventListener("click", function(){
    gameStarted = true;
    hardMode = true;
    coinSpeed = 8;
    document.getElementById("startBtn").disabled = true;
});

document.getElementById("startBtn").addEventListener("click", function(){
    gameStarted = true;
    hardMode = false;
    coinSpeed = 4;
    this.disabled = true;
});

document.getElementById("resetBtn").addEventListener("click", function(){
    gameStarted = false;
    hardMode = false;
    score = 0;
    document.getElementById("score").innerHTML = "Score: 0";
    player.x = 100;
    player.y = 350;
    player.velocityY = 0;
    player.jumping = false;
    coin.x = 500;
    coinSpeed = 4;
    document.getElementById("hardModeBtn").innerHTML = "Hard Mode";
    let startBtn = document.getElementById("startBtn");
    startBtn.disabled = false;
    startBtn.innerHTML = "Start Game";
});

document.getElementById("playBtn").addEventListener("click", function(){
    document.getElementById("welcomeModal").style.display = "none";
});

document.getElementById("easyModeBtn").addEventListener("click", function(){
    gameStarted = true;
    hardMode = false;
    coinSpeed = 2;
    document.getElementById("startBtn").disabled = true;
});

document.getElementById("closeWinBtn").addEventListener("click", function(){
    document.getElementById("winModal").style.display = "none";
    score = 0;
    document.getElementById("score").innerHTML = "Score: 0";
    player.x = 100;
    player.y = 350;
    coin.x = canvas.width + 200;
});