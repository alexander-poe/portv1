$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});


var x= 75;
var y = 75;
var dx=5;
var dy=10;
var widthh;
var heightt;
var ctx;
var paddlex;
var paddleh;
var paddlew;

rightDown = false;
leftDown = false;

var canvasMinX;
var canvasMaxX;

function init_mouse() {
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + widthh;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}

$(document).mousemove(onMouseMove);


function init_paddle() {
  paddlex = widthh / 2;
  paddleh = 20;
  paddlew = 75;
}


function init(){
 ctx = $("#canvas")[0].getContext("2d");
 widthh=$("#canvas").width();
 heightt=$("#canvas").height();
 return setInterval(draw, 30);
}

function circle(x, y, r){
  ctx.fillStyle = "#D26777";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
}

function rect(x, y, w, h){
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();

}

function clear(){
	ctx.clearRect(0,0,widthh,heightt);
}

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function initbricks() {
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (widthh/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;

  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

function draw() {
  clear();
  circle(x, y, 10);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, heightt-paddleh, paddlew, paddleh);

  //draw bricks
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING,
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }

  //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }

  if (x + dx > widthh || x + dx < 0)
    dx = -dx;

  if (y + dy < 0)
    dy = -dy;
  else if (y + dy > heightt) {
    if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else
      clearInterval();
  }

  x += dx;
  y += dy;
}

init();
initbricks();
init();
init_paddle();
init_mouse();
initbricks();
