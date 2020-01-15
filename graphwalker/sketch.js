let height,width,maxX,maxY,t,old_x,old_y;
function setup() {
	height = windowWidth - 10;
	width = windowWidth - 10;
	maxX = width/2;
	maxY = height/2;
	createCanvas(height, width,WEBGL);
	background(250);
	fill(0,250,0);
	stroke(0,250,200);
	angleMode(DEGREES);
	//frameRate(10)
	t = 1;
	old_x = 0;
	old_y = 0;
}

function draw() {
	//background(250);
	let n1 = noise(t);
	let x = map(n1,0,1, -maxX, maxX);
	let n2 = noise(t);
	let y = map(n2,0,1, -maxY, maxY);
	rotate(map(noise(t),0,1, 0, 360));
	ellipse(old_x,old_y,10,10)
	t = t + 0.01;
	old_x = x;
	old_y = y;
}