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
            `/api/meals?topMeals`,
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
               src='https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
