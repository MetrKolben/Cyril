var SELECTED_ORGAN = null;
var SELECTED = false;
var offset = {
    x:0,
    y:0
}

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
    }

}

function repaint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(organ of notInserted) {
        var img = organ.organ.img;
        var o = organ.organ;
        ctx.drawImage(img, o.x, o.y, o.width, o.height);
    }
    
}

function main() {
    setInterval(repaint, 1000/60);
    console.log(window.outerWidth);

    canvas.addEventListener("mousedown", click);
    canvas.addEventListener("mousemove", drag);
    canvas.addEventListener("mouseup", release);
}

function release(evt) {
    if(SELECTED) {
        if(isClose()) {
            SELECTED_ORGAN.x = SELECTED_ORGAN.endX;
            SELECTED_ORGAN.y = SELECTED_ORGAN.endY;
        } else {
            SELECTED_ORGAN.x = SELECTED_ORGAN.startX;
            SELECTED_ORGAN.y = SELECTED_ORGAN.startY;
        }
    }
    SELECTED = false;
    SELECTED_ORGAN = null;
}

function drag(evt) {
    if(SELECTED) {
        x = getEvtX(evt.x);
        y = getEvtY(evt.y);
        SELECTED_ORGAN.x = x - offset.x;
        SELECTED_ORGAN.y = y - offset.y;
    }
    console.log(notInserted);
}

function click(evt) {
    SELECTED_ORGAN = getSelectedOrgan(getEvtX(evt.x), getEvtY(evt.y));
}

function getSelectedOrgan(x, y) {
    for(let i = notInserted.length-1; i >=0; i--) {
        var o = notInserted[i].organ;
        if((x > o.x && x < o.x+o.width) && (y > o.y && y < o.y+o.height)) {
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
const CLOSE = 50 * scale;
const cWidth = defWidth * scale;
const cHeight = defHeight * scale;
var inserted = new Array();
var notInserted = [
    {organ: new Organ("./imgs/intestines.png", 700*scale, 20*scale, 200*scale, 240*scale, 280*scale, 620*scale, 700*scale, 20*scale, 1)},
    {organ: new Organ("./imgs/bladder.png", 850*scale, 1400*scale, 130*scale, 160*scale, 315*scale, 700*scale, 850*scale, 1400*scale, 2)},
    {organ: new Organ("./imgs/stomach.png", 600*scale, 1100*scale, 160*scale, 160*scale, 330*scale, 500*scale, 600*scale, 1100*scale, 3)},
    {organ: new Organ("./imgs/kidneys.png", 900*scale, 620*scale, 200*scale, 120*scale, 280*scale, 560*scale, 900*scale, 620*scale, 4)},
    {organ: new Organ("./imgs/liver.png", 1000*scale, 1000*scale, 190*scale, 130*scale, 260*scale, 500*scale, 1000*scale, 1000*scale, 5)},
    {organ: new Organ("./imgs/lungs.png", 1000*scale, 100*scale, 280*scale, 240*scale, 240*scale, 280*scale, 1000*scale, 100*scale, 6)},
    {organ: new Organ("./imgs/heart.png", 800*scale, 900*scale, 100*scale, 140*scale, 345*scale, 300*scale, 800*scale, 900*scale, 7)},
    {organ: new Organ("./imgs/brain.png", 700*scale, 400*scale, 120*scale, 90*scale, 320*scale, 10*scale, 700*scale, 400*scale, 8)}
];

const canvas = document.getElementById("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
const ctx = canvas.getContext("2d");