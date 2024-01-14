let boxes=document.querySelectorAll(".box");
// let row1=document.querySelector("#row1");
// let row2=document.querySelector("#row2");
// let row3=document.querySelector("#row3");
// let row4=document.querySelector("#row4");
// let row5=document.querySelector("#row5");
// let row6=document.querySelector("#row6");
let rows=document.querySelectorAll(".row");

let keys=document.querySelectorAll(".key");
// let keyrow1=document.querySelector("#keyrow1");
// let keyrow2=document.querySelector("#keyrow2");
// let keyrow3=document.querySelector("#keyrow3");

let keyrows=document.querySelectorAll(".keyrow");

floatinglabel=document.querySelector("#floatinglabel");

let theme=document.querySelector("#theme");
let body=document.querySelector("body");
let wordleHeading=document.querySelector("#wordleheading");
let themeIcon=document.querySelector("#themeicon");


let currentTheme=false;
theme.addEventListener("click",()=>{  
currentTheme=!currentTheme;
console.log("currentTheme:",currentTheme);  
if(currentTheme==false)
{
    //dark
    for(let box of boxes)
    {
        box.style.border="2px solid #3a3a3c"
        // box.style.backgroundColor="white";
        box.children[0].style.color="white";
    }
    body.style.backgroundColor="#121213";

    for(let key of keys)
    {
        key.style.backgroundColor="#818384";
        key.style.color="#f8f8f8";

    }

    wordleHeading.style.color="white";
    themeIcon.className="fa-regular fa-sun";
    themeIcon.style.color="white";
    floatinglabel.style.backgroundColor="white";
    floatinglabel.style.color="black";
    
}
else{
    //light
    for(let box of boxes)
    {
        box.style.border="2px solid #d3d6da";
        // box.style.backgroundColor="white";
        box.children[0].style.color="black";
    }

    body.style.backgroundColor="#fff";

    for(let key of keys)
    {
        key.style.backgroundColor="#d3d6da";
        key.style.color="black";

    }

    wordleHeading.style.color="black";
    themeIcon.className="fa-regular fa-moon";
    themeIcon.style.color="black";
    floatinglabel.style.backgroundColor="black";
    floatinglabel.style.color="white";
}
});

console.log(boxes);
// console.log(row1);
// console.log(row2);
// console.log(row3);
// console.log(row4);
// console.log(row5);
// console.log(row6);
console.log(rows);

console.log(keys);
// console.log(keyrow1);
// console.log(keyrow2);
// console.log(keyrow3);
console.log(keyrows);




let currentWord="";
let currentrow=rows[0];
let currentbox=-1;
let gameOver=false;

// let previousRow=rows[0];

let theWord="";
// let theWord="WORDS";

async function pickWord(){
    let resp=await fetch("https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase");
    // console.log("resp:",resp);
    let respjson= await resp.json();

    // console.log("respjson",respjson);
    theWord=respjson["0"];
    console.log("theWord:",theWord);
    // console.log(typeof theWord);


}

pickWord();


function findCommons(inputWord){

let truthArr=[0,0,0,0,0];
// let flag=;
for(let i=0;i<5;i++)
{
    for(let j=0;j<5;j++)
    {
        if(inputWord[i]==theWord[j])
        {
            if(i==j)
            {
                truthArr[i]=2;
                break;
            }

            else{
                truthArr[i]=1;
                break;
            }
        }

       
        
        

    }

    
}

console.log("truthArr",truthArr);
return truthArr;


}

// setTimeout(()=>{findCommons("ADIEU");},1000);
let moment=null;
async function isWord(inputWord)
{
    let resp=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
    let respjson=await resp.json();
    console.log(respjson);
    if(respjson["title"]=="No Definitions Found")
    {   console.log("not a word.");
        moment=false;
    }



    else{
        console.log("is a word.");
        moment= true;
    }

}

isWord("clear");

function check(inputWord){

    if(inputWord===theWord)
    {
        return true;
    }

    else 
    {
        return false;
    }

}

let i=0;
function updateBox(){

    

    if(currentbox==4)
    {   
        
    }

    else{
        currentbox++;
    }

    

}

function findKeyIndex(baby){
        let r=0;
        for(let key of keys){
            if(baby.innerText==key.innerText)
            {
                return r;

            }
            r++;
        }
}


