import Custome from './Custome';
import QuoteOfDay from './QuoteOfDay';
import Random from './Random';
import SearchQuote from './SearchQuote';


const Body=()=>{
    return(
        <>
          <QuoteOfDay/>
          <SearchQuote/>
          <Random/>
          <Custome/> 
        </>
    );
}
export default Body;