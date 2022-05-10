import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FancyBorder } from './FancyBorder';
import './home.css';

export const Reservations = () => {
    const [availableReservation, setAvailableReservation] = useState([]);

    useEffect(() => {
        fetch(`/api/meals?availableReservations`)
            .then((res) => res.json())
            .then((data) => setAvailableReservation(data));
    }, []);

    //mapping to get the specific meal
    const specificReview = availableReservation.map((review, index) => (
        <>
            <FancyBorder>
                <Link to={`/meals/${review.id}`}>
                    <div className="menu-item" key={index}>
                        <h2>Name : {review.title}</h2>
                        <p>Location : {review.location}</p>
                        <p>Max-Reservations : {review.max_reservations}</p>
                        <p>Created : {review.when.split('T')[0]}</p>
                        <p>Price : {review.price}</p>
                    </div>
                </Link>
            </FancyBorder>
        </>
    ));

    return (
        <div>
            <div className="blinking">
                {availableReservation.length} Meal(s) available for reservations
            </div>
            <section className="each-meal">{specificReview}</section>
        </div>
    );
};
