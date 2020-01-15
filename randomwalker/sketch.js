let walker;
let height;
let width;
function setup() {
	height = windowWidth;
	width = windowWidth;
	createCanvas(width, height,WEBGL);
	background(250);
	fill(50);
	walker = new Walker(width/2,height/2,6);
}

function draw() {
	walker.render();
	walker.walk();
	//walker.render();
}

class Walker {
	constructor(_maxX,_maxY,_weight){
		this.x = 0;
		this.y = 0;
		this.maxX = _maxX;
		this.maxY = _maxY;
		this.weight = _weight-1;
	}

	walk(){
		let i = Math.trunc(random(0,4));
		if(i == 0){
			this.x += 1 + this.weight;
		}else if(i == 1){
			this.y += 1 + this.weight;
		}else if(i == 2){
			this.x -= 1 + this.weight;
		}else if(i == 3){
			this.y -= 1 + this.weight;
		}

		this.x = constrain(this.x, -this.maxX/ 1 + this.weight, this.maxX/ 1 + this.weight);
		this.y = constrain(this.y, -this.maxY/ 1 + this.weight, this.maxY/ 1 + this.weight);
	}
	
	render(){
		//ellipse(this.x, this.y, 10, 10);
		fill(random(0,250),random(0,250),random(0,250),random(0,250));
		stroke(250)
		ellipse(this.x, this.y, 1 + this.weight, 1 + this.weight);
	}
}