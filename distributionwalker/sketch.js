let walker;
let height;
let width;
function setup() {
	height = windowWidth-100;
	width = windowWidth-100;
  createCanvas(height, width, WEBGL);
  background(0);
  //frameRate;
  walker = new Walker(height / 2, width / 2);
  angleMode(DEGREES);
  strokeWeight(1);
  frameRate(30)
}

function draw() {
  walker.walk();
  walker.render();
}

class Walker {
  constructor(maxX, maxY) {
    this.x = maxY;
    this.y = maxY;
    this.maxY = maxY;
    this.maxX = maxX;
  }

  walk() {

	/*
let x_one_d = (this.maxX/4);
	let x_mean = this.maxX + this.maxX
	let r = randomGaussian(th);
	//standard deviation
	r = r * x_one_d;
	//mean
	r = r + this.maxX/2;
	//return value to original location
	r = r - this.maxX


	*/
    this.x = randomGaussian(this.maxX,this.maxX/2) - this.maxX;
    this.y = randomGaussian(this.maxY,this.maxY/2) - this.maxY
  }
  stroke() {
    return randomGaussian(250/2,250/10);
  }
  angle(){
	  return randomGaussian(360/2,360/10);
  }

  render() {
	noStroke();
	fill(random(0,250),random(0,250),random(0,250),random(0,250));
	//rotate(this.angle());
  ellipse(this.x, this.y,2,2);
  rect(this.maxX-20,0,4,-createVector(this.x, this.y).mag());
	//arc(this.x, this.y, 80, 80, 0, PI + QUARTER_PI, PIE);
    //text("r", this.x, this.y);
  }
}
