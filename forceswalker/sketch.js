let height, width, maxX, maxY, mouseClicked;
let objects;
function setup() {
  this.height = windowHeight - 30;
  this.width = windowWidth;
  this.maxX = this.width / 2;
  this.maxY = this.height / 2;
  this.objects = [];
  this.mouseClicked = false;
  createCanvas(this.width, this.height);
  for (let i = 0; i < 10; i++) {
    this.objects[i] = new Obj(this.maxX, this.maxY);
  }
}

function draw() {
  background(255);
  translate(this.width / 2, this.height / 2);
  let wind = new createVector(0.2, 0);
  let gravity = new createVector(0, 0.1);
  for (let i = 0; i < 10; i++) {
    this.objects[i].applyGravity(gravity);
    if (mouseIsPressed) {
      this.objects[i].applyForce(wind);
    }
	this.objects[i].update();
	this.objects[i].applyFriction();
    this.objects[i].render();
  }
}

class Obj {
  constructor(_maxX, _maxY) {
    this.mass = random(2, 5);
    this.maxX = _maxX;
    this.maxY = _maxY;
    this.location = createVector(random(-this.maxX, this.maxX), 0);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  render() {
    fill(0, 40);
    ellipse(this.location.x, this.location.y, this.mass * 10, this.mass * 10);
  }
  applyGravity(force) {
    let _force = force.copy();
    _force.mult(this.mass);
    this.applyForce(_force);
  }
  applyForce(force) {
    let _force = force.copy();
    _force.div(this.mass);
    this.acceleration.add(_force);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.checkBounds();
  }
  applyFriction(){
	let c = 0.05;
    let friction = this.velocity.copy();
    friction.mult(-1); 
    friction.normalize();
	friction.mult(c);
	this.applyForce(friction);
  }

  checkBounds() {
    if (this.location.x > this.maxX - this.mass) {
      this.velocity.x *= -1;
      this.location.x = this.maxX - this.mass;
    }

    if (this.location.y > this.maxY - this.mass) {
      this.velocity.y *= -1;
      this.location.y = this.maxY - this.mass;
    }

    if (this.location.x < -this.maxX) {
      this.velocity.x *= -1;
      this.location.x = -this.maxX;
    }

    if (this.location.y < -this.maxY) {
      this.velocity.y *= -1;
      this.location.y = -this.maxY + this.mass;
    }
  }
}
