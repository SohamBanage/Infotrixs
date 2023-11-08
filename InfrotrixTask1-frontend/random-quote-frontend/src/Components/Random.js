import { useEffect, useState } from "react";

const Random=()=>{
    const[quote,setQuote]=useState({
    text:"Do every act of your life as if it were your last.",
    author:"Marcus Aurelius" 
    });

    useEffect(()=>{ 
        getRandomQuotes();
      });
      
      let quotesArray=[];
      async function getRandomQuotes(){
        const response=await fetch('https://type.fit/api/quotes');
        quotesArray = await response.json();
      }
        const random =() => {
        const select = quotesArray[Math.floor(Math.random()*quotesArray.length)];
        setQuote(select);
      };


      return(
        <>
            <div className='Random-container'>
          <h3>Random Quote Generator</h3>
            <div className='quote'>"{quote?.text}"</div>
            {<div className='auther'>~{quote?.author.split(',')[0]}</div>}
           <button className='button' onClick={()=>{
                random()
            }} >Generate</button>

        </div>
        </>
      )

}
export default Random;