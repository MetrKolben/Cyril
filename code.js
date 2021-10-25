var finished = false;
var first = true;
var SELECTED_ORGAN = null;
var SELECTED = false;
var offset = {
    x:0,
    y:0
}
var numberOfMistakes = 0;
var numberOfFinished = 0;
var grayDot = new Image();
var redDot = new Image();
var greenDot = new Image();
redDot.src = "./imgs/red-dot.png";
greenDot.src = "./imgs/green-dot.png";
grayDot.src = "./imgs/gray-dot.png";
var mistakes = new Array(8).fill("gray");
var interval;

class Organ{
    constructor(src, x, y, width, height, endX, endY, startX, startY, endZ) {
        this.img = new Image();
        this.img.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.endX = endX;
        this.endY = endY;
        this.endZ = endZ;
        this.startX = startX;
        this.startY = startY;
        this.fixed = false;
        this.wrong = false;
    }

}

function repaint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMistakes(50*scale, 50*scale);
    for(organ of notInserted) {
        var img = organ.organ.img;
        var o = organ.organ;
        if(o.wrong) {
            ctx.globalAlpha = 0.5;
            ctx.drawImage(img, o.x, o.y, o.width, o.height);
            ctx.globalAlpha = 1;
            continue;
        }
        ctx.drawImage(img, o.x, o.y, o.width, o.height);
    }
}

function drawMistakes(x, y) {
    for(let i = 0; i < 8; i++) {
        ctx.fillStyle = mistakes[i];
        if(i < 4){
            ctx.beginPath();
            ctx.arc(x+i*70*scale, y, 30*scale, 0, 2 * Math.PI, false);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(x+(i - 4)*70*scale, y + 70*scale, 30*scale, 0, 2 * Math.PI, false);
            ctx.fill();
        }
        ctx.fillStyle = "black";
    }
}

function main() {
    ctx.fillStyle = "black";
    ctx.font = 100*scale + 'px Calibri';
    ctx.textAlign = "center";
    canvas.addEventListener("mousedown", click);
    canvas.addEventListener("touchstart", tap);
}

function start() {
    interval = setInterval(repaint, 1000/144);

    canvas.addEventListener("touchmove", slide);
    canvas.addEventListener("mousemove", drag);
    canvas.addEventListener("touchend", touchRelease);
    canvas.addEventListener("mouseup", release);
}

function touchRelease(evt) {
    release(evt);
}

function slide(evt) {
    let loc = {x: evt.touches[0].clientX,
    y: evt.touches[0].clientY}
    drag(loc);
}

function tap(evt) {
    let loc = {x: evt.touches[0].clientX,
    y: evt.touches[0].clientY}
    click(loc);
}

function release(evt) {
    if(SELECTED) {
        if(isClose()) {
            SELECTED_ORGAN.x = SELECTED_ORGAN.endX;
            SELECTED_ORGAN.y = SELECTED_ORGAN.endY;
            SELECTED_ORGAN.fixed = true;
            numberOfFinished++;
            mistakes[numberOfFinished-1] = "green";
        } else {
            if(Math.sqrt(Math.pow(Math.abs(SELECTED_ORGAN.x - SELECTED_ORGAN.startX) , 2) + Math.pow(Math.abs(SELECTED_ORGAN.y - SELECTED_ORGAN.startY) , 2)) > 100*scale){
                numberOfMistakes++;
                SELECTED_ORGAN.fixed = true;
                SELECTED_ORGAN.wrong = true;
                numberOfFinished++;
                mistakes[numberOfFinished-1] = "red";
            }
            drawMistakes(20*scale, 50*scale);
            SELECTED_ORGAN.x = SELECTED_ORGAN.startX;
            SELECTED_ORGAN.y = SELECTED_ORGAN.startY;
        }
    }
    SELECTED = false;
    SELECTED_ORGAN = null;
    
    if((numberOfFinished == 8) && !finished) {
        setTimeout(wait, 100);
    }
}

function wait() {
    canvas.classList.remove("game");
    canvas.classList.add("gameover");
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.removeEventListener("mousedown", click);
    canvas.removeEventListener("touchstart", tap);
    setTimeout(restartListeners, 1200);
    setTimeout(gameover, 1000);
    finished = true;
}

function restartListeners() {
    canvas.addEventListener("mousedown", click);
    canvas.addEventListener("touchstart", tap);
}


function gameover() {
    canvas.classList.add("restart");
    ctx.font = 80*scale + "px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Výsledek: " + (8-numberOfMistakes) + "/" + 8, canvas.width/2, 500*scale);

}

