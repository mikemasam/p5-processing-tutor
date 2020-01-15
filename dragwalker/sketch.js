function setup() {
  this.height = 420;
  this.width = 600;
  this.maxX = this.width / 2;
  this.maxY = this.height / 2;
  createCanvas(width, height);
  background(255);
  angleMode(DEGREES);
  this.liquid = new Liquid(-this.maxX, 0, this.maxX * 2, this.maxY, -0.1);

  this.mad = new Liquid(
    -this.maxX,
    this.maxY / 1.2,
    this.maxX * 2,
    this.maxY,
    -0.7
  );

  this.attractor = new Attractor(-200, 0, 50);
  this.attractor2 = new Attractor(200, 0, 50);

  this.bodies = [];
  for (let i = 0; i < 3; i++) {
    this.bodies[i] = new Body(
      random(-this.maxX, this.maxX),
      -this.maxY,
      20,
      this.maxX,
      this.maxY
    );
  }
}

function draw() {
  translate(this.width / 2, this.height / 2);
  //rotate(180);
  background(255);
  this.liquid.render();
  this.mad.render();

  this.attractor.render();
  this.attractor2.render();
  let gravity = new createVector(0, 0.05);
  for (let i = 0; i < this.bodies.length; i++) {
    this.bodies[i].applyFraction();
    this.bodies[i].applyGravity(gravity);

    let drag = this.liquid.getForces(this.bodies[i]);
    this.bodies[i].applyForce(drag);

    let madDrag = this.mad.getForces(this.bodies[i]);
    this.bodies[i].applyForce(madDrag);

    //let attract = this.attractor.attract(this.bodies[i]);
    //this.bodies[i].applyForce(attract);

    //let attract2 = this.attractor2.attract(this.bodies[i]);
	//this.bodies[i].applyForce(attract2);
	

	for (let j = 0; j < this.bodies.length; j++) {
		if (i != j) {
		  let force = this.bodies[j].attract(this.bodies[i]);
		  this.bodies[i].applyForce(force);
		}
	  }

    this.bodies[i].update();
    this.bodies[i].render();
    this.bodies[i].checkBounds();
  }
}

class Attractor {
  constructor(_x, _y, _mass) {
    this.mass = _mass;
    this.G = 1;
    this.drag = createVector(0, 0);
    this.origin = createVector(_x, _y);
  }
  attract(m) {
    let f = this.origin.copy();
    f.sub(m.location);
    let distance = f.mag();
    distance = constrain(distance, 5.0, 25.0);
    f.normalize();

    let strength = (this.G * this.mass * m.mass) / (distance * distance);
    f.mult(strength);
    return f;
  }
  render() {
    noStroke();
    fill(0, 30);
    ellipse(this.origin.x, this.origin.y, this.mass * 2, this.mass * 2);
  }
}

class Liquid {
  constructor(_x, _y, _w, _h, _c) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.c = _c;
  }
  render() {
    fill(40, 100);
    rect(this.x, this.y, this.w, this.h);
  }
  getForces(m) {
    if (m.location.y > this.y) {
      let drag = m.velocity.copy();
      drag.normalize();
      let speed = m.velocity.mag();
      drag.mult(this.c * speed * speed);
      //add current
      //let current = createVector(this.c * 0.05,this.c * 0.05);
      //drag.add(current);
      return drag;
    }
    return createVector(0, 0);
  }
}

class Body {
  constructor(_x, _y, _r, _maxX, _maxY) {
    this.x = _x;
    this.y = _y;
    this.mass = random(1.0, 4.0);
    this.r = _r * (this.mass / 3);
    this.maxX = _maxX;
    this.maxY = _maxY;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.location = createVector(this.x, this.y);
  }

  render() {
    noStroke();
    fill(50, 100);
    ellipse(this.location.x, this.location.y, this.r * 2, this.r * 2);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let _force = force.copy();
    _force.div(this.mass);
    this.acceleration.add(_force);
  }

  applyGravity(force) {
    let _force = force.copy();
    _force.mult(this.mass);
    this.applyForce(_force);
  }

  applyFraction() {
    let c = 0.05;
    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);
    this.applyForce(friction);
  }

  
  attract(m) {
    let f = this.location.copy();
    f.sub(m.location);
    let distance = f.mag();
    distance = constrain(distance, 5.0, 25.0);
    f.normalize();

    let strength = (1 * this.mass * m.mass) / (distance * distance);
    f.mult(strength);
    return f;
  }

  checkBounds() {
    if (this.location.x > this.maxX - this.r) {
      this.velocity.x *= -1;
      this.location.x = this.maxX - this.r;
    }

    if (this.location.y > this.maxY - this.r) {
      this.velocity.y *= -1;
      this.location.y = this.maxY - this.r;
    }

    if (this.location.x < -this.maxX + this.r) {
      this.velocity.x *= -1;
      this.location.x = -this.maxX + this.r;
    }

    if (this.location.y < -this.maxY + this.r) {
      this.velocity.y *= -1;
      this.location.y = -this.maxY + this.r;
    }
  }
}