keys.forEach((key) => {
    key.addEventListener("click",()=>{
        
        
       if(!gameOver)
       {
        if(key.id!="back"&&key.id!="enter")
        {
           
            updateBox();
            currentrow.children[currentbox].style.animation="enlargeuponinput 0.08s linear 0s 1 normal";
            currentrow.children[currentbox].children[0].innerText=key.innerText;
            if(currentWord.length<5)
            {currentWord=currentWord.concat(key.innerText);}


            setTimeout(()=>{currentrow.children[currentbox].style.animation=""},100);
            
        }

       

        if(key.id=="back")
        {
            currentrow.children[currentbox].children[0].innerText="";
            currentWord=currentWord.slice(0,currentbox);
            if(currentbox>=0)
            {currentbox--;}
        }

        if(key.id=="enter")
        {
            console.log("currentWord:",currentWord);
            
            if(currentWord.length<5)
            {
                console.log("Not Enough Letters.");
                floatinglabel.innerText="Not Enough Letters.";
                floatinglabel.style.animation="fade 1.5s normal 0s 1 none";
    
                setTimeout(()=>{
                    floatinglabel.style.animation="";
                },2000);
    
            }
            
            else{

                let res=check(currentWord);
                if(res)
                {
                    console.log("correct guess. You WON!");
                    let n=0;
                    for(let child of currentrow.children)
                    {
                        child.style.animation=`flip 1s normal ${n*250}ms 1 none`;
                        child.children[0].style.animation=`flip 1s normal ${n*250}ms 1 none`;
    
                        setTimeout(()=>{
                            child.style.backgroundColor="#538D4E";
                            child.style.border="2px solid #538D4E";
                            child.children[0].style.color="white";
                        },(300+n*250));

                        n++;
    
                    }

                    floatinglabel.innerText="You Win";
                    floatinglabel.style.animation="fade 1.5s normal 0s 1 none";
        
                    setTimeout(()=>{
                        floatinglabel.style.animation="";
                    },2000);
                    gameOver=true;
                }
    
                else{


                    isWord(currentWord);
                    console.log("moment:",moment);
                    setTimeout(()=>{
                        if(moment==false)
                        {
                            rows[i].style.animation="wiggleanim 0.7s normal 0s 1 none";
                            console.log("wiggle");
                            setTimeout(()=>{rows[i].style.animation=""},1000);

                            floatinglabel.innerText="Not a word.";
                            floatinglabel.style.animation="fade 1.5s normal 0s 1 none";
                
                            setTimeout(()=>{
                                floatinglabel.style.animation="";
                            },2000);
                        }
    
                    else{
                        let ratingArr=findCommons(currentWord);
                    console.log(ratingArr);
                    let p=0,q=0;
                    for(let child of currentrow.children){

                        child.style.animation=`flip 1s normal ${q*250}ms 1 none`;
                        child.children[0].style.animation=`flip 1s normal ${q*250}ms 1 none`;

                        setTimeout(()=>{
                            let r=findKeyIndex(child.children[0]);
                            child.children[0].style.color="white";
                            if(ratingArr[p]==0)
                        {
                            child.style.backgroundColor="#3A3A3C";
                            child.style.border="#3A3A3C";
                            
                            
                            console.log("r:",r);
                            keys[r].style.backgroundColor="#3A3A3C";
                        }

                        else if(ratingArr[p]==1)
                        {
                            
                            child.style.backgroundColor="#B59F3B";
                            child.style.border="#B59F3B";
                            
                            console.log("r:",r);
                            keys[r].style.backgroundColor="#B59F3B";
                        }

                        else if(ratingArr[p]==2)
                        {
                            child.style.backgroundColor="#538D4E";
                            child.style.border="#538D4E";
                            
                            console.log("r:",r);
                            keys[r].style.backgroundColor="#538D4E";
                            
                        }

                        keys[r].style.color="white";
                        p++;
                        },(300+q*250));

                        
                        q++;

                    }
                    }
    
                    },500);
                    
                    setTimeout(()=>{
                    if(i!=5)
                    {   
                        console.log("inside1");
                        
                            
                                if(moment==true)
                            {
                                console.log("inside2");
                                currentWord="";
                                i++;
                                currentrow=rows[i];
                                currentbox=-1;  
                            }
                            
                       
                       
                        
                        
                    }
    
                    else{
                       console.log("sorry,You LOST :')")
                       gameOver=true;

                       floatinglabel.innerText=`${theWord}`;
                    floatinglabel.style.animation="fade 1.5s normal 0s 1 none";
        
                    setTimeout(()=>{
                        floatinglabel.style.animation="";
                    },2000);
                    }
                    },500);
    
                }
            }
            moment=null;
        }

        console.log("currentrow",currentrow);
        console.log("currentbox",currentbox);
       }
        
    })
  
});




