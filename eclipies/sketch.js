let eclipies = [];
let darks = [];
let x = 1;
let y = 1;
let initial = {
  food: 24,
  gen: 4,
  padding: 10,
  height: 0,
  width: 0,
  initialValues(_width, _height) {
    this.width = _width;
    this.height = _height;
  },
  maxX() {
    return this.width / 2 - initial.padding;
  },
  maxY() {
    return this.height / 2 - initial.padding;
  }
};

function setup() {
  initial.initialValues(400, 400);
  console.log("MaxX=[" + initial.maxX() + "], MaxY=[" + initial.maxY() + "]");

  createCanvas(initial.width, initial.height, WEBGL);
  frameRate(30);
  for (let i = 0; i < initial.gen; i++) {
    eclipies.push(new Eclipy(initial.maxX(), initial.maxY()));
  }
  for (let i = 0; i < initial.food; i++) {
    darks.push(new Dark(initial.maxX(), initial.maxY()));
  }
}

function draw() {
  background(0);
  fill(0);
  //Text('hello',10,10);
  for (let i = 0; i < eclipies.length; i++) {
    eclipies[i].work(darks);
    drawDarks();
  }

  
}

function drawDarks() {
  for (let j = darks.length - 1; j >= 0; j--) {
    if (darks[j].life <= 1) {
      darks.splice(j, 1);
    } else {
      darks[j].work(eclipies,darks);
    }
  }
}
