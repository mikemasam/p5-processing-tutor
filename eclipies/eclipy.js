class Eclipy {
  constructor(xMax, yMax) {
    this.x = 0;
    this.y = 0;
    this.xRange = xMax;
    this.yRange = yMax;
    this.x += random(-this.xRange, this.xRange);
    this.y += random(-this.yRange, this.yRange);
    this.id = random(1, 100000);
    this.found = false;
    this.life = 1;
    this.r = 6;
  }

  findFood(darks) {
    this.found = false;

    let nearest = {
      distance: 0,
      dark: null
    };

    for (let i = 0; i < darks.length; i++) {
      let dark = darks[i];
      let distance = dark.distance(this);

      //own nearest dark
      if (distance <= 3 && dark.owner == null) {
        dark.owner = this.id;
      }

      //bite nearest dark and get more life
      if (distance <= 1 && dark.owner == this.id) {
        dark.life--;
        this.life++;
      }

      //follow nearest dark with no owner or is already owned
      if (
        (distance <= nearest.distance || nearest.distance == 0) &&
        (dark.owner == null || dark.owner == this.id)
      ) {
        nearest.dark = dark;
        nearest.distance = distance;
        this.found = true;
      }
    }

    if (this.found) {
      this.x = lerp(this.x, nearest.dark.x, 0.1);
      this.y = lerp(this.y, nearest.dark.y, 0.1);
      this.path(nearest.dark);
    }
  }

  work(darks) {
    this.findFood(darks);
    this.update();
    noStroke();
    fill(250);
    strokeWeight(1);

    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    if (!this.found) {
      fill(0);
      ellipse(this.x, this.y, this.r, this.r);
    }
  }

  path(who) {
    stroke(250);
    strokeWeight(1);
    line(this.x, this.y, who.x, who.y);
  }

  update(){
    //this.r += norm(this.r / this.life,-1,1);
  }
}
