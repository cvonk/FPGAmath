// 4-bit carry-save multiplier
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

// carry-save multiplier Name Space (uses 'this' as a Namespace Proxy)
var circuitCsm = {};
(function() {
var queueDftDelay = 350; // msec
  let input = {};
  let output = {};
  let intern = {};

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
    for (let key in intern) {
      let obj = intern[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
  };

  this.toggle = function(obj) {
    obj = obj || window.event;
    obj.innerHTML = (Number(obj.innerHTML) + 1) % 2;
    circuitCsm.updateOutputs();
  };

  this.init = function() {
    jQuery(".circuit-container#circuit-csm > .circuit-input").each(function(
      ii,
      obj
    ) {
      input[obj.id] = obj;
      obj.onclick = function() {
        circuitCsm.toggle(this);
      };
      obj.style.height = "3.5%";
      obj.style.width = "2.5%";
      obj.style.borderColor = "#00ADEE";
    });
    jQuery(".circuit-container#circuit-csm > .circuit-output").each(function(
      ii,
      obj
    ) {
      output[obj.id] = obj;
      obj.style.height = "3.5%";
      obj.style.width = "2.5%";
    });
    jQuery(".circuit-container#circuit-csm > .circuit-intern").each(function(
      ii,
      obj
    ) {
      intern[obj.id] = obj;
      obj.style.height = "2.5%";
      obj.style.width = "2%";
      switch (obj.id[0]) {
        case "c":
          if (obj.id[1] - 4 === 0) {
            obj.style.color = "#EC1C24";
          } else {
            obj.style.color = "#00A551";
          }
          break;
        case "s":
          obj.style.color = "#FAAF40";
          break;
        default:
      }
    });
    circuitCsm.updateOutputs();
    circuitCsm.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {
      resizeIframe();
    }
  };

  // creates a two dimentional array
  this.create2DArray = function(dim1, dim2) {
    var arr = Array(dim1);
    for (var ii = 0; ii < dim1; ii++) {
      arr[ii] = Array(dim2);
    }
    return arr;
  };

  // UI changes are first queued, and then played back while respecting the specified delays
  this.updateOutputs = function() {
    let len = Object.keys(input).length / 2;
    let x = Array(len);
    let y = Array(len);
    let c = circuitCsm.create2DArray(len + 1, len);
    let s = circuitCsm.create2DArray(len + 1, len);
    for (ii = 0; ii < len; ii++) {
      x[ii] = +input["x" + ii].innerHTML;
      y[ii] = +input["y" + ii].innerHTML;
    }
    for (ii = 0; ii < len + 1; ii++) {
      for (jj = 0; jj < len; jj++) {
        var xi = ii < len ? x[jj] : jj > 0 ? c[len][jj - 1] : 0;
        var yi = ii < len ? y[ii] : 1;
        var si = ii > 0 && jj < len - 1 ? s[ii - 1][jj + 1] : 0;
        var ci = ii > 0 ? c[ii - 1][jj] : 0;
        s[ii][jj] = si ^ (xi && yi) ^ ci ? 1 : 0;
        c[ii][jj] = (si && xi && yi) || (ci && si ^ (xi && yi)) ? 1 : 0;
        circuitQueue.insert(intern["c" + ii + "" + jj], c[ii][jj], jj === 0 || ii === len ? queueDftDelay : 0);
        circuitQueue.insert(intern["s" + ii + "" + jj], s[ii][jj], 0);
        if (ii === len) {
          circuitQueue.insert( output["p" + (len + jj)], s[ii][jj], 0);
        } else {
          if (jj === 0) {
            circuitQueue.insert(output["p" + ii], s[ii][jj], 0);
          }
        }
      }
    }
    circuitQueue.insert( output["p" + 2 * len], c[len][len - 1], 0 );
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays
  };
}.apply(circuitCsm));

window.addEventListener("load", circuitCsm.init);
window.addEventListener("resize", circuitCsm.resizeFonts);
