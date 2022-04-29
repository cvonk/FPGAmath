// 1-bit Full Adder
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

var circuitFa = {};  // full adder Name Space
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

  this.updateOutputs = function() {
    var a = +input.a.innerHTML;
    var b = +input.b.innerHTML;
    var ci = +input.ci.innerHTML;
    circuitQueue.insert( output.co, (a && b) || (ci && (a ^ b)) ? 1 : 0, queueDftDelay );
    circuitQueue.insert( output.s, a ^ b ^ ci ? 1 : 0,  0 );
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays
  };

  this.toggle = function(obj) {
    obj = obj || window.event;
    obj.innerHTML = (Number(obj.innerHTML) + 1) % 2;
    circuitFa.updateOutputs();
  };

  this.init = function() {
    console.log("init");
    jQuery('.circuit-container#circuit-fa > .circuit-input').each(function(ii, obj) {
      input[obj.id] = obj;
      obj.innerHTML = 0;
      obj.onclick = function() {
        circuitFa.toggle(this);
      };
      obj.style.height = "5%";
      obj.style.width = "6%";
    });
    jQuery('.circuit-container#circuit-fa > .circuit-output').each(function(ii, obj) {
      output[obj.id] = obj;
      obj.style.height = "5%";
      obj.style.width = "6%";
    });
    circuitFa.updateOutputs();
    circuitFa.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {
      resizeIframe();
    } 
  };
}).apply(circuitFa);

window.addEventListener('load', circuitFa.init);
window.addEventListener('resize', circuitFa.resizeFonts);
