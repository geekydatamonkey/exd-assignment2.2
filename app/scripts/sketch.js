// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let $ = require('jquery');
let Wave = require('./wave');

let config = {
  canvasWrapper: '.canvas-wrapper'
};

let waveList = [];

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
    s.strokeWeight(10);

  };

  s.draw = function() {
    s.clear();
    for (let i=0, len = waveList.length; i < len; i++) {
      waveList[i].update().render();
    }
  };

  s.mousePressed = function() {
    let wave = new Wave(s.mouseX, s.mouseY);
    wave.setSketch(s);
    waveList.push(wave);
    console.log(waveList);
  };

  s.windowResized = function() {
    let $canvasWrapper = $(config.canvasWrapper);

    let w = $canvasWrapper.innerWidth();
    let h = $canvasWrapper.height();

    // put in canvasWrapper
    s.resizeCanvas(w,h-3);

  };
}

function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};