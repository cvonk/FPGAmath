// 1-bit Controlled Subtract Multiplexer
// used in https://coertvonk.com/technology/logic/computer-math-inquiry-4245/7
/*
Copyright (c) 2017 by Coert Vonk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var circuitCsm = {}; // Controlled Subtract Multiplexer Name Space
(function() {
  let queueDftDelay = 600; // msec
  var input = {};
  var output = {};
  var intern = {};

  // resize the fonts when the window is resized
  this.resizeFonts = function() {
    for (let key in input) {
      let obj = input[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
    for (let key in intern) {
      let obj = intern[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
    for (let key in output) {
      let obj = output[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
  };

  this.toggle = function(obj) {
    obj = obj || window.event;
    obj.innerHTML = (Number(obj.innerHTML) + 1) % 2;
    circuitCsm.updateOutputs();
  };

  this.init = function() {
    jQuery('.circuit-container#circuit-csm > .circuit-input').each(function(ii, obj) {
      input[obj.id] = obj;
      obj.innerHTML = 0;
      obj.onclick = function() {
        circuitCsm.toggle(this);
      };
      obj.style.height = "6%";
      obj.style.width = "7%";
    });
    jQuery('.circuit-container#circuit-csm > .circuit-output').each(function(ii, obj) {
      output[obj.id] = obj;
      obj.style.height = "6%";
      obj.style.width = "7%";
    });
    jQuery('.circuit-container#circuit-csm > .circuit-intern').each(function(ii, obj) {
      intern[obj.id] = obj;
      obj.style.height = "6%";
      obj.style.width = "7%";
    });
    circuitCsm.updateOutputs();
    circuitCsm.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {  // if running in iFrame
      resizeIframe();
    }
  };

  this.updateOutputs = function() {
    let x = +input.x.innerHTML;
    let y = +input.y.innerHTML;
    let bi = +input.bi.innerHTML;
    let os = +input.os.innerHTML;
    let  d_ = x ^ y ^ bi ? 1 : 0;
    circuitQueue.insert( intern["d'"], d_, queueDftDelay );
    circuitQueue.insert( output.bo, (!x && y) || (bi && !(x ^ y)) ? 1 : 0, 0 );
    circuitQueue.insert( output.d, (os && x) || (!os && d_) ? 1 : 0, queueDftDelay );
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays

  };

}).apply(circuitCsm);

window.addEventListener('load', circuitCsm.init);
window.addEventListener('resize', circuitCsm.resizeFonts);
