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
    let organ = notInserted[0];
    //console.log(organ.organ);
    ctx.drawImage(new Image(organ.src), organ.x, organ.y, organ.width, organ.height);
}

function main() {
    //ctx.drawImage(organ.img, organ.x, organ.y, organ.width, organ.height);
    //var img = new Image();
    //img.src = './brain.png'
    //ctx.drawImage(img, 100, 100);
    setInterval(repaint, 1000/60);
}

const defWidth = 650;
const defHeight = 800;
const scale = window.innerWidth / 1920;
const cWidth = defWidth * scale;
const cHeight = defHeight * scale;
var inserted = new Array();
var notInserted = [
    {organ: new Organ("./brain.png", 100, 100, 100, 100, 100, 100, 2)}
];


const canvas = document.getElementById("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
const ctx = canvas.getContext("2d");
let organ = notInserted[0];
//ctx.drawImage(organ.img, organ.x, organ.y, organ.width, organ.height);

