import React, { useEffect, useState } from 'react';
import './home.css';

export default function Home() {
return(
  <div className='home-page'>
    
    <p>A great restaurant website supports all of your restaurant marketing activities: it can attract new customers, maintain loyal ones, and raise the overall profile of the establishment outside of the physical location. It's a crucial aspect of running a successful business.</p> 

<p>As you work to create a restaurant website, keep customer data in mind. Gathering, and using, customer data in the right way can maximize your ability to attract, retain, and deepen the connection with your guests. </p>
 </div>
)

}
   /*   const [allMeal, setAllMeal] = useState([]);
     const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPath();
        fetchSearch();
    }, []);

    const fetchSearch = async () => {
        const fetchApi = await fetch(`http://localhost:3000/api/meals?title=${search}`);
        const fetchResponse = await fetchApi.json();
        setSearch(fetchResponse);
    };
console.log(search);
    // search functionality
    const fetchPath = async () => {
      const fetchApi = await fetch('http://localhost:3000/api/meals');
      const fetchResponse = await fetchApi.json();
      setAllMeal(fetchResponse);
  };

    const mapFetchData = allMeal.map((data) => {
        return (
            <FancyBorder>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <p>{data.price} DKK</p>
            </FancyBorder>
        );
    });
 
    return (
        <div>
            <section className="welcome-search">
                <div style={{marginLeft:"5%"}}>
                    <h2>Welcome to Meal Sharing App</h2>
                    <p>Best meals in the town</p>
                </div>
                <input
                    className="search-meal"
                    type="text"
                    placeholder="Search for meal..."
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </section>
            <div className="each-meal">{mapFetchData} </div>           
        </div>
        
    );*/

