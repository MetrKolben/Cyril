class Organ{
    constructor(src, x, y, width, height, endX, endY, endZ) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.endX = endX;
        this.endY = endY;
        this.endZ = endZ;
    }

}

function repaint() {
    //var img = new Image();
    //img.src = './brain.png'
    //ctx.drawImage(img, 100, 100, 100, 100);
    //var img2 = new Image();
    //let organ = notInserted[0];
    //console.log(organ.organ.src);
    //var img = new Image();
    //img.src = organ.organ.src;
    //ctx.drawImage(img, 100, 100, 100, 100);
    //ctx.drawImage(new Image(organ.organ.src), organ.x, organ.y, organ.width, organ.height);
    for(organ of notInserted) {
        var img = new Image();
        img.src = organ.organ.src;
        var o = organ.organ;
        ctx.drawImage(img, o.x, o.y, o.width, o.height);
    }
    
}

function main() {
    //ctx.drawImage(organ.img, organ.x, organ.y, organ.width, organ.height);
    //var img = new Image();
    //img.src = './brain.png'
    //ctx.drawImage(img, 100, 100);
    setInterval(repaint, 1000/60);
    console.log(window.outerWidth);
}

const defWidth = 1300;
const defHeight = 1600;
const scale = window.outerWidth / 1920 * 2;
const cWidth = defWidth * scale;
const cHeight = defHeight * scale;
var inserted = new Array();
var notInserted = [
    {organ: new Organ("./imgs/intestines.png", 700*scale, 20*scale, 200*scale, 240*scale, 280*scale, 620*scale, 1)},
    {organ: new Organ("./imgs/bladder.png", 850*scale, 1400*scale, 130*scale, 160*scale, 315*scale, 700*scale, 2)},
    {organ: new Organ("./imgs/stomach.png", 330*scale, 500*scale, 170*scale, 160*scale, 330*scale, 500*scale, 3)},
    {organ: new Organ("./imgs/kidneys.png", 280*scale, 560*scale, 200*scale, 120*scale, 280*scale, 560*scale, 4)},
    {organ: new Organ("./imgs/liver.png", 260*scale, 500*scale, 190*scale, 130*scale, 260*scale, 500*scale, 5)},
    {organ: new Organ("./imgs/lungs.png", 240*scale, 280*scale, 280*scale, 240*scale, 240*scale, 280*scale, 6)},
    {organ: new Organ("./imgs/heart.png", 325*scale, 300*scale, 105*scale, 140*scale, 325*scale, 300*scale, 7)},
    {organ: new Organ("./imgs/brain.png", 320*scale, 10*scale, 120*scale, 90*scale, 320*scale, 10*scale, 8)}
];


const canvas = document.getElementById("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
const ctx = canvas.getContext("2d");
let organ = notInserted[0];
//ctx.drawImage(organ.img, organ.x, organ.y, organ.width, organ.height);

