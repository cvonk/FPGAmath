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

var circuitQueue = {};
(function() {
  var queue = [];

  this.insert = function(obj, value, delay) {
    if (obj) {
      queue.push({obj: obj, value:value, delay:delay});
    } else {
      console.error("insert undefined obj");
    }
  };

  this.play = function() {
    while (queue.length && queue[0].delay === 0) {
      let item = queue.shift();
      item.obj.classList.add("flash");
      // hilight the element for 0.5 seconds to indicate that it changed
      if (item.value != item.obj.innerHTML || true) {
        setTimeout(
          function(obj) {
            obj.classList.remove("flash");
          }, 500, item.obj
        );
        item.obj.innerHTML = item.value;
      }
    }
    if (queue.length) {
      let d = queue[0].delay;
      queue[0].delay = 0;
      setTimeout(function() {
        circuitQueue.play();
      }, d);
    }
  };
}.apply(circuitQueue));


    // if running in iFrame
function resizeIframe() {
    if (window != window.top && parent.jQuery.fancybox) {
      let dWidth = jQuery(document).width();
      let dHeight = jQuery(document).height();
      let vpWidth = parent.document.documentElement.clientWidth;
      let vpHeight = parent.document.documentElement.clientHeight;
      scale = vpWidth / dWidth;
      if ( dHeight * scale > vpHeight ) {
         vpHeight = vpHeight * 0.8;
         vpWidth = vpHeight * dWidth / dHeight;
      } else {
         vpWidth = vpWidth * 0.8;
         vpHeight = vpWidth * dHeight / dWidth;
      }
      vpWidth += 30;
      vpHeight += 30;
      parent.jQuery("#fancybox-outer").height(vpHeight);
      parent.jQuery("#fancybox-outer").width(vpWidth);
      parent.jQuery("#fancybox-content").height(vpHeight);
      parent.jQuery("#fancybox-content").width(vpWidth);
      //parent.jQuery.fancybox.resize();
      parent.jQuery.fancybox.center();
    }
}

/*
// overload all innerHTML getter to highlight the DOM element
(function() {
  // store the original getter and setter functions
  var orgFnc = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML")
    .set;

  Object.defineProperty(Element.prototype, "innerHTML", {
    set: function(value) {
      var new_value = value;
      var ret = orgFnc.call(this, new_value);

      this.classList.add("flash");
      setTimeout(
        function(obj) {
          obj.classList.remove("flash");
        },
        500,
        this
      );
      return ret;
    }
  });
})();
*/
