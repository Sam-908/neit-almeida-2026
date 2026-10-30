var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//square
ctx.fillStyle = "yellow";
ctx.fillRect(85, 302, 100, 100);
ctx.lineWidth = 5.0;
ctx.strokeStyle = "black";
ctx.strokeRect(85,302, 100, 100);

//circle
ctx.fillStyle = "#ffff00";
ctx.lineWidth = 5.0;
ctx.strokeStyle = "red";
ctx.beginPath();
ctx.arc(385,441, 70, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

//line
ctx.strokeStyle = "rgb(255,0,0)";
ctx.lineWidth = 5.0;
ctx.beginPath();
ctx.moveTo(84,682);
ctx.lineTo(278, 548);
ctx.stroke();

//pentagon
ctx.fillStyle = "#ff00ff";
ctx.strokeStyle = "#00ffff";
ctx.lineWidth = 5.0;
ctx.beginPath();
ctx.moveTo(557,308);
ctx.lineTo(665, 283);
ctx.lineTo(724, 380);
ctx.lineTo(650, 464);
ctx.lineTo(547, 420);
ctx.closePath();
ctx.fill();
ctx.stroke();

//star
ctx.fillStyle = "#ffff00";
ctx.strokeStyle = "rgb(32,32,32)";
ctx.lineWidth = 5.0;
ctx.beginPath();
ctx.moveTo(634,497);
ctx.lineTo(666, 554);
ctx.lineTo(742, 566);
ctx.lineTo(687, 616);
ctx.lineTo(695,681);
ctx.lineTo(634,653);
ctx.lineTo(574,681);
ctx.lineTo(583,616);
ctx.lineTo(537,566);
ctx.lineTo(603,554);
ctx.closePath();
ctx.fill();
ctx.stroke();