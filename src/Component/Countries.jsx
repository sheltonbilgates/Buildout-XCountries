import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = "https://restcountries.com/v3.1/all";
        const response = await axios.get(api);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
       
      }
    };
  
    fetchData();
  }, []);

//   console.log(data);

  return (
    <>
    {data.length>0 ? (
    <div className="w-full flex flex-wrap  justify-center">
        {data.map((card)=> (
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
    </>
  )
};

export default Countries;
