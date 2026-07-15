const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let backgroundX = 0;
let speed = 4;
let background = new Image();
backgroundX -= 2;

background.onload = function(){
    console.log("Grass image loaded!");
};

background.onerror = function(){
    console.log("Grass image failed!");
};

background.src = "grassy.jpg";

let score = 0;

let player = {
    x: 100,
    y: 350,
    width: 40,
    height: 40,
    velocityY: 0,
    jumping: false
};

let coin = {
    x: 500,
    y: 250,
    width: 25,
    height: 25
};


// Physics
let gravity = 0.8;
let jumpPower = -15;


// Controls
document.addEventListener("keydown", function(e){

    if(e.code === "Space" && player.jumping === false){

        player.velocityY = jumpPower;
        player.jumping = true;

    }

});


function update(){
    player.velocityY += gravity;
    player.y += player.velocityY;
    coin.x -= 4;
    if(player.y >= 350){

        player.y = 350;
        player.velocityY = 0;
        player.jumping = false;

    }
    if(
        player.x < coin.x + coin.width &&
        player.x + player.width > coin.x &&
        player.y < coin.y + coin.height &&
        player.y + player.height > coin.y
    ){
        score++;
        document.getElementById("score").innerHTML =
        "Score: " + score;
        coin.x = Math.random() * 700 + 150;
        coin.y = Math.random() * 200 + 100;
    }
    draw();
    requestAnimationFrame(update);
}
if (coin.x < -20) {
    coin.x = canvas.width + Math.random() * 200;
    coin.y = Math.random() * 200 + 100;
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(background.complete && background.naturalWidth > 0){
        ctx.drawImage(
            background,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(
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
        Math.PI * 2
    );
    ctx.fill();
}

update();

if(player.x > canvas.width){
    player.x = -player.width;
}

ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
ctx.drawImage(background, backgroundX + canvas.width, 0, canvas.width, canvas.height);
if (backgroundX <= -canvas.width) {
    backgroundX = 0;
}