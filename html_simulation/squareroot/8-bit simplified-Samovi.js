// 8-bit simplified-Samovi
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


var circuitSss = {}; // 8-bit simplified-Samovi Sqrt() Name Space
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

  this.create2DArray = function(dim1, dim2) {
    var arr = Array(dim1);
    for (var ii = 0; ii < dim1; ii++) {
      arr[ii] = Array(dim2);
    }
    return arr;
  };

  // 2BD: correct that CSMx0 and CSMx1 outputs are all known at the same time
  this.updateOutputs = function() {
    //console.log("update");
    // input signals
    let xLen = Object.keys(input).length;
    let x = Array(xLen);
    for (ii = 0; ii < xLen; ii++) {
      x[ii] = +input["x" + ii].innerHTML;
    }
    // internal signals
    iiMax = Math.ceil(xLen / 2);
    jjMax = Math.ceil(xLen / 2 + 2);
    let b = circuitSss.create2DArray(iiMax, jjMax);
    let d = circuitSss.create2DArray(iiMax, jjMax);
    let d_ = Array(jjMax); // difference, before the multiplexer
    let q = Array(iiMax);

    let $dbgCell = 'DISABLEx10';

    function determineBorrowOut(ii, jj, jjUbound, delay) {
      let bi = jj > 0 ? b[ii][jj - 1] : 0;
      let xi = jj < 2 ? x[xLen - 2 + jj - ii * 2] : ii > 0 ? d[ii - 1][jj - 2] : 0;
      let yi = jj >= 2 ? (jj < jjUbound - 1 ? q[jj - ii + 2] : 0) : jj === 0 ? 1 : 0;
      // circuitQueue.insert( intern["xi" + ii + jj], xi, 0 );
      // circuitQueue.insert( intern["yi" + ii + jj], yi, 0 );
      b[ii][jj] = (!xi && yi) || (bi && !(xi ^ yi)) ? 1 : 0;
      if ($dbgCell == 'x' + ii + jj) {
        console.log('b  = ', xi?0:1, '.', yi, '+ (', bi, '. not(', xi, '^', yi, ') )' );
      }
      circuitQueue.insert( intern["b" + ii + jj], b[ii][jj], (delay === 0 && ii > 0) ? 0 : queueDftDelay );
    }

    function honorOutputSelect(ii, os, jjUbound) {
      for (jj = 0; jj < jjUbound; jj++) {
        let bi = jj > 0 ? b[ii][jj - 1] : 0;
        let xi = jj < 2 ? x[xLen - 2 + jj - ii * 2] : ii > 0 ? d[ii - 1][jj - 2] : 0;
        let yi = jj >= 2 ? (jj < jjUbound - 1 ? q[jj - ii + 2] : 0) : jj === 0 ? 1 : 0;
        d_[jj] = xi ^ yi ^ bi ? 1 : 0; // save for next step        
        d[ii][jj] = (os && xi) || (!os && d_[jj]) ? 1 : 0;
        if ($dbgCell == 'x' + ii + jj) {
          console.log("d' = ", xi, '^', yi, '^', bi, '=', d_[jj])
          console.log('d  = ', os, '.', xi, '+', os?0:1, '.', d_[jj], '=',  d[ii][jj])
      }
        circuitQueue.insert( intern["d" + ii + jj], d[ii][jj], jj===0 ? queueDftDelay : 0 );
      }
      q[iiMax - 1 - ii] = !os ? 1 : 0;
      circuitQueue.insert( output["q" + (iiMax - 1 - ii)], q[iiMax - 1 - ii], queueDftDelay/4 );
    }
    
    for (let jj = 0; jj < 2; jj++) {
      for (let ii = 0; ii < iiMax; ii++) {
        let jjUbound = jjMax - iiMax + ii + 1;
        determineBorrowOut(ii, jj, jjUbound, 0);
      }
    }
    
    for (let ii = 0; ii < iiMax; ii++) {
      let jjUbound = jjMax - iiMax + ii + 1;
      for (let jj = 2; jj < jjUbound; jj++) {
        determineBorrowOut(ii, jj, jjUbound, 1);
      }
      honorOutputSelect(ii, b[ii][jjUbound - 1], jjUbound);
    }
    
    for (jj = 0; jj < jjMax; jj++) {
      circuitQueue.insert( output["r" + jj], d[iiMax - 1][jj], 0 );
    }
    circuitQueue.play();
  };
  
  this.toggle = function(obj) {
    obj = obj || window.event;
    obj.innerHTML = (Number(obj.innerHTML) + 1) % 2;
    circuitSss.updateOutputs();
  };

  this.init = function() {
    console.log("init");
    jQuery(".circuit-container#circuit-sss > .circuit-input").each(function(
      ii,
      obj
    ) {
      input[obj.id] = obj;
      obj.onclick = function() {
        circuitSss.toggle(this);
      };
      obj.style.height = "3.8%";
      obj.style.width = "2.5%";
      switch (obj.id[0]) {
        case "x":
          obj.style.borderColor = "#00A551"; // green
          break;
        case "y":
          obj.style.borderColor = "#EC1C24"; // red
          break;
        default:
      }
    });
    jQuery(".circuit-container#circuit-sss > .circuit-intern").each(function(
      ii,
      obj
    ) {
      intern[obj.id] = obj;
      obj.style.height = "4%";
      obj.style.width = "2%";
      switch (obj.id[0]) {
        case "d":
          obj.style.color = "#FAAF40"; // orange
          break;
        case "b":
          obj.style.color = "black";
          break;
        default:
      }
      if (obj.id[1] == "i" || obj.id[1] == "'") {
        obj.style.color = "black";
        obj.style.opacity = "0.3";
      }
    });
    jQuery(".circuit-container#circuit-sss > .circuit-output").each(function(
      ii,
      obj
    ) {
      output[obj.id] = obj;
      obj.style.height = "3.5%";
      obj.style.width = "2.5%";
    });

    circuitSss.updateOutputs();
    circuitSss.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {  // if running in iFrame
      resizeIframe();
    }
  };
}.apply(circuitSss));

window.addEventListener("load", circuitSss.init);
window.addEventListener("resize", circuitSss.resizeFonts);
