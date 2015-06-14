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
    this.start = (new Date()).getTime();
    this.secondaryWaveTriggered = false;
  }

  setAmplitude(amp) {
    this.amplitude = amp;
  }

  getAmplitude() {
    return this.amplitude;
  }

  getRadius() {
    return this.radius;
  }
  
  getTimeSinceStart() {
    return (new Date()).getTime() - this.start;
  }

  setSketch(sketch) {
    this.sketch = sketch;
    return this;
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
    this.sketch.strokeWeight(Math.round(this.amplitude));
    this.sketch.ellipse(this.x, this.y, this.radius, this.radius);
  }

}


module.exports = Wave;