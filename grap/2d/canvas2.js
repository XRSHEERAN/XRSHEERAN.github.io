//for speed control and rotation
var ang=0;
var ang2=0;
var back=false;
var scl=1;
var spd=1;
var spd2=1;
//setup animation
window.onload=function(){
    document.getElementById("speedControl").addEventListener("input",set1);
    document.getElementById("speedControl2").addEventListener("input",set2);
    //todo: scaling control
    document.getElementById("scaling").addEventListener("input",set3);
    window.requestAnimationFrame(draw);//start animation
};
function set1(){
    spd=document.getElementById("speedControl").value;
}
function set2() {
    spd2=document.getElementById("speedControl2").value;
}
function set3(){
    scl=document.getElementById("scaling").value;
}

//function generating animation
function draw(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.clearRect(0,0,900,700);

    //parent  phase
    ctx.save();
    ctx.translate(400,600);
    ctx.save();//phase before rotate

    //calculate angles of rotations
    ang2=(ang2+Math.PI/360*spd2)%(2*Math.PI);
    if(ang>Math.PI/8)
        back=true;
    if(ang<-Math.PI/8)
        back=false;
    if(!back)
        ang+=Math.PI/360*spd;
    else
        ang-=Math.PI/360*spd;

    //rotate the balance
    ctx.rotate(ang);
    //draw leverage
    ctx.moveTo(-200,0);
    ctx.lineWidth=5;
    ctx.lineTo(200,0);
    ctx.stroke();

    //save balance phase
    ctx.save();
    ctx.beginPath();

    //draw left plate
    ctx.translate(-200,0);
    ctx.rotate(-ang);
    //implementing scaling
    ctx.scale(scl,scl);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-30);
    ctx.moveTo(-50,-30);
    ctx.lineTo(50,-30);
    ctx.stroke();

    //sad face
    ctx.translate(0,-200);
    ctx.beginPath();
    sadFace(0,0);
    //draw car
    ctx.rotate(ang2); //rotating around sad earth
    carBody(80);
    carWheels(-10,60);
    carWheels(10,60);
    ctx.rotate(-2*ang2);//moving the opposite direction
    //draw drone
    drone(0,-100);

    ctx.restore();
    //right child
    ctx.save();
    ctx.beginPath();
    ctx.translate(200,0);
    ctx.scale(1/scl,1/scl); //scaling in opposite direction
    ctx.rotate(-ang);//rotating on the opposite direction
    ctx.moveTo(0,0);
    ctx.lineTo(0,-30);
    ctx.moveTo(-50,-30);
    ctx.lineTo(50,-30);
    ctx.stroke();
    //smile face
    ctx.translate(0,-200);
    ctx.beginPath();
    smileFace(0,0);
    tree(0,50);
    moonSun(0,140);
    ctx.restore();

    //balance seat, the triangle below
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0,0);
    //not rotated
    ctx.restore();
    ctx.moveTo(0,2);
    ctx.lineTo(-15,30);
    ctx.lineTo(15,30);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.restore();
    window.requestAnimationFrame(draw);
}

//draw sadFace
function sadFace(xvar,yvar){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    //outline the face
    ctx.arc(xvar,yvar,50,0,2*Math.PI);
    ctx.fillStyle="#37343e";
    ctx.fill();
    ctx.beginPath();
    //draw the facial gestures
    ctx.moveTo(xvar-25,yvar-10);
    ctx.quadraticCurveTo(xvar-15,yvar+30,xvar-5,yvar-10);
    ctx.moveTo(xvar+25,yvar-10);
    ctx.quadraticCurveTo(xvar+15,yvar+30,xvar+5,yvar-10);
    ctx.moveTo(xvar-10,yvar+30);
    ctx.quadraticCurveTo(xvar,yvar-10,xvar+10,yvar+30);
    ctx.strokeStyle="#ffffff";
    ctx.stroke();
}

//draw smile faces, same as sadface
function smileFace(xvar,yvar){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.arc(xvar,yvar,50,0,2*Math.PI);
    ctx.fillStyle="#60dd64";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(xvar-25,yvar-10);
    ctx.quadraticCurveTo(xvar-15,yvar-30,xvar-5,yvar-10);
    ctx.moveTo(xvar+25,yvar-10);
    ctx.quadraticCurveTo(xvar+15,yvar-30,xvar+5,yvar-10);
    ctx.moveTo(xvar-10,yvar+30);
    ctx.quadraticCurveTo(xvar,yvar+40,xvar+10,yvar+30);
    ctx.strokeStyle="#ffffff";
    ctx.stroke();
}

