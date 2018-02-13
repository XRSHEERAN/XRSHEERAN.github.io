function setup() { "use strict";
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var m4 = twgl.m4;

    function moveToTx(x,y,z,Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.moveTo(locTx[0]+400,-locTx[1]+250);
    }

    function lineToTx(x,y,z,Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.lineTo(locTx[0]+400,-locTx[1]+250);
    }

    function drawAxis(Tx){
        //y red
        moveToTx(0,-100,0,Tx);
        lineToTx(0,100,0,Tx);
        context.strokeStyle="#e05555";
        context.stroke();
        //z yellow
        context.beginPath();
        moveToTx(0,0,-100,Tx);
        lineToTx(0,0,100,Tx);
        context.strokeStyle="#eef4ad";
        context.stroke();
        context.beginPath();
        //x blue
        moveToTx(-100,0,0,Tx);
        lineToTx(100,0,0,Tx);
        context.strokeStyle="#596acc";
        context.stroke();
    }

    //x,y,z three vertices (array)
    function triangle (x,y,z,eye){
        this.x=x;
        this.y=y;
        this.z=z;
        this.clr="";
        this.center=[(x[0]+y[0]+z[0])/3,(x[1]+y[1]+z[1])/3,(x[2]+y[2]+z[2])/3];
        this.dist=Math.pow(this.center[0]-eye[0],2)+Math.pow(this.center[1]-eye[1],2)+Math.pow(this.center[2]-eye[2],2);
    }
    //sort the distance
    function quickSort(triList) {
        if (triList.length < 2) {
            return triList;
        }
        var pivot = triList[triList.length - 1];
        var Llist = [];
        var Rlist = [];
        for (var i = 0; i < triList.length - 1; i++ ) {
            if (triList[i].dist > pivot.dist) {
                Llist.push(triList[i]);
            } else {
                Rlist.push(triList[i]);
            }
        }
        return quickSort(Llist).concat(pivot).concat(quickSort(Rlist));
    }
    function drawTriangle(tri,Tx,nfill,clr){
        context.beginPath();
        moveToTx(tri.x[0],tri.x[1],tri.x[2],Tx);
        lineToTx(tri.y[0],tri.y[1],tri.y[2],Tx);
        lineToTx(tri.z[0],tri.z[1],tri.z[2],Tx);
        context.closePath();

        if(nfill){
            context.stroke();
        }
        else{
            context.fillStyle=clr;
            context.fill();
        }

    }

    function colorGen(r,g,b,inc,num){
        var clr=[];
        for(var i=0;i<num;i++){
            var rd=r+i*inc;
            var gr=g+i*inc;
            var bl=b+i*inc;
            clr.push("rgb("+rd+", "+gr+", "+bl+")");
        }
        return clr;
    }
    var angle1=0;
    var angle3=0

    function drawEnergyGem(center,eye){

        var v1=[center[0]+40*Math.sin(2*angle1),center[1],center[2]+40*Math.cos(2*angle1)];
        var v2=[center[0]+40*Math.sin(2*angle1+Math.PI/2),center[1],center[2]+40*Math.cos(2*angle1+Math.PI/2)];
        var v3=[center[0]+40*Math.sin(2*angle1+Math.PI),center[1],center[2]+40*Math.cos(2*angle1+Math.PI)];
        var v4=[center[0]+40*Math.sin(2*angle1+Math.PI*3/2),center[1],center[2]+40*Math.cos(2*angle1+Math.PI*3/2)];
        var v5=[center[0],center[1]+50,center[2]];
        var v6=[center[0],center[1]-50,center[2]];

        var tri=[];
        tri.push(new triangle(v5,v1,v2,eye));
        tri.push(new triangle(v5,v3,v2,eye));
        tri.push(new triangle(v5,v3,v4,eye));
        tri.push(new triangle(v5,v1,v4,eye));
        tri.push(new triangle(v6,v1,v2,eye));
        tri.push(new triangle(v6,v3,v2,eye));
        tri.push(new triangle(v6,v3,v4,eye));
        tri.push(new triangle(v6,v1,v4,eye));

        var clr=[];
        for(var i=0;i<8;i++){
            var r=130+i*10;
            var g=0+i*10;
            var b=111+i*10;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }

        var k=0;
        tri=quickSort(tri);
        tri.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )
        return tri;

    }

    function drawPyramid(eye,Tx){
        var tri=[];
        var v1=[0,200,0];
        var v2=[200*Math.sin(angle1),0,200*Math.cos(angle1)];
        var v3=[200*Math.sin(angle1+Math.PI/2),0,200*Math.cos(angle1+Math.PI/2)];
        var v4=[200*Math.sin(angle1+Math.PI),0,200*Math.cos(angle1+Math.PI)];
        var v5=[200*Math.sin(angle1+Math.PI*3/2),0,200*Math.cos(angle1+Math.PI*3/2)];

        //pyramid body
        tri.push(new triangle(v1,v2,v3,eye));
        tri.push(new triangle(v1,v4,v3,eye));
        tri.push(new triangle(v1,v4,v5,eye));
        tri.push(new triangle(v1,v2,v5,eye));

        var clr=[];
        for(var i=0;i<6;i++){
            var r=75+i*30;
            var g=46+i*30;
            var b=20+i*30;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }
        tri=quickSort(tri);
        var k=0;
        tri.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )
        tri=tri.concat(drawEnergyGem([350*Math.sin(-angle1),0,350*Math.cos(-angle1)],eye));
        tri=tri.concat(drawEnergyGem([350*Math.sin(-angle1+Math.PI/2),0,350*Math.cos(-angle1+Math.PI/2)],eye));
        tri=tri.concat(drawEnergyGem([350*Math.sin(-angle1+Math.PI),0,350*Math.cos(-angle1+Math.PI)],eye));
        tri=tri.concat(drawEnergyGem([350*Math.sin(-angle1+Math.PI*3/2),0,350*Math.cos(-angle1+Math.PI*3/2)],eye));
        return tri;
    }

    function drawGem(center,eye,Tx){
        var v1=[center[0]+30*Math.sin(angle3),center[1],center[2]+30*Math.cos(angle3)];
        var v2=[center[0]+30*Math.sin(angle3+Math.PI/2),center[1],center[2]+30*Math.cos(angle3+Math.PI/2)];
        var v3=[center[0]+30*Math.sin(angle3+Math.PI),center[1],center[2]+30*Math.cos(angle3+Math.PI)];
        var v4=[center[0]+30*Math.sin(angle3+Math.PI*3/2),center[1],center[2]+30*Math.cos(angle3+Math.PI*3/2)];

        var v5=[center[0]+10*Math.sin(angle3),center[1],center[2]+10*Math.cos(angle3)];
        var v6=[center[0]+10*Math.sin(angle3+Math.PI/2),center[1],center[2]+10*Math.cos(angle3+Math.PI/2)];
        var v7=[center[0]+10*Math.sin(angle3+Math.PI),center[1],center[2]+10*Math.cos(angle3+Math.PI)];
        var v8=[center[0]+10*Math.sin(angle3+Math.PI*3/2),center[1],center[2]+10*Math.cos(angle3+Math.PI*3/2)];
        //top
        var v9=[center[0]+10*Math.sin(angle3),center[1]+10,center[2]+10*Math.cos(angle3)];
        var v10=[center[0]+10*Math.sin(angle3+Math.PI/2),10+center[1],center[2]+10*Math.cos(angle3+Math.PI/2)];
        var v11=[center[0]+10*Math.sin(angle3+Math.PI),10+center[1],center[2]+10*Math.cos(angle3+Math.PI)];
        var v12=[center[0]+10*Math.sin(angle3+Math.PI*3/2),10+center[1],center[2]+10*Math.cos(angle3+Math.PI*3/2)];
        //below
        var v13=[center[0]+15*Math.sin(angle3),center[1]-10,center[2]+15*Math.cos(angle3)];
        var v14=[center[0]+15*Math.sin(angle3+Math.PI/2),center[1]-10,center[2]+15*Math.cos(angle3+Math.PI/2)];
        var v15=[center[0]+15*Math.sin(angle3+Math.PI),center[1]-10,center[2]+15*Math.cos(angle3+Math.PI)];
        var v16=[center[0]+15*Math.sin(angle3+Math.PI*3/2),center[1]-10,center[2]+15*Math.cos(angle3+Math.PI*3/2)];

        var tri1=[];
        tri1.push(new triangle(v1,v5,v6,eye));
        tri1.push(new triangle(v1,v2,v6,eye));
        tri1.push(new triangle(v2,v6,v7,eye));
        tri1.push(new triangle(v2,v3,v7,eye));
        tri1.push(new triangle(v3,v4,v8,eye));
        tri1.push(new triangle(v3,v7,v8,eye));
        tri1.push(new triangle(v4,v1,v5,eye));
        tri1.push(new triangle(v4,v8,v5,eye));

        var clr=[];
        for(var i=0;i<8;i++){
            var r=157+i*10;
            var g=2+i*10;
            var b=2+i*10;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }
        var k=0;
        tri1=quickSort(tri1);
        tri1.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )

        var tri2=[];
        tri2.push(new triangle(v1,v13,v14,eye));
        tri2.push(new triangle(v1,v2,v14,eye));
        tri2.push(new triangle(v2,v14,v15,eye));
        tri2.push(new triangle(v2,v3,v15,eye));
        tri2.push(new triangle(v3,v4,v16,eye));
        tri2.push(new triangle(v3,v15,v16,eye));
        tri2.push(new triangle(v4,v1,v13,eye));
        tri2.push(new triangle(v4,v16,v13,eye));

        clr=[];
        for(var i=0;i<8;i++){
            var r=137+i*10;
            var g=138+i*10;
            var b=149+i*10;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }
        k=0;
        tri2=quickSort(tri2);
        tri2.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )
        var tri3=[];
        tri3.push(new triangle(v5,v9,v10,eye));
        tri3.push(new triangle(v5,v6,v10,eye));
        tri3.push(new triangle(v6,v10,v11,eye));
        tri3.push(new triangle(v6,v7,v11,eye));
        tri3.push(new triangle(v7,v8,v12,eye));
        tri3.push(new triangle(v7,v11,v12,eye));
        tri3.push(new triangle(v8,v5,v9,eye));
        tri3.push(new triangle(v8,v12,v9,eye));

        clr=[];
        for(var i=0;i<8;i++){
            var r=172+i*10;
            var g=175+i*10;
            var b=126+i*10;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }
        k=0;
        tri3=quickSort(tri3);
        tri3.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )

        var tri4=[];
        tri4.push(new triangle(v9,v10,v11,eye));
        tri4.push(new triangle(v9,v12,v11,eye));
        tri4.push(new triangle(v13,v14,v15,eye));
        tri4.push(new triangle(v13,v16,v15,eye));

        clr=[];
        for(var i=0;i<4;i++){
            var r=139+i*25;
            var g=140+i*25;
            var b=147+i*25;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }
        k=0;
        tri4=quickSort(tri4);
        tri4.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )
        //child: power gem
        var angle5=-2*angle3;
        var c1=[center[0]+40*Math.sin(angle5),center[1]+40*Math.sin(angle5),center[2]+2*40*Math.cos(angle5)];
        var c2=[center[0]+40*Math.sin(angle5)-5,center[1]-5+40*Math.sin(angle5),center[2]+2*40*Math.cos(angle5)-5];
        var c3=[center[0]+40*Math.sin(angle5)+5,center[1]-5+40*Math.sin(angle5),center[2]+2*40*Math.cos(angle5)-5];
        var c4=[center[0]+40*Math.sin(angle5),center[1]-5+40*Math.sin(angle5),center[2]+2*40*Math.cos(angle5)+5];
        var tri=[];
        tri.push(new triangle(c1,c2,c3,eye));
        tri.push(new triangle(c1,c4,c3,eye));
        tri.push(new triangle(c1,c2,c4,eye));
        tri=quickSort(tri);
        clr=[];
        for(var i=0;i<4;i++){
            var r=132+i*25;
            var g=134+i*25;
            var b=0+i*25;
            clr.push("rgb("+r+", "+g+", "+b+")");
        }
        k=0;
        tri=quickSort(tri);
        tri.forEach(
            function(ele){
                ele.clr=clr[k++];
            }
        )



        return tri.concat(tri1).concat(tri2).concat(tri3).concat(tri4);
    }

    function draw() {
        var nfill=false;
        
        var spd=1;
        var tri=[];
        canvas.width=canvas.width;
        canvas.getContext("2d").scale(0.5,0.5);
        // hack to clear the canvas fast
        context.fillRect(0,0,850,500);
        angle1+=0.001*Math.PI%(2*Math.PI)*spd;
        angle1=angle1%(2*Math.PI);
        angle3+=0.001*Math.PI%(2*Math.PI)*spd;
        angle3=angle3%(2*Math.PI);
        var angle2 = 0.01*Math.PI;
        var axis = [1,1,1];


        var angle4 = 0.01*Math.PI;
        var fov = .1/180*Math.PI;
        //Perspective algorithm.
        var projM = m4.perspective(fov, 1, 0.1, 100);
        var eye=[100+500*Math.cos(angle2),100+200*Math.sin(angle4),100+500*Math.sin(angle2)];

        var target=[0,0,0];
        var up=[0,1,0];
        var Tcamera=m4.inverse(m4.lookAt(eye,target,up));
        Tcamera=m4.multiply(Tcamera,projM);
        var scale=1;
        drawAxis(Tcamera);
        var tri=[];
        tri=tri.concat(drawGem([200*Math.sin(angle1),150,200*Math.cos(angle1)],eye,Tcamera));
        tri=tri.concat(drawPyramid(eye,Tcamera));

        tri=tri.concat(drawGem([-400*Math.sin(angle1),-300,-400*Math.cos(angle1)],eye,Tcamera));
        tri=tri.concat(drawGem([-350*Math.sin(angle1+Math.PI/2),400,-350*Math.cos(angle1+Math.PI/2)],eye,Tcamera));
        tri=tri.concat(drawGem([-400*Math.sin(angle1+Math.PI/2),-200*Math.sin(angle1+Math.PI/2),-400*Math.cos(angle1+Math.PI/2)],eye,Tcamera));
        tri=tri.concat(drawGem([-400*Math.sin(angle1+Math.PI/2),200*Math.sin(angle1+Math.PI/2),-400*Math.cos(angle1+Math.PI/2)],eye,Tcamera));
        tri=tri.concat(drawGem([400*Math.sin(-3*angle1+Math.PI*3/2),200*Math.sin(-3*angle1+Math.PI*3/2),400*Math.cos(-3*angle1+Math.PI*3/2)],eye,Tcamera));
        tri=tri.concat(drawGem([400*Math.sin(-3*angle1+Math.PI*3/2),-200*Math.sin(-3*angle1+Math.PI*3/2),400*Math.cos(-3*angle1+Math.PI*3/2)],eye,Tcamera));

        tri=quickSort(tri);
        tri.forEach(function (ele) {
            drawTriangle(ele,Tcamera,nfill,ele.clr);
        });
        //drawBase(eye,Tcamera);
        //drawcube(0,0,0,100,20,Math.PI/3,Tcamera,eye);
        window.requestAnimationFrame(draw);
    }

    
    window.requestAnimationFrame(draw);

}
window.onload = setup;