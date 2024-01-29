import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")

  const fetchData = async () => {
    try {
      let api = "https://restcountries.com/v3.1/all";
      const response = await axios.get(api);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, []);

  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      fetchData()
    } else {
     
      const filteredData = data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData);
    }
  };


  const handleChange = (e) =>{
    setSearch(e.target.value)
  }


  // console.log(search);
  return (
    <div className="w-full">
    <form className="w-full pl-12 pr-12 pt-4" onSubmit={(e) => handleSubmit(e)}>
      <input onChange={(e) => {handleChange(e) 
        handleSubmit(e)}}  className="w-full h-10 outline p-2" type="text" placeholder="Search for countries"/>
    </form>
    {data.length>0 ? (
    <div className="w-full flex flex-wrap  justify-center">
        {data.map((card, idx)=> (
            <div className="border-2 w-40 m-2 rounded flex flex-col content-center justify-center">
                <img className="w-20  h-14 ml-8" src={card.flags.png} alt={card.flags.alt} />
                <br/>
                <h3 className="font-bold flex-wrap text-center">{card.name.common}</h3>
            </div>
        ))}
    </div>

): (
    <p className="text-center font-bold">Error Loading data from the API</p>
)}
    </div>
  )
};

export default Countries;
