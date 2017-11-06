window.onload=function(){
    var input=document.getElementById("choice");
    var choice;
    var divMe=document.getElementById('Me');
    var divProj=document.getElementById('Proj');
    var divRes=document.getElementById('Resume');
    var btn=document.getElementById('clr');
    var btn1=document.getElementById('redir');
    function select (div){

        div.style.position="relative";

        div.style.visibility="visible";
        div.style.opacity=1;

    }
    btn.addEventListener("click",function () {
        divMe.style.position="absolute";
        divMe.style.visibility="hidden";
        divMe.style.opacity=0;
        divProj.style.position="absolute";
        divProj.style.visibility="hidden";
        divProj.style.opacity=0;
        divRes.style.position="absolute";
        divRes.style.visibility="hidden";
        divRes.style.opacity=0;
    })
    btn1.addEventListener("click",function () {
        select(divMe);
        select(divProj);
        select(divRes);
    })
    input.addEventListener("input",function(){
        choice=input.value;
        switch (choice.charAt(0).toUpperCase()) {
            case 'A':
                select(divMe);
                break;
            case 'P':
                select(divProj);
                break;
            case 'R':
                select(divRes);
                break;
            default:
                if(choice.charAt(0)==='')
                    document.getElementById('checker').innerText="";
                else
                    document.getElementById('checker').innerText = "Invalid Input";

        }});

}