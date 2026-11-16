//START PROGRAM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps); 

var spit = [];
var shootCooldown = 0;
var startCooldown = 10;
var boxCooldown = 0;
var spitSound = new Audio("audio/velcro-strap-2.mp3")

var score = 0;

//Display home screen
var states = ["title" ,"game" , "over" , "win"];
states = "game";

// Display Game Title "SPIT AND RUN"
function game(){
  //clear the screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    switch(states){
        case "title":
            //Display game title "SPIT AND RUN"
                ctx.fillStyle = "black";
                ctx.font = "50px Arial";
                let titleText = "Spit and Run";
                ctx.fillText(titleText, canvas.width/2 - (ctx.measureText(titleText).width/2), canvas.height/2 -20);
                ctx.font = "16px Arial";
                let instructionText = "(Press enter to start)";
                ctx.fillText(instructionText, canvas.width/2 - (ctx.measureText(instructionText).width/2), canvas.height/2 + 40);

                //Display button
                ctx.fillStyle = "pink";
                ctx.fillRect(canvas.width/2 - 100, canvas.height/2 + 100, 200, 80);
                ctx.fillStyle = "black";
                ctx.font = "24px Arial";

                //If button is clicked, start game
                let buttonText = "Start Game";
                ctx.fillText(buttonText,canvas.width/2 - (ctx.measureText(buttonText).width/2), canvas.height/2 + 100 + 45);

                if(enter){
                    startCooldown = 10;
                    switchScenes("game");
                }
        break;

        case "game":
            //Create player alpaca and enemies
    ctx.drawImage(keeper.image, keeper.x, keeper.y, 25,25);
    ctx.drawImage(alpacaSprite.image, alpacaSprite.x, alpacaSprite.y, 25,25);

            if(startCooldown > 0){
                startCooldown -= 1;     
            }
  
    keeper.x += moveDirection.x;
    keeper.y += moveDirection.y;

    var hitBox = alpacaSprite.x < keeper.x + 25 &&
                alpacaSprite.x + 25 > keeper.x &&
                alpacaSprite.y  < keeper.y + 25 &&
                alpacaSprite.y  + 25 > keeper.y;

    //Colliding with keeper
    if(hitBox == true && startCooldown <= 0){

        //The keeper sprite hit the player
        alpacaSprite.x = canvas.width/2
        alpacaSprite.y = canvas.height/2 + 100;

        alpacaSprite.moveX = 0;
        alpacaSprite.moveY = 0;
        score = 0;
        if(alpacaToKeeperCollision){
            switchScenes ("over");
        }
    }

   //Allow player to move around
    if(a == true){
        alpacaSprite.moveX -= acceleration;
    }

    if(d == true){
        alpacaSprite.moveX += acceleration;
    }

    if(w == true){
        alpacaSprite.moveY -= acceleration;
    }

    if(s == true){
        alpacaSprite.moveY += acceleration;
    }

    // if alpaca is off the right side of the screen make it come out the other side
    if(alpacaSprite.x >  canvas.width){
        alpacaSprite.x = -25;
    }

    if(alpacaSprite.x < -25){
        alpacaSprite.x = 800;
    }

    if(keeper.y > canvas.height - 25 || keeper.y < 0){
        moveDirection.y *= -1;
    }

    if(keeper.x > canvas.width - 25 || keeper.x < 0){
        moveDirection.x *= -1;
    }

    //Multiply by friction
    alpacaSprite.moveX *= friction;
    alpacaSprite.moveY *= friction;

    //Update the X and Y position values
    alpacaSprite.x += alpacaToKeeperCollisionSprite.moveX;
    alpacaSprite.y += alpacaSprite.moveY;

    //Spit firing code
    if(shootCooldown > 0){
        shootCooldown--;
    }

    if(space && shootCooldown === 0){
        spit.push({
            x:alpacaSprite.x + 25 /2 -2,
            y:alpacaSprite.y + -10,
            width:4,
            height:6,
            speed:10,
            color:"white"
        });
        spitSound.currentTime = 0;
        spitSound.play();
        shootCooldown = 10;
    }

    //Draws Background
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //Player spits at zookeeper
    for(var i = spit.length -1; i>=0; i--){
        var bullet = spit[i];

        bullet.y -= bullet.speed;

        //Check for spit that leave the screen
        if(bullet.y + bullet.height < 0){
            spit.splice(i,1);
            continue;
        }

        var hitBox = bullet.x < keeper.x + 25 &&
                    bullet.x + bullet.width > keeper.x &&
                    bullet.y < keeper.y + 25 &&
                    bullet.y + bullet.height > keeper.y;

        if(hitBox){
            spit.splice(i, 1);
            keeper.x = 100000;
            moveDirection.x = 0;
            moveDirection.y = 0;
            score += 5;
            continue;
        }

        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    
    //Display score in game
    ctx.fillStyle = "White";
    ctx.font = "30px Arial";
    ctx.fillText(`Stars: ${score}`,625,80); 
     break;
    }

    //Display timer in upper left

    //If captured
     switch(states){
        case "over":
            //Display game over screen
                ctx.fillStyle = "black";
                ctx.font = "50px Arial";

                //Displayer capture screen
                let titleText = "You were captured!";
                ctx.fillText(titleText, canvas.width/2 - (ctx.measureText(titleText).width/2), canvas.height/2 -20);
                ctx.font = "16px Arial";

                //Restart game
                let instructionText = "(Press enter to restart)";
                ctx.fillText(instructionText, canvas.width/2 - (ctx.measureText(instructionText).width/2), canvas.height/2 + 40);
                ctx.fillStyle = "pink";

                ctx.fillRect(canvas.width/2 - 100, canvas.height/2 + 100, 200, 80);
                ctx.fillStyle = "black";
                ctx.font = "24px Arial";
                let buttonText = "Restart Game";
                ctx.fillText(buttonText,canvas.width/2 - (ctx.measureText(buttonText).width/2), canvas.height/2 + 100 + 45);

                if(enter){
                    startCooldown = 10;
                    switchScenes("game");
                }
        break;
            }

    //If score requirement is met
     switch(states){
        case "win":
            //Display win screen
                ctx.fillStyle = "black";
                ctx.font = "50px Arial";

                //Displayer win screen
                let titleText = "You win!";
                ctx.fillText(titleText, canvas.width/2 - (ctx.measureText(titleText).width/2), canvas.height/2 -20);
                ctx.font = "16px Arial";

                //Restart game if wanted
                let instructionText = "(Press enter to restart)";
                ctx.fillText(instructionText, canvas.width/2 - (ctx.measureText(instructionText).width/2), canvas.height/2 + 40);
                ctx.fillStyle = "pink";

                ctx.fillRect(canvas.width/2 - 100, canvas.height/2 + 100, 200, 80);
                ctx.fillStyle = "black";
                ctx.font = "24px Arial";
                let buttonText = "Restart Game";
                ctx.fillText(buttonText,canvas.width/2 - (ctx.measureText(buttonText).width/2), canvas.height/2 + 100 + 45);

                if(enter){
                    startCooldown = 10;
                    switchScenes("game");
                }
        break;
            }

}

   

function alpacaToKeeperCollision(obj,star){
    var closestX = Math.max(obj.x, Math.min(star.x, obj.x + 25));
    var closestY = Math.max(obj.y, Math.min(star.y, obj.y + 25));

    var dx = star.x - closestX;
    var dy = star.y - closestY;

    var dist = dx * dx + dy * dy;
    return dist <= star.radius * star.radius;
}

function switchScenes(nameOfScene){
    states = nameOfScene;
}
//END