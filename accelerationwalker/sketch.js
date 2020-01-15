let velocity,acceleration,origin,maxX,maxY,translater;
let object = [];
function setup() {
	createCanvas(windowWidth, windowWidth);
	this.maxX = windowWidth/2;
	this.maxY = windowWidth/2;
	this.translater = createVector(this.maxX,this.maxY);
	this.origin = createVector(this.maxX,this.maxY);
	this.object = this.origin.copy();
	this.acceleration = createVector(0,0);
	this.velocity = createVector(0,0);
}

function draw() {
	//background(230);
	let mouse = createVector(mouseX,mouseY);
	//mouse.sub(this.translater);

	mouse.sub(this.object);
	mouse.setMag(0.1);
	this.acceleration = mouse;
	this.velocity.add(this.acceleration);
	this.object.add(this.velocity);
	ellipse(this.object.x,this.object.y,10,10);
	//text("  ~ [" + this.acceleration + "]",this.object.x,this.object.y);
	this.velocity.limit(4);
	//background(0);
}