function drag(evt) {
    if(SELECTED) {
        x = getEvtX(evt.x);
        y = getEvtY(evt.y);
        SELECTED_ORGAN.x = x - offset.x;
        SELECTED_ORGAN.y = y - offset.y;
    }
}

function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.removeEventListener("mousedown", click);
    canvas.removeEventListener("touchstart", tap);
    setTimeout(restartListeners, 200);
    canvas.classList.remove("gameover");
    canvas.classList.remove("restart");
    first = true;
    for(organ of notInserted) {
        o = organ.organ;
        o.x = o.startX;
        o.y = o.startY;
        o.wrong = false;
        o.fixed = false;
    }
    numberOfFinished = 0;
}

function click(evt) {
    if(!first) {
        SELECTED_ORGAN = getSelectedOrgan(getEvtX(evt.x), getEvtY(evt.y));
    } else {
        first = false;
        canvas.classList.remove("gameover");
        canvas.classList.remove("game");
        canvas.classList.remove("gameover");
        canvas.classList.add("game");
        start();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if(finished) {
        finished = false;
        numberOfMistakes = 0;
        mistakes = new Array(8).fill("gray");
        restart();
    }
}

function getSelectedOrgan(x, y) {
    for(let i = notInserted.length-1; i >=0; i--) {
        var o = notInserted[i].organ;
        if((!o.fixed) && (x > o.x && x < o.x+o.width) && (y > o.y && y < o.y+o.height)) {
            offset = {
                x: x-o.x,
                y: y-o.y
            }
            SELECTED = true;
            return o;
        }
    }
    SELECTED = false;
    return null;
}

function isClose() {
    var o = SELECTED_ORGAN;
    x0 = o.x;
    y0 = o.y;
    x1 = o.endX;
    y1 = o.endY;
    w = Math.abs(x0 - x1);
    h = Math.abs(y0 - y1);
    return (Math.sqrt( Math.pow(w, 2) + Math.pow(h, 2) )) < CLOSE;
}

function getEvtX(x) {
    var rect = canvas.getBoundingClientRect();
    return (x - rect.left) * (canvas.width / canvas.clientWidth);
}

function getEvtY(y) {
    var rect = canvas.getBoundingClientRect();
    return (y - rect.top) * (canvas.height / canvas.clientHeight);
}

const defWidth = 1300;
const defHeight = 1600;
const scale = window.outerWidth / 1920 * 2;
const CLOSE = 70 * scale;
const cWidth = defWidth * scale;
const cHeight = defHeight * scale;
var notInserted = [
    {organ: new Organ("./imgs/intestines.png", 700*scale, 20*scale, 200*scale, 240*scale, 280*scale, 620*scale, 700*scale, 20*scale, 1)},
    {organ: new Organ("./imgs/bladder.png", 850*scale, 1400*scale, 130*scale, 160*scale, 315*scale, 700*scale, 850*scale, 1400*scale, 2)},
    {organ: new Organ("./imgs/stomach.png", 600*scale, 1100*scale, 160*scale, 160*scale, 330*scale, 500*scale, 600*scale, 1100*scale, 3)},
    {organ: new Organ("./imgs/kidneys.png", 900*scale, 620*scale, 200*scale, 120*scale, 280*scale, 560*scale, 900*scale, 620*scale, 4)},
    {organ: new Organ("./imgs/liver.png", 1000*scale, 1000*scale, 190*scale, 130*scale, 260*scale, 500*scale, 1000*scale, 1000*scale, 5)},
    {organ: new Organ("./imgs/lungs.png", 1000*scale, 100*scale, 280*scale, 240*scale, 245*scale, 280*scale, 1000*scale, 100*scale, 6)},
    {organ: new Organ("./imgs/heart.png", 800*scale, 900*scale, 100*scale, 140*scale, 345*scale, 300*scale, 800*scale, 900*scale, 7)},
    {organ: new Organ("./imgs/brain.png", 700*scale, 400*scale, 120*scale, 90*scale, 320*scale, 10*scale, 700*scale, 400*scale, 8)}
];

const canvas = document.getElementById("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
console.log(canvas.clientHeight);
if(window.innerHeight > window.innerWidth) {
    canvas.style = "width: " + (window.outerWidth*0.9) + "px;";
} else {
    canvas.style = "width: " + (window.outerWidth*0.35) + "px;";
}

const ctx = canvas.getContext("2d");