//draw body of the car
function carBody (yvar) {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.save();
    //upper body
    ctx.fillStyle="#7ac3bc";
    ctx.beginPath();
    //lower body
    ctx.fillRect(-10,yvar,20,10);
    ctx.fillStyle="#c32022";
    ctx.fillRect(-25,yvar-10,50,10);
    ctx.restore();
}

//draw the rotating wheels
function carWheels(xvar,yvar){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.save();
    //rotating wheels
    ctx.translate(xvar,yvar);
    ctx.rotate(ang2);
    ctx.fillStyle="#faff23";
    ctx.fillRect(-5,-5,10,10);
    ctx.beginPath();
    //outline the wheels
    ctx.moveTo(-5,-5);
    ctx.lineTo(5,-5);
    ctx.lineTo(5,5);
    ctx.lineTo(-5,5);
    ctx.closePath();
    ctx.strokeStyle="#070b05";
    ctx.lineWidth=1;
    ctx.stroke();

    ctx.restore();
}

//xvar and yvar are the bottom coordinates
function tree(xvar,yvar) {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.save();
    ctx.lineWidth=15;
    ctx.strokeStyle="#c45720";
    ctx.beginPath();
    ctx.rotate(ang2);
    ctx.moveTo(xvar,yvar);
    ctx.lineTo(xvar,yvar+50);
    //arm
    ctx.lineWidth=5;
    ctx.save();
    ctx.translate(xvar,yvar+35);
    ctx.rotate(ang*1.5); //waving the arms
    //green leaves
    ctx.moveTo(0,0);
    ctx.lineTo(-20,-10);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle="#65c422";
    ctx.arc(-20,-10,7,0,Math.PI*2);
    ctx.fill();
    //restore the canvas
    ctx.restore();
    ctx.restore();
}

//draw moon and sun
function moonSun(xvar,yvar){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.save();
    ctx.beginPath();
    //draw the sun
    ctx.fillStyle="#f9bd21";
    ctx.lineWidth=1;
    ctx.lineWidth=2;
    ctx.strokeStyle="#f9bd21";
    ctx.rotate(-ang2);
    ctx.translate(xvar,yvar);
    ctx.arc(0,0,10,0,Math.PI*2);
    ctx.moveTo(0,-20);
    ctx.lineTo(0,20);
    ctx.moveTo(20,0);
    ctx.lineTo(-20,0);
    ctx.moveTo(-14.2,-14.2);
    ctx.lineTo(14.2,14.2);
    ctx.moveTo(14.2,-14.2);
    ctx.lineTo(-14.2,14.2);
    ctx.stroke();

    //draw the moon. rotate according to the sun
    ctx.rotate(2*ang2);
    ctx.beginPath();
    ctx.moveTo(0,-30);
    ctx.bezierCurveTo(15,-35,15,-45,0,-50);
    ctx.bezierCurveTo(25,-60,25,-20,0,-30);
    ctx.stroke();
    ctx.restore();
}
function drone(xvar,yvar){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    //draw and rotate drone's body
    ctx.save();
    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.translate(xvar,yvar);
    ctx.rotate(ang2*2);
    ctx.moveTo(-20,-20);
    ctx.bezierCurveTo(10,-10,10,10,-20,20);
    ctx.bezierCurveTo(-10,-10,10,-10,20,20);
    ctx.bezierCurveTo(-10,10,-10,-10,20,-20);
    ctx.bezierCurveTo(10,10,-10,10,-20,-20);
    ctx.lineWidth=1;
    ctx.stroke();

    //draw four propellers
    propeller(20,-20);
    propeller(20,20);
    propeller(-20,-20);
    propeller(-20,20);
    ctx.restore();
}

//draw and rotate propellers
function propeller(xvar,yvar){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.save();
    ctx.translate(xvar,yvar);
    ctx.rotate(-ang2*2);
    //propeller
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(17,7,17,-7,0,0);//right
    ctx.bezierCurveTo(7,17,-7,17,0,0);//down
    ctx.bezierCurveTo(-17,7,-17,-7,0,0);//left
    ctx.bezierCurveTo(-7,-17,7,-17,0,0);//right
    ctx.fill();
    ctx.restore();
}