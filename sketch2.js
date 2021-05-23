const scl = 8;
const inc = 0.01;
const vnum = 1000;
const dist = 100;
let zoff = 0;
let fr;
let vs = [];

function drawText() {
    background(240);

    let lw = floor(width / scl);
    let lh = floor(height / scl);

    scale(scl);
    noStroke();
    
    // textFont("Montserrat");
    // textAlign(CENTER, CENTER);
    // text("in:to", lw / 2, lh / 4);
    // text("in:to", lw / 2, lh / 2);
    // text("in:to", lw / 2, (lh / 4) * 3);

    textFont("Noto Sans SC");
    textAlign(LEFT, CENTER);
    let txt = "普惠关怀 Inclusive Solicitude\n // 混合时空 Hybrid Space-\nTime // 焕新传承 Revitalized\nHeritage // 多元范式 Plural\nParadigm // 循环共⽣ Circu-\nlar Intergrowth //"
    text(txt, lw / 20, lh / 2);
}

function setup() {
    pixelDensity(1);
    // createCanvas(400, 400);
    createCanvas(windowWidth, windowHeight);

    fr = createP();
    fr.position(0, 0);
    fr.style("font-size", "32px");
    fr.style("background", "white");

    for (let i = 0; i < vnum; i++) {
        vs.push(createVector(floor(random(width)), floor(random(height))));
    }

    drawText();

    // noLoop();
}

function draw() {
    //   background(240);
    //   let lw = floor(width / scl);
    //   let lh = floor(height / scl);

    //   scale(scl);
    //   noStroke();
    //   textAlign(CENTER, CENTER);
    //   text("in:to", lw / 2, lh / 2);

    // print(mouseX);

    loadPixels();

    let vm = createVector(mouseX, mouseY);

    for (let i = vnum - 1; i >= 0; i--) {
        let v = vs[i];
        let diff = v.dist(vm);
        if (diff > dist) {
            let nv = p5.Vector.random2D();
            nv.setMag(random(dist));

            v.x = floor(nv.x + vm.x);
            v.y = floor(nv.y + vm.y);

            // v.x = mouseX;
            // v.y = mouseY;
            // print(diff);
        }
        // let v = createVector(floor(width), floor(height));
        blur(v);

        let n = noise(v.x * inc, v.y * inc, zoff);
        let b = map(n, 0, 1, 0, TWO_PI);
        let off = p5.Vector.fromAngle(b, 3);
        offSet(v, off);
    }

    // for (let x = 0; x < width; x++) {
    //   for (let y = 0; y < height; y++) {
    //     let n = noise(x * inc, y * inc, zoff);
    //     let b = map(n, 0, 1, 0, 255);
    //     let p = (x + y * width) * 4;
    //     pixels[p] = b;
    //     pixels[p + 1] = b;
    //     pixels[p + 2] = b;
    //   }
    // }

    updatePixels();

    // strokeWeight(1);
    // stroke(0);
    // noFill();
    // circle(mouseX, mouseY, dist);

    // print(vs.length);
    fr.html(floor(frameRate()));
    // zoff += inc;
}

function windowResized() {
    // pixelDensity(1);
    resizeCanvas(windowWidth, windowHeight);
    drawText();
}

function test() {
    print("pixelDensity: " + pixelDensity() + ", width: " + width);
}

function blur(v) {
    let px = 1;
    let r = 0;
    let g = 0;
    let b = 0;
    // test();

    let c = 0;
    for (let i = -px; i <= px; i++) {
        let x = v.x + i;
        for (let j = -px; j <= px; j++) {
            let y = v.y + j;
            let p = (x + y * width) * 4;
            r += pixels[p];
            g += pixels[p + 1];
            b += pixels[p + 2];
            c++;
        }
    }

    r /= c;
    g /= c;
    b /= c;

    let p = (v.x + v.y * width) * 4;
    pixels[p] = r;
    pixels[p + 1] = g;
    pixels[p + 2] = b;
}

function offSet(v, o) {
    let p = (v.x + v.y * width) * 4;
    let r = pixels[p];
    let g = pixels[p + 1];
    let b = pixels[p + 2];

    v.x += floor(o.x);
    v.y += floor(o.y);

    //   stroke(0);
    //   strokeWeight(1);
    //   point(v.x,v.y);

    p = (v.x + v.y * width) * 4;
    pixels[p] = r;
    pixels[p + 1] = g;
    pixels[p + 2] = b;
}
