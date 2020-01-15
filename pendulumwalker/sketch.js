function setup() {
  this.height = windowHeight;
  this.width = windowWidth;
  this.max = createVector(this.width / 2, this.height / 2);
  createCanvas(this.width, this.height);
  background(255);
  this.pendulum = [];
  this.angle = 0.0;
  for (let i = 0; i < 5; i++) {
    this.pendulum[i] = new Pendulum(
	  createVector(-this.max.x + ((i + 1) * (this.max.x * 0.3 )), 
	  (-this.max.y + (this.max.y*0.1))),
      random(10, 500),
      this.max.copy()
    );
  }
}

function draw() {
  background(255);
  translate(this.width / 2, this.height / 2);
  for (let i = 0; i < this.pendulum.length; i++) {
    this.pendulum[i].applyAngleGravity(-0.6);
    //this.pendulum[i].applySpringForce(0.005);
    this.pendulum[i].update();
    this.pendulum[i].render();
  }

  //this.angle += 0.001;
}

class Pendulum {
  constructor(_location, _length, _max) {
	this.location = _location;
	
	this.acceleration = createVector(0,0);
	this.velocity = createVector(0,0);

	this.length = _length + 100;
	this.rest_length = _length;
    this.angle = TWO_PI/4;
    this.angleVelocity = 0.0;
    this.angleAcceleration = 0.0;
    this.head = createVector(0,0)
    this.max = _max;
  }
  applyForce(force){
	  this.acceleration.add(force)
  }
  applyAngleForce(force) {
    this.angleAcceleration = force;
  }
  applyAngleGravity(gravity) {
    this.applyAngleForce((gravity / this.length) * Math.sin(this.angle));
  }
  applySpringForce(k){
	  let spring = this.head.copy().sub(this.location);
	  spring.normalize();
	  k *= -1;
	  spring.mult(k * (this.length - this.rest_length))
	  this.applyForce(spring)
  }
  update() {
	let x = this.location.x + this.length * 
	Math.sin(this.angle);
	let y = this.location.y + this.length * 
	Math.cos(this.angle);

	this.head.set(x,y);
	//apply head forces
	this.velocity.add(this.acceleration)
	this.head.add(this.velocity);
	this.acceleration.mult(0);
	this.length = this.head.copy().sub(this.location).mag();
	//this.length = constrain(this.length,50,200)
	


	//apply angle forces
    this.angleVelocity += this.angleAcceleration;
    this.angleVelocity *= 0.999;
    this.angle += this.angleVelocity;
    this.angleVelocity = constrain(this.angleVelocity, -0.1, 0.1);
  }
  render() {
	noStroke();
    fill(0, 150);
	ellipse(this.location.x, this.location.y, 10, 10);
	text("V[" + Math.round(map(this.angleVelocity,-0.1,0.1,-10,10)) + " ^ " +
	 Math.round(this.length) + "]",
	 this.location.x - 5,this.location.y - 10)
    ellipse(this.head.x, this.head.y, 10, 10);
	fill(100, 100);
	stroke(0, 150);
	line(this.location.x, this.location.y, 
		this.head.x, this.head.y);
    ellipse(this.head.x, this.head.y, 30, 30);
  }
}
