// 1-bit multiplier adder
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

var circuitMa = {};  // multiplier adder Name Space
(function() {
  let queueDftDelay = 350; // msec
  var input = {};
  var output = {};

  // resize the fonts when the window is resized
  this.resizeFonts = function() {
    for (let key in input) {
      let obj = input[key];
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
    circuitMa.updateOutputs();
  };

  this.init = function() {
    //console.log("init");
    jQuery('.circuit-container#circuit-ma > .circuit-input').each(function(ii, obj) {
      input[obj.id] = obj;
      obj.innerHTML = 0;
      obj.onclick = function() {
        circuitMa.toggle(this);
      };
      obj.style.height = "5%";
      obj.style.width = "6%";
    });
    jQuery('.circuit-container#circuit-ma > .circuit-output').each(function(ii, obj) {
      output[obj.id] = obj;
      obj.style.height = "5%";
      obj.style.width = "6%";
    });
    circuitMa.updateOutputs();
    circuitMa.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {  // if running in iFrame
       resizeIframe();
    }
  };
  
  this.updateOutputs = function() {
    var si = +input.si.innerHTML;
    var ci = +input.ci.innerHTML;
    var x = +input.x.innerHTML;
    var y = +input.y.innerHTML;
    var b = x && y;
    circuitQueue.insert( output.so, si ^ b ^ ci ? 1 : 0, queueDftDelay );
    circuitQueue.insert( output.co, (si && b) || ci && (si ^ b) ? 1 : 0, 0 );
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays
  };

}).apply(circuitMa);

window.addEventListener('load', circuitMa.init);
window.addEventListener('resize', circuitMa.resizeFonts);
