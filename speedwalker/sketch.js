let height,width,xspeed,yspeed,x,y,maxX,maxY,r;
function setup() {
	this.height = windowWidth;
	this.width = windowWidth;
	createCanvas(this.width,this.height,WEBGL);
	background(250);
	this.maxX = this.width/2;
	this.maxY = this.height/2;
	this.xspeed = 2;
	this.yspeed = 2;
	this.r = 20;
	this.x = random(-this.maxX,this.maxX);
	this.y = random(-this.maxY,this.maxY);
}

function draw() {
	background(250);
	stroke(0);
	fill(250);
	
	if(((this.x) > this.maxX - this.r) || (this.x < (-this.maxX + this.r))){
		this.xspeed = this.xspeed * -1;
	}
	if((this.y > this.maxY - this.r) || (this.y < (-this.maxY + this.r))){
		this.yspeed = this.yspeed * -1;
	}
	this.x = this.x + this.xspeed;
	this.y = this.y + this.yspeed;
	ellipse(this.x,this.y,this.r * 2,this.r * 2);
}