document.addEventListener("keydown",(e)=>{
    
    if(!gameOver)
    {
        console.log(e);
    if(e.keyCode>=65&&e.keyCode<=90&&e.ctrlKey==false){
        updateBox();
        currentrow.children[currentbox].style.animation="enlargeuponinput 0.08s linear 0s 1 normal";
        currentrow.children[currentbox].children[0].innerText=e.key.toUpperCase();
        if(currentWord.length<5)
        {currentWord=currentWord.concat(e.key.toUpperCase());}
        
        setTimeout(()=>{currentrow.children[currentbox].style.animation=""},100);

    }

    if(e.keyCode==13){
        //insert word-check function or produce error label.(since,13 is ASCII for Enter key)
        console.log("currentWord:",currentWord);
        
        if(currentWord.length<5)
        {
            console.log("Not Enough Letters.");
            floatinglabel.innerText="Not Enough Letters.";
            floatinglabel.style.animation="fade 1.5s normal 0s 1 none";

            setTimeout(()=>{
                floatinglabel.style.animation="";
            },2000);

        }
        else{

            let res=check(currentWord);
            if(res)
            {
                console.log("correct guess. You WON!");

                let n=0;
                for(let child of currentrow.children)
                {

                    child.style.animation=`flip 1s normal ${n*250}ms 1 none`;
                    child.children[0].style.animation=`flip 1s normal ${n*250}ms 1 none`;

                    setTimeout(()=>{
                        child.style.backgroundColor="#538D4E";
                        child.style.border="2px solid #538D4E";
                        child.children[0].style.color="white";
                    },(300+n*250));

                    
                    n++;
                    

                }
                gameOver=true;

                floatinglabel.innerText="You Win";
                    floatinglabel.style.animation="fade 1.5s normal 0s 1 none";
        
                    setTimeout(()=>{
                        floatinglabel.style.animation="";
                    },2000);
            }

            else{
                
                isWord(currentWord);
                console.log("moment:",moment);
                setTimeout(()=>{
                    if(moment==false)
                {
                    rows[i].style.animation="wiggleanim 0.7s normal 0s 1 none";
                    console.log("wiggle");
                    setTimeout(()=>{rows[i].style.animation=""},1000);

                    floatinglabel.innerText="Not a word.";
                    floatinglabel.style.animation="fade 1.5s normal 0s 1 none";
        
                    setTimeout(()=>{
                        floatinglabel.style.animation="";
                    },2000);
                }

                else{
                    console.log("no wiggle");

                    let ratingArr=findCommons(currentWord);
                    console.log(ratingArr);
                    let p=0,q=0;
                    for(let child of currentrow.children){

                        child.style.animation=`flip 1s normal ${q*250}ms 1 none`;
                        child.children[0].style.animation=`flip 1s normal ${q*250}ms 1 none`;

                        setTimeout(()=>{
                            child.children[0].style.color="white";
                            let r=findKeyIndex(child.children[0]);
                            if(ratingArr[p]==0)
                        {
                            child.style.backgroundColor="#3A3A3C";
                            child.style.border="#3A3A3C";
                            
                            
                            console.log("r:",r);
                            keys[r].style.backgroundColor="#3A3A3C";
                        }

                        else if(ratingArr[p]==1)
                        {
                            
                            child.style.backgroundColor="#B59F3B";
                            child.style.border="#B59F3B";
                            
                            console.log("r:",r);
                            keys[r].style.backgroundColor="#B59F3B";
                        }

                        else if(ratingArr[p]==2)
                        {
                            child.style.backgroundColor="#538D4E";
                            child.style.border="#538D4E";
                           
                            console.log("r:",r);
                            keys[r].style.backgroundColor="#538D4E";
                        }

                        keys[r].style.color="white";
                        p++;
                        },(300+q*250));

                        
                        q++;

                    }
                }

                },500);
                
                setTimeout(()=>{
                if(i!=5)
                {   
                    console.log("inside1");
                    
                        console.log("inside2");
                        if(moment==true)
                    {
                        currentWord="";
                        i++;
                        currentrow=rows[i];
                        currentbox=-1;  
                    }
                   
                   
                    
                    
                }

                else{
                   console.log("sorry,You LOST :')")
                   gameOver=true;

                   
                }
                },500);


            }
        }

        moment=null;
    }

    if(e.keyCode==8)
    {
        
        currentrow.children[currentbox].children[0].innerText="";
        currentWord=currentWord.slice(0,currentbox);
        if(currentbox>=0)
        {currentbox--;}
        

    }

    console.log("currentrow",currentrow);
    console.log("currentbox",currentbox);
    }


});



