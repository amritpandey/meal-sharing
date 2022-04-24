import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../home.css";

export const ReviewsWithId = () => {
    const { id } = useParams();
    const [title, setNewTitle] = useState([]);

    function getStars(stars) {
        let numberOfStars = 0;
        switch (stars) {
            case 1:
                numberOfStars = '*';
                break;
            case 2:
                numberOfStars = '**';
                break;
            case 3:
                numberOfStars = '***';
                break;
            case 4:
                numberOfStars = '****';
                break;
            case 5:
                numberOfStars = '*****';
                break;

            default:
                break;
        }
        return numberOfStars;
    }
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetch(`http://localhost:3000/api/reviews`);
        const fetchResult = await result.json();
        setNewTitle(fetchResult);
    };

    const specificReview = title
        .filter((r) => r.meal_id == id)
        .map((review) => (
            <>
            <div className='individual-meal-review'>
                <h2>Review: {review.title}</h2>
                <p>{review.description}</p>
                <p>{getStars(review.stars)}</p>
                <p>{review.created_date.split('T')[0]}</p>
                </div>
            </>
        ));
    return (
        <div className="single-item-detail">
            <p style={{backgroundColor:"red", padding:"15px", color:"white", fontSize:"2rem"}}> Meal Id: {id}</p>
            {specificReview != 0 ? specificReview : <p style={{fontSize:"25px",color:"green"}}>No review found.</p>}
            <Link to="/meals">
                <p>Back</p>
            </Link>
        </div>
    );
};
