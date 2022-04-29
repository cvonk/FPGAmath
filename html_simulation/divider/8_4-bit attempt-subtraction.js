// 4-bit attempt-subtraction divider
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

var circuitAsd = {}; // Attempt-subtraction Divider Name Space
(function() {
  let queueDftDelay = 350; // msec
  var input = {};
  var output = {};
  var intern = {};

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
    circuitAsd.updateOutputs();
  };

  this.init = function() {
    //console.log("init");
    jQuery('.circuit-container#circuit-asd > .circuit-input').each(function(ii, obj) {
      input[obj.id] = obj;
      obj.onclick = function() {
        circuitAsd.toggle(this);
      };
      obj.style.height = "3.0%";
      obj.style.width = "2.5%";
      switch (obj.id[0]) {
        case 'x':
          obj.style.borderColor = "#00A551"; // green
          break;
        case 'y':
          obj.style.borderColor = "#EC1C24"; // red
          break;
        default:
      }
    });
    jQuery('.circuit-container#circuit-asd > .circuit-intern').each(function(ii, obj) {
      intern[obj.id] = obj;
      obj.style.height = "2.5%";
      obj.style.width = "2%";
      switch (obj.id[0]) {
        case 'd':
          obj.style.color = "#FAAF40"; // orange
          break;
        case 'b':
          obj.style.color = "black";
          break;
        default:
      }
    });
    jQuery('.circuit-container#circuit-asd > .circuit-output').each(function(ii, obj) {
      output[obj.id] = obj;
      obj.style.height = "3.5%";
      obj.style.width = "2.5%";
    });

    circuitAsd.updateOutputs();
    circuitAsd.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {  // if running in iFrame
      resizeIframe();
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
    let yLen = Object.keys(input).length / 3;
    let xLen = yLen * 2;
    let x = Array(xLen);
    for (ii = 0; ii < xLen; ii++) {
      x[ii] = +input["x" + ii].innerHTML;
    }
    let y = Array(yLen);
    for (jj = 0; jj < yLen; jj++) {
      y[jj] = +input["y" + jj].innerHTML;
    }
    let b = circuitAsd.create2DArray(xLen, yLen + 1);
    let d = circuitAsd.create2DArray(xLen, yLen);
    let d_ = Array(yLen + 1);
    for (ii = 0; ii < xLen; ii++) {
      // determine borrow-out, and hence output-select
      for (jj = 0; jj < yLen + 1; jj++) {
        let bi = (jj > 0) ? b[ii][jj - 1] : 0;
        let xi = (jj === 0) ? x[xLen - ii - 1] : ((ii > 0) ? d[ii - 1][jj - 1] : 0);
        let yi = jj < yLen ? y[jj] : 0;
        b[ii][jj] = (!xi && yi) || (bi && !(xi ^ yi)) ? 1 : 0;
        d_[jj] = xi ^ yi ^ bi ? 1 : 0; // save for next step
        circuitQueue.insert( intern["b" + ii + jj], b[ii][jj], queueDftDelay );
      }
      // honor output-select (don't subtract if result would be negative)
      for (jj = 0; jj < yLen + 1; jj++) {
        let xi = (jj === 0) ? x[xLen - ii - 1] : ((ii > 0) ? d[ii - 1][jj - 1] : 0);
        let os = b[ii][yLen];
        d[ii][jj] = (os && xi) || (!os && d_[jj]) ? 1 : 0;
        circuitQueue.insert( intern["d" + ii + jj], d[ii][jj], jj == 0 ? queueDftDelay : 0 );
      }
      circuitQueue.insert( output["q" + (xLen - 1 - ii)], !b[ii][yLen] ? 1 : 0, 0 );
    }
    for (jj = 0; jj < yLen + 1; jj++) {
      circuitQueue.insert( output["r" + jj], d[xLen - 1][jj], 0 );
    }
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays
  };
}).apply(circuitAsd);

window.addEventListener('load', circuitAsd.init);
window.addEventListener('resize', circuitAsd.resizeFonts);
