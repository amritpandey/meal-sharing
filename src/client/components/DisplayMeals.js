import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { FancyBorder } from './FancyBorder';

export const DisplayMeals = ({ meals }) => {
    const singleTitle = meals.map((meal, index) => {
        return (
            <>
                <FancyBorder>
                    <section className="menu-item" key={index}>
                        <h2>{meal.title}</h2>
                        <p>{meal.description}</p>
                        <p>Price: {meal.price} dkk</p>
                        <div className="detail-review">
                            <Link to={`/meals/${meal.id}`}>
                                <p>Reserve seat</p>
                            </Link>
                            <Link to={`/reviews/${meal.id}`}>
                                {' '}
                                <p>Review</p>{' '}
                            </Link>
                            <Link to={`/deleteMeal/${meal.id}`}>
                                {' '}
                                <p>Delete</p>{' '}
                            </Link>
                        </div>
                    </section>
                </FancyBorder>
            </>
        );
    });
    return <div className="each-meal">{singleTitle}</div>;
};
