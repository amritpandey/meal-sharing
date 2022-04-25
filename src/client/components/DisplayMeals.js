import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { FancyBorder } from './FancyBorder';

export const DisplayMeals = ({ title }) => {
    const singleTitle = title.map((item, index) => {
        return (
            <>
                <FancyBorder>
                    <section className="menu-item" key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Price: {item.price} dkk</p>
                        <div className="detail-review">
                            <Link to={`/meals/${item.id}`}>
                                <p>Reserve seat</p>
                            </Link>
                            <Link to={`/reviews/${item.id}`}>
                                {' '}
                                <p>Review</p>{' '}
                            </Link>
                        </div>
                    </section>
                </FancyBorder>
            </>
        );
    });
    return <div className="each-meal">{singleTitle}</div>;
};
