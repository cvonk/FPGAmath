// 4-bit carry-propagate multiplier
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

var circuitCpm = {}; // carry-propagate multiplier Name Space
(function() {
  let queueDftDelay = 350; // msec
  var input = {};
  var output = {};
  var intern = {};

  // resize the fonts when the window is resized
  this.resizeFonts = function() {
    for (var key in input) {
      var obj = input[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
    for (let key in output) {
      let obj = output[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
    for (let key in intern) {
      let obj = intern[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
  };

  this.create2DArray = function(dim1, dim2) {
    var arr = Array(dim1);
    for (var ii = 0; ii < dim1; ii++) {
      arr[ii] = Array(dim2);
    }
    return arr;
  };

  this.updateOutputs = function() {
    let len = Object.keys(input).length / 2;
    let x = Array(len);
    let y = Array(len);
    let c = circuitCpm.create2DArray(len, len);
    let s = circuitCpm.create2DArray(len, len);
    for (ii = 0; ii < len; ii++) {
      x[ii] = +input["x" + ii].innerHTML;
      y[ii] = +input["y" + ii].innerHTML;
    }
    for (ii = 0; ii < len; ii++) {
      for (jj = 0; jj < len; jj++) {
        var ci = jj > 0 ? c[ii][jj - 1] : 0;
        var si =
          ii > 0 ? (jj != len - 1 ? s[ii - 1][jj + 1] : c[ii - 1][jj]) : 0;
        s[ii][jj] = si ^ (x[jj] && y[ii]) ^ ci ? 1 : 0;
        c[ii][jj] =
          (si && (x[jj] && y[ii])) || (ci && si ^ (x[jj] && y[ii])) ? 1 : 0;
        
        circuitQueue.insert( intern["c" + ii + "" + jj], c[ii][jj], queueDftDelay );
        if (ii == len - 1) {
          circuitQueue.insert( output["p" + (len - 1 + jj)], s[ii][jj],  );
        } else {
          if (jj === 0) {
           circuitQueue.insert( output["p" + ii], s[ii][jj], 0 );
          }
          circuitQueue.insert( intern["s" + ii + "" + jj], s[ii][jj], 0 );
        }
      }
    }
    circuitQueue.insert( output["p" + (len + len - 1)], c[len - 1][len - 1], 0 );
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays
  };

  this.toggle = function(obj) {
    obj = obj || window.event;
    obj.innerHTML = (Number(obj.innerHTML) + 1) % 2;
    circuitCpm.updateOutputs();
  };

  this.init = function() {
    jQuery(".circuit-container#circuit-cpm > .circuit-input").each(function(
      ii,
      obj
    ) {
      input[obj.id] = obj;
      obj.innerHTML = 0;
      obj.onclick = function() {
        circuitCpm.toggle(this);
      };
      obj.style.height = "3.5%";
      obj.style.width = "2.5%";
      obj.style.borderColor = "#00ADEE";
    });
    jQuery(".circuit-container#circuit-cpm > .circuit-output").each(function(
      ii,
      obj
    ) {
      output[obj.id] = obj;
      obj.style.height = "3.5%";
      obj.style.width = "2.5%";
    });
    jQuery(".circuit-container#circuit-cpm > .circuit-intern").each(function(
      ii,
      obj
    ) {
      intern[obj.id] = obj;
      obj.style.height = "2.5%";
      obj.style.width = "2%";
      switch (obj.id[0]) {
        case "c":
          obj.style.color = "#EC1C24";
          break;
        case "s":
          obj.style.color = "#FAAF40";
          break;
        default:
      }
    });
    circuitCpm.updateOutputs();
    circuitCpm.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {
      resizeIframe();
    }
  };
}.apply(circuitCpm));

window.addEventListener("load", circuitCpm.init);
window.addEventListener("resize", circuitCpm.resizeFonts);
