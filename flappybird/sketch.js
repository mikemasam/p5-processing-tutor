let bars,
  bird,
  gravity,
  velocity,
  maxX,
  maxY,
  height,
  width,
  r,
  space_force,
  bar_speed,
  life;
function setup() {
  this.width = 400;
  this.height = 400;
  this.maxX = this.width / 2;
  this.maxY = this.height / 2;
  createCanvas(this.width, this.height, WEBGL);
  background(250);
  this.bird = createVector(-100, 0);
  this.gravity = createVector(0, 1);
  this.space_force = createVector(0, 10);
  this.gravity.setMag(0.6);
  this.velocity = createVector(0, 0);
  this.r = 20;
  this.bars = [newTopBar(), newBottomBar()];
  this.bar_speed = 2;
  this.life = this.maxX;
}

function draw() {
  background(0);

  if (frameCount % 70 == 0) {
    this.bars.push(newTopBar(), newBottomBar());
  }

  for (let i = this.bars.length - 1; i >= 0; i--) {
    let rc = this.bars[i];
    if (this.life > -this.maxX){
       rc.x -= this.bar_speed;
    }else{
      noLoop();
    }

	fill(250);
	noStroke();
    if (rc.offscreen(this)) {
      this.bars.splice(i, 1);
    } else if (rc.x < -this.maxX + this.r * 2) {
      fill(100);
      rect(rc.x, rc.y, rc.w, rc.h);
    } else {
      if (rc.hit(this.bird)) {
        //console.log("HIT! > " + rc.t);
        fill(250, 0, 0);
        this.life -= 10;
        stroke(250);
      } else {
        stroke(0, 250, 0);
        this.life +=0.05;
	  }
	  this.life = constrain(this.life,-this.maxX-this.r,this.maxX)
	  line(-this.maxX, this.maxY, this.life, this.maxY);
	  line(-this.maxX, -this.maxY, this.life, -this.maxY);

	  noStroke();
      rect(rc.x, rc.y, rc.w, rc.h);
    }
  }
  //console.log(this.bird);

  this.velocity.add(this.gravity);
  this.velocity.mult(0.9);
  this.bird.add(this.velocity);
  fill(250);
  noStroke();

  if (this.bird.y + this.r > this.maxY) {
    this.bird.y = this.maxY - this.r;
    this.velocity = createVector(0, 0);
  }

  if (-(this.bird.y - this.r) > this.maxY) {
    this.bird.y = -this.maxY + this.r;
    this.velocity = createVector(0, 0);
  }

  ellipse(this.bird.x, this.bird.y, this.r, this.r);
}

function keyPressed() {
  //console.log(keyCode);
  if (keyCode == 32) {
    this.velocity.sub(this.space_force);
  }
}

function newBottomBar() {
  let bar_width = 20;
  let bar_height = random(this.maxY/2, this.maxY);
  let bar = {
    x: this.maxX,
    y: this.maxY - bar_height, //to shift block up
    w: bar_width,
    h: bar_height,
    t: "<BOTTOM",
    offscreen: function(cx) {
      return this.x < -cx.maxX;
    },
    hit: function(cx) {
      let _hit = cx.y > this.y && cx.x > this.x && cx.x < this.x + bar_width;
      return _hit;
    }
  };
  return bar;
}
function newTopBar() {
  let bar_width = 20;
  let bar_height = random(this.maxY/2, this.maxY);
  let bar = {
    x: this.maxX,
    y: -this.maxY,
    w: bar_width,
    h: bar_height,
    t: "<TOP",
    offscreen: function(cx) {
      return this.x < -cx.maxX;
    },
    hit: function(cx) {
      let _hit =
        this.y + bar_height > cx.y &&
        cx.x > this.x &&
        cx.x < this.x + bar_width;
      //console.log(bar_height);
      return _hit;
    }
  };
  return bar;
}
