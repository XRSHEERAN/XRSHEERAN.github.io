//var declaration
var finished=false;
var mode_selector=2;
var judge=0;
var squares=document.querySelectorAll('.clsqr');
var head=document.querySelector('#header');
var menu_mid=document.querySelector('.mid');
var menu_side=document.querySelector('.side');
var ch_ez=document.querySelector('#ch_ez');
var ch_hd=document.querySelector('#ch_hd');
for(var i =0;i<squares.length;i++){
	squares[i].addEventListener('click',function(){
		if(this.style.backgroundColor===judge&&!finished){
		finished=true;
		for(var i =0;i<squares.length;i++){
		squares[i].style.backgroundColor=judge;
		}
		head.style.backgroundColor=judge;
		menu_mid.innerHTML='correct';
		menu_side.innerHTML='Play Again';
	    }
	    else if(!finished){this.style.backgroundColor='#c6baba'}
	});
}
//init the grid
function init(sqrs,mode){
for(var i =0;i<sqrs.length;i++){
	sqrs[i].style.backgroundColor='rgb('+Math.round(Math.random()*255)+', '+Math.round(Math.random()*255)+', '+Math.round(Math.random()*255)+')';

	if(i>5 && mode===0){
		sqrs[i].style.display='none';
	}
	else if(i>5 && mode===1){
		sqrs[i].style.display='block';
	}

}
if(mode===0){
	judge=sqrs[Math.round(Math.random()*5)].style.backgroundColor;
}
else{
	judge=sqrs[Math.round(Math.random()*8)].style.backgroundColor;
}
head.innerHTML=judge;
menu_side.innerHTML="new Color";
}
//ez_mode,mode_selector is 0
ch_ez.addEventListener('click',function(){
if(mode_selector===0||finished){
	if(finished){
		head.innerHTML='Game finished, please click play again';
	}
	else{
		head.style.color='red';
		head.innerHTML='U R already in EZ Mode'
		
		setTimeout("head.style.color='black';head.innerHTML=judge",1000);
	}
}
else{
	mode_selector=0;
	init(squares,mode_selector);
	ch_ez.classList.add('selected');
	ch_hd.classList.remove('selected');
	ch_ez.classList.remove('unselected');
	ch_hd.classList.add('unselected');
}	
});

//hard mode button implementation
ch_hd.addEventListener('click',function(){
if(mode_selector===1||finished){
	if(finished){
		head.innerHTML='Game finished, please click play again';
	}
	else{
		head.style.color='red';
		head.innerHTML='U R already in Hard Mode'
		
		setTimeout("head.style.color='black';head.innerHTML=judge",1000);
	}
}
else{
	mode_selector=1;
	init(squares,mode_selector);
	ch_ez.classList.remove('selected');
	ch_hd.classList.add('selected');
	ch_ez.classList.add('unselected');
	ch_hd.classList.remove('unselected');
}	
});

function strt_msg(){
	menu_mid.innerHTML='ready?';
	menu_mid.style.backgroundColor='#efe63e';
	setTimeout("menu_mid.innerHTML='started';menu_mid.style.backgroundColor='#89b9ba';",1000);
}
//implement play Again
menu_side.addEventListener('click',function(){
	
	if(mode_selector===0){
		if (finished) {
		strt_msg();
		menu_side.innerHTML='New Color';
		finished=false;
		}
		mode_selector=1;
		ch_ez.click();
	}
	else{
		if (finished) {
		strt_msg();
		menu_side.innerHTML='New Color';
		finished=false;
		}
		mode_selector=0;
		ch_hd.click();
	}

});
//game setup
ch_ez.click();
strt_msg();