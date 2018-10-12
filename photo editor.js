var button;
var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var button8;
var button9;
var button10;
var imgwidth;
var imgheight;
var slider;
var slider1;
var counter=0;
var input;
var img;
imgX=300;
imgY=20;
painting=false;
var moveimage;
var current =[];
var previous=[];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  loadPixels();
  slider=createSlider(-100, 100)
  slider.position(40,180)
  slider.style('width','80px')
  slider1=createSlider(-100, 100)
  slider1.position(40,265)
  slider1.style('width','80px')
  button = createButton("change dimensions");
  button.position(40, 80);
  button.mousePressed(change_dim1);
  button1 = createButton("blue filter");
  button1.position(40, 100);
  button1.mousePressed(blue_filter);
  button2 = createButton("invert color");
  button2.position(40, 160);
  button2.mousePressed(invert_color);
  button3 = createButton("change brightness");
  button3.position(40, 205);
  button3.mousePressed(change_brightness);
  button4 = createButton("crop");
  button4.position(40, 225);
  button4.mousePressed(crop_image);
  button5 = createButton("red filter");
  button5.position(40, 120);
  button5.mousePressed(red_filter);
  button6 = createButton("green filter");
  button6.position(40, 140);
  button6.mousePressed(green_filter);
  button7 = createButton("grey scale");
  button7.position(40, 245);
  button7.mousePressed(greyscale);
  button9 = createButton("change contrast");
  button9.position(40, 290);
  button9.mousePressed(change_contrast);
  button10 = createButton("draw on image");
  button10.position(40, 310);
  button10.mousePressed(drawing);
  button11 = createButton("flip image");
  button11.position(40, 330);
  button11.mousePressed(flip_image);
  input = createFileInput(handleFile);
  input.position(40, 20);
  inp1 = createInput("height");
  inp2 = createInput("width");
  inp1.position(40, 40);
  inp2.position(40, 60);
}
function change_dim1() {
  background(255);
  imgheight = inp1.value();
  imgwidth = inp2.value();
  redraw();
}
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w, h);
  width = w;
  height = h;
};
//Fix no file chosen bug

function draw() {
  if (img) {
    img.loadPixels();
    image(img, imgX, imgY, imgwidth, imgheight);
    if (mouseIsPressed)
    line(mouseX,mouseY,prevx,prevy);    
    prevx=mouseX;
    prevy=mouseY;
    if(moveimage)
    move();  
    
  }
  
}
function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = loadImage(file.data, (loaded)=>{

      imgwidth=img.width;
      imgheight=img.height;
    });

    img.loadPixels();
  }
}
function invert_color() {
  img.loadPixels();// to load image pixels into an array named pixels[]
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x + y * img.width) * 4;
      img.pixels[loc] = 255-img.pixels[loc]
      img.pixels[loc+1] = 255-img.pixels[loc+1]
      img.pixels[loc+2] = 255-img.pixels[loc+2]
    }
  }
  img.updatePixels();// to update image pixels
}
function blue_filter() {
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x + y * img.width) * 4;
      img.pixels[loc+2] = constrain(img.pixels[loc+2] + noise(loc+2)*50, 0, 255);//noise function gives random values
    }
  }
img.updatePixels();
}
function red_filter() {
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x + y * img.width) * 4;
      img.pixels[loc] = constrain(img.pixels[loc] + noise(loc)*50, 0, 255);
    }
  }
img.updatePixels();
}
function green_filter() {
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x + y * img.width) * 4;
      img.pixels[loc+1] = constrain(img.pixels[loc+1] + noise(loc+1)*50, 0, 255);
    }
  }
img.updatePixels();
}
function change_brightness(){
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x + y * img.width) * 4;
      var val= slider.value()//returns the value of the slider
      var r = img.pixels[loc];
      var g = img.pixels[loc+1];
      var b = img.pixels[loc+2];
      var adjust = val;
      r+=adjust
      g+=adjust
      b+=adjust 
      r=constrain(r, 0, 255);
      g=constrain(g,0,255);// to limit the value of variable in the range 0 to 255
      b=constrain(b,0,255);// color ki range is from 0-255
      //c = color(r,g,b);
      img.pixels[loc] = r;
      img.pixels[loc+1] = g;
      img.pixels[loc+2] = b;
      img.pixels[loc+3] = 255;
    }
  }img.updatePixels()
}
function greyscale(){
  img.loadPixels()
  for(var x=0;x<img.width;x++){
    for(var y =0;y<img.height;y++){
      var loc = (x + y * img.width) * 4;//equivalent to the address formula in 2d matrix
      var avg=(img.pixels[loc]+img.pixels[loc+1]+img.pixels[loc+2])/3;
      img.pixels[loc]= avg;
      img.pixels[loc+1]= avg;
      img.pixels[loc+2]=avg;

    }
  }
  img.updatePixels();
}
function move(){
    if (((mouseX>imgX)&&(mouseX<imgX+imgwidth))&&((mouseY>imgY)&&(mouseY<imgY+imgheight))){//to check of the position of the mouse if it is inside the image
      if(mouseIsPressed){//mouseIsPressed function checks if mouse is pressed
      moveimage=1;
      background(255)    
      imgX=mouseX-imgwidth/2;//center coordinate
      imgY=mouseY-imgheight/2;
    }
  }
}

function change_contrast(){
  img.loadPixels();
  var val=slider1.value();
  for(var x=0;x<img.width;x++){
    for(var y=0;y<img.height;y++){
      var loc = (x + y * img.width) * 4;
      if(img.pixels[loc]<125)
        img.pixels[loc]-=val;
      else
        img.pixels[loc]+=val;
      if(img.pixels[loc+1]<125)
        img.pixels[loc+1]-=val;
      else
        img.pixels[loc+1]+=val;
      if(img.pixels[loc+2]<125)
        img.pixels[loc+2]-=val;
      else
        img.pixels[loc+2]+=val;
    }
  }img.updatePixels()
}

function crop_image(){
  //  cropped_image =img.get(350,40,50,50)
  //  counter++;
}

function flip_image(){
  img.loadPixels();
  var i =0;
  for(var x=0;x<img.width/2;x++){
    for(var y=0;y<img.height;y++){
      var loc = (x + y * img.width) * 4;
      //img.width-x+y*img.width
      var swaploc=((img.width-x)+y*img.width)*4;
      
      var temp = img.pixels[loc];
      var temp1=img.pixels[loc+1];
      var temp2=img.pixels[loc+2]
      img.pixels[loc]=img.pixels[swaploc];
      img.pixels[loc+1]=img.pixels[swaploc+1];
      img.pixels[loc+2]=img.pixels[swaploc+2];
      //img.pixels[imgwidth-loc]=img.pixels[loc-i%4];
      //img.pixels[loc-i%4]=temp

      img.pixels[swaploc]=temp;
      img.pixels[swaploc+1]=temp1;
      img.pixels[swaploc+2]=temp2;
      i++
    }
  }img.updatePixels()

  //Go left and right
}

function collage(){

}

function drawing(current,previous){
  this.current1;
  this.current2;
  if (((mouseX>imgX)&&(mouseX<imgX+imgwidth))&&((mouseY>imgY)&&(mouseY<imgY+imgheight))){
  if(mouseIsPressed){
    painting=true;
    current1=mouseX;
    current2=mouseY;
    previous.x=current.x;
    previous.y=current.y;
  }
}

}
