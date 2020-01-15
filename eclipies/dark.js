class Dark {
    constructor(xMax, yMax) {
      this.x = 0;
      this.y = 0;
      this.xRange = xMax;
      this.yRange = yMax;
      this.x += random(-this.xRange, this.xRange);
      this.y += random(-this.yRange, this.yRange);
      this.life = 5;
      this.owner = null;
    }
  
    work(eclipies,darks) {
      strokeWeight(0);
      fill(150, 20, 100, 250);
      ellipse(this.x, this.y, 10, 10);
    }

    distance(eclipy) {
      let dis = dist(this.x, this.y, eclipy.x, eclipy.y);
      return dis;
    }
  }