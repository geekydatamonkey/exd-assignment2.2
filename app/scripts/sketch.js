// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let _ = require('lodash');
let Wave = require('./wave');

const π = Math.PI;
let config = {
  canvasWrapper: '.canvas-wrapper',
  initialAmp: 10
};

let waveList = [];

function checkForSecondaryWave(wave) {
  // if wave hasn't already been triggered
  // and we're at the max point
  // and amplitude >= 1

  if (wave.secondaryWaveTriggered) {
    return false;
  }

  let t = wave.getTimeSinceStart();
  let atMaxPoint = -1 * Math.cos(2*π*t/1200) > 0.999;
  return atMaxPoint && (wave.getAmplitude() >= 1);
}

function createSecondaryWave(wave) {
  // record that we're making a secondary wave
  wave.secondaryWaveTriggered = true;

  let secondary = new Wave(wave.x, wave.y);
  secondary.setSketch(wave.sketch);
  
  // amplitude based on old wave
  let t = wave.getTimeSinceStart();
  let newAmp = wave.amplitude * Math.exp(-2 /1000 * t);
  secondary.setAmplitude(newAmp);

  // add to waveList
  waveList.push(secondary);
}

function mySketch(s){

  s.setup = function (){

    // create canvas and put in canvasWrapper
    let $canvasWrapper = $(config.canvasWrapper);
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    // modes
    s.background('#fae');
    s.ellipseMode(s.RADIUS);
    s.noFill();
    s.strokeWeight(1);
    s.stroke(220);

  };

  s.draw = function() {
    s.clear();

    // remove any waves too big for canvas
    _.remove(waveList, function(wave) {
      let biggerThanCanvas = wave.radius > s.width && wave.radius > s.height;
      return biggerThanCanvas;
    });

    for (let i=0, len = waveList.length; i < len; i++) {
      let wave = waveList[i];
      
      if (checkForSecondaryWave(wave)){
        createSecondaryWave(wave);
      }
      waveList[i].update().render();
    }
  };

  s.mousePressed = function() {
    let wave = new Wave(s.mouseX, s.mouseY);
    wave.setSketch(s);
    wave.setAmplitude(config.initialAmp);
    waveList.push(wave);
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper);

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);
    s.stroke(220);

  };
}

function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};