var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    x = canvas.width / 2,
    y = canvas.height / 2,
    radius = x;

ctx.beginPath();
ctx.arc(x, y, radius, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = "rgba(0, 102, 204, .7)";
ctx.moveTo(x, y - 50);
ctx.lineTo(x + 50, y);
ctx.lineTo(x - 50, y);
ctx.lineTo(x, y - 50);
ctx.lineWidth = 2;
ctx.stroke();
ctx.closePath();

var img_google = document.querySelector("img");

ctx.drawImage(img_google, 0, 0);
