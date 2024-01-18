let key="2mHEJruvP6YHYsdsZfsuug==RaGHU0dU1pfxxbzP";
let url="https://api.api-ninjas.com/v1/dictionary?word=cat";
async function isWord(inputWord)
{

    const resp=await fetch(url,{
        headers:{'X-Api-Key':key},
    });

    let respjson=await resp.json();
    console.log("valid",respjson.valid);



    

}


isWord();