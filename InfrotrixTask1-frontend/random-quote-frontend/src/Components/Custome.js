import { useEffect, useState } from "react";
import axios from "axios";
const Custome=()=>{

    const[data,setData] = useState([]);
    const [name, setName] = useState("");
    const[quote,setQuote] = useState("");

    useEffect(()=>{
        getdata();
    },[]);

    const getdata=()=>(
        axios.get("http://localhost:5124/api/Users")
        .then((result)=>{
            setData(result.data)
        })
    )

    const handleSave=()=>{
    const url="http://localhost:5124/api/Users";
    const data ={
      "name":name,
      "quote":quote,      
    }
    axios.post(url,data)
    .then((result)=>{
      getdata();      
    })
  }
  const handelDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") === true) {
      axios.delete(`http://localhost:5124/api/Users/${id}`)
      .then((result)=>{
        if(result.status === 200)
        {
            getdata();
        }
      })
    }
  };
    return(
        <>
        <div className="custome-container">
         <div className="customs-input-btn">
                <h2>Custome Quotes</h2>
                    <input type="text" 
                        placeholder="Enter Your Name"
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} />
                    
                    <input type="text" 
                        placeholder="Enter Your Quote"
                        value={quote} 
                        onChange={(e)=>setQuote(e.target.value)}/>
                
                <button onClick={()=>handleSave()}>Submit</button>
                
            </div>
            <div className="custome-show">
                {
                 data && data.length > 0
                    ? data.map((item,index)=>{
                        return(
                            <ul key={index}>
                                <li>{item.quote}</li>
                                <li>~{item.name}</li>
                                <button onClick={()=>handelDelete(item.id)} >Delete</button>
                            </ul>
                        );
                    })
                :"loading...."}
            </div>
          </div>
        </>
    )
}
export default Custome;