import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../home.css';
import ReactStars from "react-rating-stars-component";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetch(`/api/reviews`);
        const fetchResult = await result.json();
        setReviews(fetchResult);
    };

    const getStars = (stars) => {
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
    };

    const specificReview = reviews.map((review) => (
        <div className="review-design">
            <h2>Review: {review.title}</h2>
            <p> Meal Id: {review.meal_id}</p>
            <p> Description: {review.description}</p>
            <p> Stars: {getStars(review.stars)}</p> 
            <p> Posted: {review.created_date.split('T')[0]}</p>
        </div>
    ));

    return (
        <div>
            <div className="review-add-for-meal">
                <h2
                    style={{
                        width: '10rem',
                        backgroundColor: 'orange',
                        padding: '5px',
                    }}
                >
                    REVIEWS
                </h2>
                <Link to="/newReview">
                    <button>Add review </button>
                </Link>
            </div>
            <div className="all-review">{specificReview}</div>
        </div>
    );
}
