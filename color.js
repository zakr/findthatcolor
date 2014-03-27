var EventUtil = {

  addHandler: function(element, type, handler){
    if (element.addEventListener){
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent){
      element.attachEvent("on" + type, handler);
    } else {
      element[ "on" + "type" ] = handler;
    }
  },

  removeHandler: function(element, type, handler){
    if (element.removeEventListener) {
       element.removeEventListener(type, handler, false);
    } else if (element.detachEvent){
       element.detachEvent("on" + type, handler);
    } else {
      element[ "on" + "type" ] = null;
    }
  }
}


window.onload = function(){

	var r = 0;
    var g = 0;
    var b = 0;

    function reset(){
      document.getElementById('toFind').style.backgroundColor = randomColor();

      document.getElementById('yourColor').style.backgroundColor = 'rgb(0,0,0)';

      document.getElementById('result').innerHTML = "";
      document.getElementById('resultText').innerHTML = "";
      document.getElementById('helpText').innerHTML = "";

      r = 0;
      g = 0;
      b = 0;

      // document.getElementById('red').innerHTML = r;
      // document.getElementById('green').innerHTML = g;
      // document.getElementById('blue').innerHTML = b;
    }

    reset();

    function setColor(){
     var color = '#' + padZeros(r.toString(16),2) + padZeros(g.toString(16),2) + padZeros(b.toString(16),2);
     document.getElementById('yourColor').style.backgroundColor = color;

      // document.getElementById('red').innerHTML = r;
      // document.getElementById('green').innerHTML = g;
      // document.getElementById('blue').innerHTML = b;
    }

    function randomColor(){
      var color = (Math.random()*0xFFFFFF<<0).toString(16);
      color = '#' + padZeros(color,6);
      return color;
    }

    function resultText(score){
      if(score === 200000){
        return "You must have cheated!";
      }
      if(score > 199900){
        return "Some kind of color genius!";
      }
      if(score > 199500){
        return "You're pretty good at this";
      }
      if(score > 198900){
        return "So close! Yet... not close enough";
      }
      if(score > 198000){
        return "Good, but not great";
      }
      if(score > 197000){
        return "Meh, I guess you're alright";
      }
      if(score > 195000){
        return "You need a little practice";
      }
      if(score > 190000){
        return "You need a lot of practice";
      }
      if(score > 180000){
        return "You're terrible at this!";
      }
      if(score > 150000){
        return "You might as well give up at this point";
      }
      if(score > 100000){
        return "Are you color-blind, or what?";
      }
      return "You're bad and you should feel bad";
    }

    document.getElementById('found').onclick = function(){
      var yours = document.getElementById('yourColor').style.backgroundColor;
      var actual = document.getElementById('toFind').style.backgroundColor;
      yours = rgb2hex(yours);
      actual = rgb2hex(actual);
      var score = 200000 - computeDistance(yours,actual);

      document.getElementById('result').innerHTML = "Score: " + score;
      document.getElementById('resultText').innerHTML = resultText(score);
      document.getElementById('helpText').innerHTML = helpText(yours, actual);
    };

    document.getElementById('newColor').onclick = reset;

    document.getElementById("redJumpBackward").onclick = function (){
       r -= 16;
      if(r < 0){
        r = 0;
      }
      setColor();
    };
    document.getElementById("redStepBackward").onclick = function (){
       r -= 1;
      if(r < 0){
        r = 0;
      }
      setColor();
    };
    document.getElementById("redStepForward").onclick = function (){
       r += 1;
      if(r > 255){
        r = 255;
      }
      setColor();
    };
    document.getElementById("redJumpForward").onclick = function (){
       r += 16;
      if(r > 255){
        r = 255;
      }
      setColor();
    };


    document.getElementById("greenJumpBackward").onclick = function (){
       g -= 16;
      if(g < 0){
        g = 0;
      }
      setColor();
    };
    document.getElementById("greenStepBackward").onclick = function (){
       g -= 1;
      if(g < 0){
        g = 0;
      }
      setColor();
    };
    document.getElementById("greenStepForward").onclick = function (){
       g += 1;
      if(g > 255){
        g = 255;
      }
      setColor();
    };
    document.getElementById("greenJumpForward").onclick = function (){
       g += 16;
      if(g > 255){
        g = 255;
      }
      setColor();
    };


    document.getElementById("blueJumpBackward").onclick = function (){
       b -= 16;
      if(b < 0){
        b = 0;
      }
      setColor();
    };
    document.getElementById("blueStepBackward").onclick = function (){
       b -= 1;
      if(b < 0){
        b = 0;
      }
      setColor();
    };
    document.getElementById("blueStepForward").onclick = function (){
       b += 1;
      if(b > 255){
        b = 255;
      }
      setColor();
    };
    document.getElementById("blueJumpForward").onclick = function (){
       b += 16;
      if(b > 255){
        b = 255;
      }
      setColor();
    };

    function padZeros(str,len){
      while(str.length < len){
        str = "0" + str; 
      }
      return str;
    }

    function computeDistance(color1, color2){
      var r = parseInt(color1.substr(1,2), 16);
      var g = parseInt(color1.substr(3,2), 16);
      var b = parseInt(color1.substr(5,2), 16);

      var r1 = parseInt(color2.substr(1,2), 16);
      var g1 = parseInt(color2.substr(3,2), 16);
      var b1 = parseInt(color2.substr(5,2), 16);

      return Math.pow(Math.abs(r1-r),2) + Math.pow(Math.abs(g1-g),2) + Math.pow(Math.abs(b1-b),2);
    }

    function helpText(yours, actual){
      var rY = parseInt(yours.substr(1,2), 16);
      var gY = parseInt(yours.substr(3,2), 16);
      var bY = parseInt(yours.substr(5,2), 16);

      var rA = parseInt(actual.substr(1,2), 16);
      var gA = parseInt(actual.substr(3,2), 16);
      var bA = parseInt(actual.substr(5,2), 16);

      var furthest = Math.max(Math.abs(rY-rA),Math.abs(gY-gA),Math.abs(bY-bA));

      if(Math.abs(rY-rA) === furthest){
        if(rY > rA){
          return "Too Much Red";
        }
        if(rA > rY){
          return "Not Enough Red";
        }
        return "I think you won...";
      }

      if(Math.abs(gY-gA) === furthest){
        if(gY > gA){
          return "Too Much Green";
        }
        if(gA > gY){
          return "Not Enough Green";
        }
        return "I think you won...";
      }

      if(Math.abs(bY-bA) === furthest){
        if(bY > bA){
          return "Too Much Blue";
        }
        if(bA > bY){
          return "Not Enough Blue";
        }
        return "I think you won...";
      }
    }

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

}