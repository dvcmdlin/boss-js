function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition(showPosition);
  } catch {
    x.innerHTML = err;
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("demo").innerHTML = this.responseText;
  }
  xhttp.open("GET", "../txt/tst.txt");
  xhttp.send();
}

function loadDoc1() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "../txt/tst.txt");
  xhttp.send();
}

function loadDoc2() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("demo").innerHTML = this.responseText;
  }
  xhttp.open("POST", "demo_post2.asp");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("fname=Henry&lname=Ford");
}


function invertColor() {
  var pixels=ctx.getImageData(0, 0, cvs.width, cvs.height); // ImageData 物作
  var data=pixels.data;//一個像素占據4個資料(bytes)r,g,b,a(節圍0~255)

  for (var i=0;i<data.length;i+=4){    
    data[i]=255-data[i];//红
    data[i+1]=255-data[i+1];//11綠
    data[i+2]=255-data[i+2];//11篮=255-data[i];1//红
  }
  ctx.putImageData(pixels,0,0);
}


function myCanvas() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("scream");
  ctx.drawImage(img,10,10);
}


function loadFile(input){
  
  // cvs = document.getElementById("myCanvas");
  // ctx = cvs.getContext("2d");
  var file=input.files[0];
  var src=URL.createObjectURL(file);
  var img=new Image();
  img.src=src;
  img.onload=function(){
    var rt=img.height/img.width ;
    cvs.width=600;
    cvs.height=cvs.width*rt;  
    ctx.drawImage(this,0,0,cvs.width,cvs.height)
  };
}

function saveFile(){
  var link=document.getElementById("download");
  link.download="image.jpg";
  link.href=cvs.toDataURL("image/jpeg")
  link.click();
}

function showBiggerRedBox(params) {

  var box=document.getElementById("box");
  var styles = window.getComputedStyle(box);
  var size=styles.getPropertyValue("width");
  size=parseInt(size);

  var alm = window.setInterval(function() {
    if (size >= 300){
      window.clearInterval(alm);
      return;
    }

    size+=2;  
    box.style.width=size+"px";
    box.style.height=size+"px";
  },20);

}


function CreateSVG() {
 
  svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
  svgElem.setAttributeNS(null, "width", boxWidth);
  svgElem.setAttributeNS(null, "height", boxHeight);
  svgElem.style.display = "block";

  var g = document.createElementNS(xmlns, "g");
  svgElem.appendChild(g);
  g.setAttributeNS(null, 'transform', 'matrix(1,0,0,-1,0,300)');

  // draw linear gradient
  var defs = document.createElementNS(xmlns, "defs");
  var grad = document.createElementNS(xmlns, "linearGradient");
  grad.setAttributeNS(null, "id", "gradient");
  grad.setAttributeNS(null, "x1", "0%");
  grad.setAttributeNS(null, "x2", "0%");
  grad.setAttributeNS(null, "y1", "100%");
  grad.setAttributeNS(null, "y2", "0%");
  var stopTop = document.createElementNS(xmlns, "stop");
  stopTop.setAttributeNS(null, "offset", "0%");
  stopTop.setAttributeNS(null, "stop-color", "#ff0000");
  grad.appendChild(stopTop);
  var stopBottom = document.createElementNS(xmlns, "stop");
  stopBottom.setAttributeNS(null, "offset", "100%");
  stopBottom.setAttributeNS(null, "stop-color", "#0000ff");
  grad.appendChild(stopBottom);
  defs.appendChild(grad);
  g.appendChild(defs);

  // draw borders
  var coords = "M 0, 0";
  coords += " l 0, 300";
  coords += " l 300, 0";
  coords += " l 0, -300";
  coords += " l -300, 0";

  var path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, 'stroke', "#000000");
  path.setAttributeNS(null, 'stroke-width', 10);
  path.setAttributeNS(null, 'stroke-linejoin', "round");
  path.setAttributeNS(null, 'd', coords);
  path.setAttributeNS(null, 'fill', "url(#gradient)");
  path.setAttributeNS(null, 'opacity', 1.0);
  g.appendChild(path);

  var svgContainer = document.getElementById("svgContainer");
  svgContainer.appendChild(svgElem);
  
  // var svg = document.getElementById("svg");
  // svg.appendChild(svgElem);
}
function createSvgElement(tagname,attrs){
  var ele=document.createElementNS(xmlns,tagname)
  for(var name in attrs){
      ele.setAttribute(name,attrs[name]);
  }
  return ele;
}

function mouseDragAndDropSvg(e){

  var x=e.clientX;
  var y=e.clientY;
  var bounding=this.getBoundingClientRect();
  x=x-bounding.left;
  y=y-bounding.top;
              
  var line =createSvgElement("line",{
    "x1":x,"y1":y,"x2":x,"y2":y,
    "stroke":"red","stroke-width":2
  });
  this.appendChild(line);

  var drag=function(e){
    line.setAttribute("x2",e.clientX-bounding.left);
    line.setAttribute("y2",e.clientY-bounding.top);
  };
  
  var drop=function(){
    document.removeEventListener("mousemove",drag);
    document.removeEventListener("mouseup",drop);
  };
  document.addEventListener("mousemove",drag);
  document.addEventListener("mouseup",drop);

}

function mouseDownSvg(e){

  var x=e.clientX;
  var y=e.clientY;
  var bounding=this.getBoundingClientRect();

  x=x-bounding.left;
  y=y-bounding.top;
   

  var rect =createSvgElement("rect",{
    "x":x,"y":y,
    "width":100,"height":100,
    "fill":"green"
  });
this.appendChild(rect);

}
function mySortArrayFunction(arr) {
  for (let i = arr.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = arr[i]
    arr[i] = arr[j]
    arr[j] = k
  }
  document.getElementById("demo").innerHTML = arr;
}

function myArrayMax(arr) {
  let len = arr.length;
  let max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}

function myArrayMin(arr) {
  let len = arr.length;
  let min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
}


/* 
This JavaScript function always returns a random number 
between min and max (both included): */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function cnt () {
  let counter = 0;
  return function () {counter += 1; return counter;}
};

