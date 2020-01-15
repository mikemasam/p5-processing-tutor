let height,width,maxX,maxY,origin;
function setup() {
	this.width = windowWidth;
	this.height = windowWidth;
	this.maxX = this.width/2;
	this.maxY = this.height/2;
	createCanvas(this.width, this.height,WEBGL);
	background(250);
	frameRate(30);
	this.origin = createVector(0,0);
}

function draw() {
	background(250);
	fill(0);
	stroke(0);
	let mouse = createVector(mouseX,mouseY);
	let center = createVector(this.width/2,this.height/2);
	mouse.sub(center);
	//text(mouse.sub(origin),this.origin.x,this.origin.y);
	line(this.origin.x,this.origin.y,mouse.x,mouse.y);
	noStroke();
	text("  Vector[" + mouse.x + "," + Math.round(mouse.y) +
	 "] > " + Math.round(mouse.mag()),
	mouse.x,mouse.y);
	ellipse(mouse.x,mouse.y,10,10);

	let textv = mouse.copy();
	textv.mult(0.5);
	textSize(20);
	noStroke();
	text("  Vector[" + textv.x + "," +
	 Math.round(textv.y) + "] > " + Math.round(textv.mag()),
	textv.x,textv.y);
	ellipse(textv.x,textv.y,10,10);

	rect(-30,0,10,mouse.mag());
}
