import React, { useEffect, useState } from 'react';
import './home.css';
import { FancyBorder } from './FancyBorder';
import ReactStars from "react-rating-stars-component";

export default function Home() {
    const [topMeal, setTopMeal] = useState([]);

    useEffect(() => {
        fetchTopMeals();
    }, []);

    const fetchTopMeals = async () => {
        const fetchApi = await fetch(
            `http://localhost:3000/api/meals?topMeals`,
        );
        const fetchResponse = await fetchApi.json();
        setTopMeal(fetchResponse);
    };
    const mapTopMeals = topMeal.map((top, index) => {
        return (
            <FancyBorder>
                <div className='top-meal-individual' key={index}>
                    <h3>{top.title}</h3>
                    <p>{top.description}</p>
                    <p>price: {top.price} dkk</p>
                    <p><ReactStars 
                      stars={top.stars}
                      size={26}
                      color={"red"}
                    /></p>
                </div>
            </FancyBorder>
        );
    });
    return (
        <div>
            <img
                className="home-image"
                src="https://www.bypeople.com/wp-content/uploads/2018/09/stock-food-photos-bundle-bypeople-deals.png"
            />
            <div className="home-page-text">
                <h1 className='blinking popular'>
                   Our Popular Meals
                </h1>
                <div className='top-meals'>{mapTopMeals} </div>
            </div>
        </div>
    );
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
