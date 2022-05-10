import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import '../home.css';
import ReactStars from "react-rating-stars-component";

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
                <div className="individual-meal-review">
                    <h2>Review: {review.title}</h2>
                    <p>{review.description}</p>
                    <p>{review.created_date.split('T')[0]}</p>
                    <p className="review-stars">{getStars(review.stars)}</p> 
                  
                </div>
            </>
        ));
    return (
        <div>
            <p
                style={{
                    backgroundColor: 'red',
                    padding: '15px',
                    color: 'white',
                    fontSize: '2rem',
                }}
            >
                {' '}
                Meal Id: {id}
            </p>
            <div className="single-item-detail-review">
                {specificReview != 0 ? (
                    specificReview
                ) : (
                    <p style={{ fontSize: '25px', color: 'green' }}>
                        No review found.
                    </p>
                )}
                <Link to="/meals">
                    <p>Back</p>
                </Link>
            </div>
        </div>
    );
};
