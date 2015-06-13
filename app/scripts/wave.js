/**
* wave.js
**/

class Wave {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.amplitude = 0;
    this.radius = 0;
    this.sketch = null;
  }

  setSketch(sketch) {
    this.sketch = sketch;
  }

  update() {
    this.radius += 1;
    return this;
  }

  render() {
    if (! this.sketch) {
      console.log('no sketch set');
      return;
    }
    let s = this.sketch;
    s.ellipse(this.x, this.y, this.radius, this.radius);
  }

}


module.exports = Wave;