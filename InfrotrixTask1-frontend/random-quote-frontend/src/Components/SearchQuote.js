import { useEffect, useState } from "react";


const SearchQuote=()=>{
    const[quotes, setQuotes] = useState([]);
    const[searchAuthor,setSearchAuthor]=useState('')
    const[filteredQuotes,setFilteredQuotes]=useState([]);
    
    useEffect(() => {
        fetchQuotes();
    }, []);
    
    const fetchQuotes = async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuotes(data);
      } catch (error) {
      console.error('Error fetching quotes:', error);
      }
  };

  useEffect(()=>{
        const filtered=quotes.filter((quote)=>
        quote.author.toLowerCase().includes(searchAuthor.toLowerCase())
        );
        setFilteredQuotes(filtered);
    },[searchAuthor,quotes])

    return(
        <>
         <div className='search-bar'>
            <h2>Search Quote</h2>
            <div className='input-container'>
              <input className='input-tag' type='text' placeholder='Search your author'
            value={searchAuthor}
            onChange={(e)=>setSearchAuthor(e.target.value)}
             />
            </div>
            <div className='quote-list'>
                {filteredQuotes.map((quote,index)=>(
                  <div key={index}>
                      <ul>
                        <li>{quote.text}</li>
                        {/* {<footer>--{quote.author.split(',')[0]}</footer>} */}
                      </ul>
                  </div>
                ))}
             </div>
        </div>
        </>
    )
}
export default SearchQuote;