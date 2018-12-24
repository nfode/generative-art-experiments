const fs = require('fs')
const { createCanvas } = require('canvas')

const width = 2560;
const height = 1440;
const canvas = createCanvas(width, height)
var context = canvas.getContext('2d');


var step = 100;
var dpr = 1;
context.scale(dpr, dpr);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

context.lineCap = 'square';
context.lineWidth = 7.5;
var gradient = context.createRadialGradient(1280, 720, 1000, 1280,720,10);
gradient.addColorStop(0 ,"blue");
gradient.addColorStop(0.7, "red");
gradient.addColorStop(1, "magenta");
context.fillStyle="#000000"
context.fillRect(0,0,width,height)

// Fill with gradient
context.strokeStyle = gradient;
function draw(x, y, width, height) {
    context.beginPath()
    var leftToRight = Math.random() >= 0.5;

    if(leftToRight) {
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);    
    } else {
        context.moveTo(x + width, y);
        context.lineTo(x, y + height);
    }

    context.stroke();
}

for(var x = 0; x < width; x += step) {
    for(var y = 0; y < height; y+= step) {
        draw(x, y, step, step);    
    }
}

const out = fs.createWriteStream(__dirname + '/test.png')
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))
