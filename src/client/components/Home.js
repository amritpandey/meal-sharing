import React, { useEffect, useState } from 'react';
import './home.css';
import {FancyBorder} from "./FancyBorder.js";


export default function Home() {
 return(
  <div>
    <img className='home-image' src="https://www.bypeople.com/wp-content/uploads/2018/09/stock-food-photos-bundle-bypeople-deals.png"/>
    <div className='home-page-text'>
    <p>A great restaurant website supports all of your restaurant marketing activities: it can attract new customers, maintain loyal ones, and raise the overall profile of the establishment outside of the physical location. It's a crucial aspect of running a successful business.</p> 
    <p>As you work to create a restaurant website, keep customer data in mind. Gathering, and using, customer data in the right way can maximize your ability to attract, retain, and deepen the connection with your guests. </p>
 </div>
 </div>
)
} 
 /* // need to work for fetch only high rated meals on frontpage
   
  const [allMeal, setAllMeal] = useState([]);
     
    useEffect(() => {
        fetchPath();
    }, []);

    const fetchPath = async () => {
      const fetchApi = await fetch(`http://localhost:3000/api/meals`);
      const fetchResponse = await fetchApi.json();
      setAllMeal(fetchResponse);
  };

    const mapFetchData = allMeal.map((data, index) => {
        return (
            <FancyBorder>
              <div key={index}>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <p>{data.price} DKK</p>
                </div>
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
                />
            </section>
            <div className="each-meal">{mapFetchData} </div>           
        </div>
        
    );
    }*/
