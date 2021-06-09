let pts = [];
let power = 2;
let ra = 10;
let pt;
let pg;

function setup() {
  // pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(0);

  pg = createGraphics(width, height, WEBGL);

  drawDouble(200);
}

function windowResized() {
  // pixelDensity(1);
  resizeCanvas(windowWidth, windowHeight);
  pg = createGraphics(width, height, WEBGL);
}

function draw() {
  pg.clear();
  pg.background(0, 50);

  pg.stroke(255);
  pg.noFill();
  pg.strokeWeight(0.9);

  // pg.push();
  // pg.pop();
  drawFull();

  image(pg, 0, 0, width, height);
  // print(frameRate());
}

function drawFull() {
  let a = 0;
  for (let i = 0; i < TWO_PI; i += 0.04) {
    pg.push();

    pg.rotateX((mouseX - width / 2) / 100);

    pg.rotateY(0.5 * a);
    drawCone();

    pg.pop();

    pg.rotateX(0.01);
    pg.rotateY(0.04);
    a += 0.1;
  }
}

function drawCone() {
  for (let j = 0; j < 2; j++) {
    // for (let aa = 0; aa < TWO_PI; aa += PI / 20) {
    //   pg.rotateY(aa);
    pg.beginShape(POINTS);
    for (let i = 0; i < pts.length; i++) {
      pts[i].emitte();
    }
    pg.endShape();
    // }
    pg.rotateZ(PI);
  }
}

function drawDouble(w) {
  for (let x = 1; x < w; x++) {
    let y = (10 * w) / x;
    let v = createVector(x, y, 0);
    pts.push(new particle(v, power, ra));
  }
}

class particle {
  constructor(pos, pow, r) {
    this.pos = pos;
    this.pow = pow;
    this.r = r;
  }
  emitte() {
    for (let i = 0; i < this.pow; i++) {
      let dist = random(this.r);
      if (random() < 1 / sq(dist)) {
        let v = p5.Vector.random3D();
        v.setMag(dist);
        pg.vertex(this.pos.x + v.x, this.pos.y + v.y, this.pos.z + v.z);
      }
    }
  }
}
