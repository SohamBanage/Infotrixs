import { useEffect, useState } from "react";

const QuoteOfDay=()=>{
    const[dailyQuote,setDailyQuote]=useState("");
    const[dailyQuoteAuth,setDailyQuoteAuth]=useState("");

    useEffect(()=>{
        fetchDailyQuote();
    });

    const fetchDailyQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/today");
          if (!response.ok) 
          {
            throw new Error('Network response was not ok');
          }
        const data = await response.json();
        setDailyQuote(data[0].q);
        setDailyQuoteAuth(data[0].a);
      } catch (error) {
        console.error('Error fetching daily quote:', error);
      } 
    };
    return(
        <>
            <div className='daily-quote'>
                <h2>Quote Of The Day</h2>
                <h3>"{dailyQuote}"</h3>
                <h3>--{dailyQuoteAuth}</h3>
            </div>
        </>
    )
}
export default QuoteOfDay;