//var div=createDiv('sidepane');
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
var button11;
var imgwidth;
var imgheight;
var slider;
var slider1;
var counter=0;
var input;
var img;
var cropimage=false;
imgX=500;
imgY=20;
firstclickX=0;
firstclickY=0;
secondclickX=0;
secondclickY=0;
painting=false;
moveimage=0;
var current =[];
var previous=[];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  loadPixels();
  slider=createSlider(-100, 100)
  slider.position(40,230+65)
  slider.class('btn')

  slider.style('width','125px')
  slider1=createSlider(-100, 100)
  slider1.position(40,355+65)
  slider1.class('btn')
  slider1.style('width','125px')
  button = createButton("Change Dimensions");
  button.position(40, 80+65);
  button.class('btn')
  //button.class('fontcolor');
  button.mousePressed(change_dim1);
  button1 = createButton("Blue Filter");
  button1.style('width','125px')
  button1.position(40, 110+65);
  button1.mousePressed(blue_filter);
  button1.class('btn');
  button5 = createButton("Red Filter");
  button5.position(40, 140+65);
  button5.style('width','125px')
  button5.mousePressed(red_filter);
  button5.class('btn')
  button6 = createButton("Green Filter");
  button6.position(40, 170+65);
  button6.style('width','125px')
  button6.class('btn')
  button6.mousePressed(green_filter);
  button2 = createButton("Invert Color");
  button2.position(40, 200+65);
  button2.style('width','125px')
  button2.class('btn')
  button2.mousePressed(invert_color);
  button3 = createButton("Change Brightness");
  button3.position(40, 265+65);
  button3.style('width','125px')
  button3.class('btn')
  button3.mousePressed(change_brightness);
  button4 = createButton("Crop");
  button4.position(40, 295+65);
  button4.style('width','125px')
  button4.class('btn')
  button4.mousePressed(crop_image);
  button7 = createButton("Grey Scale");
  button7.position(40, 325+65);
  button7.style('width','125px')
  button7.class('btn')
  button7.mousePressed(greyscale);
  button9 = createButton("Change Contrast");
  button9.position(40, 390+65);
  button9.style('width','125px')
  button9.class('btn')
  button9.mousePressed(change_contrast);
  button10 = createButton("Draw On Image");
  button10.position(40, 420+65);
  button10.style('width','125px')
  button10.class('btn')
  button10.mousePressed(drawing);
  button11 = createButton("Flip Image");
  button11.position(40, 450+65);
  button11.style('width','125px')
  button11.class('btn')
  button11.mousePressed(flip_image);
  button12 = createButton("Move Image");
  button12.position(40, 480+65);
  button12.style('width','125px')
  button12.class('btn')
  button12.mousePressed(move2);
  input = createFileInput(handleFile);
  input.position(30, 15);
  input.style('width','125px')
  input.class('btn')
  inp1 = createInput("Height");
  inp1.style('width','125px')
  inp2 = createInput("Width");
  inp2.style('width','125px')
  inp1.position(40, 50);
  inp1.class('btn fontcolor')
  inp2.position(inp1.x, 100);
  inp2.class('btn fontcolor')
}
function change_dim1() {
  background(255);
  imgheight = inp1.value();
  imgwidth = inp2.value();
  draw_image(imgX, imgY, imgwidth, imgheight);
  //redraw();
}
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w, h);
  width = w;
  height = h;
}
function draw() {
  if (img) {
    if (cropimage){
      crop_image();
    }
    if(painting){
      drawing()
    }
   
}
  //sconsole.log(moveimage)
  if(moveimage==1)
    move2();

}
function draw_image(imgX, imgY, imgwidth, imgheight)
{

  image(img, imgX, imgY, imgwidth, imgheight);

}
function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = loadImage(file.data, (loaded)=>{

      imgwidth=img.width;
      imgheight=img.height;
      draw_image(imgX, imgY, imgwidth, imgheight);
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
  img.updatePixels();
  draw_image(imgX, imgY, imgwidth, imgheight);
  // to update image pixels
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
draw_image(imgX, imgY, imgwidth, imgheight);
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
draw_image(imgX, imgY, imgwidth, imgheight);
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
draw_image(imgX, imgY, imgwidth, imgheight);
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
      img.pixels[loc] = r;
      img.pixels[loc+1] = g;
      img.pixels[loc+2] = b;
      img.pixels[loc+3] = 255;
    }
  }img.updatePixels()
  draw_image(imgX, imgY, imgwidth, imgheight);
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
  draw_image(imgX, imgY, imgwidth, imgheight);
}
function move2(){
  if(painting)
  painting=false
  moveimage=1;
  if (((mouseX>imgX)&&(mouseX<imgX+imgwidth))&&((mouseY>imgY)&&(mouseY<imgY+imgheight))){//to check of the position of the mouse if it is inside the image
    if(mouseIsPressed){// mouseIsPressed function checks if mouse is pressed
    moveimage=1;
    background(255)    
    imgX=mouseX-imgwidth/2;//center coordinate
    imgY=mouseY-imgheight/2;
    console.log(moveimage)
    draw_image(imgX, imgY, imgwidth, imgheight);
  
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
  draw_image(imgX, imgY, imgwidth, imgheight);
}
function crop_image(){
  cropimage=true;
  if (((mouseX>imgX)&&(mouseX<imgX+imgwidth))&&((mouseY>imgY)&&(mouseY<imgY+imgheight))){
    if (firstclickX==0){
      if(mouseIsPressed){
        firstclickX=mouseX;
        firstclickY=mouseY;
      }
    }
    if(firstclickX!=0&&firstclickY!=0){     
      background(255);
      draw_image(imgX, imgY, imgwidth, imgheight);
      line(firstclickX,firstclickY,firstclickX,mouseY)
      line(firstclickX,firstclickY,mouseX,firstclickY)
      line(mouseX,firstclickY,mouseX,mouseY)
      line(firstclickX,mouseY,mouseX,mouseY)
    }
    if(secondclickX==0&&firstclickX!=0){      
      if(!mouseIsPressed){
        console.log("SECOND CLICK");
        secondclickX=mouseX;
        secondclickY=mouseY;
      }
    }
  }
  if((firstclickX!=0&&firstclickY!=0)&&(secondclickX!=0&&secondclickY!=0))
  image(img,imgX,imgY,imgwidth,imgheight,firstclickX-imgX,firstclickY-imgY,secondclickX-firstclickX,secondclickY-firstclickY);
  
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
      img.pixels[swaploc]=temp;
      img.pixels[swaploc+1]=temp1;
      img.pixels[swaploc+2]=temp2;
      i++
    }
  }img.updatePixels()
  draw_image(imgX, imgY, imgwidth, imgheight);

  //Go left and right
}
function collage(){
}
function drawing(){
  if (moveimage==1)
  moveimage=0;
  painting=true;
  if (((mouseX>imgX)&&(mouseX<imgX+imgwidth))&&((mouseY>imgY)&&(mouseY<imgY+imgheight))){
  if(mouseIsPressed)
    line(mouseX,mouseY,prevX,prevY);
    prevX=mouseX;
    prevY=mouseY
  
}

}
