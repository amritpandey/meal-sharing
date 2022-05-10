import React, { useEffect, useState } from 'react';
import { DisplayMeals } from './DisplayMeals';
import { Link } from 'react-router-dom';

export default function Meals() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetch('/api/meals');
        const fetchResult = await result.json();
        setMeals(fetchResult);
    };

    return (
        <div>
            <div className="review-add-for-meal">
                <h2>MENU</h2>
                <Link to={`/meal`}>
                    <button>Add new meal</button>
                </Link>
            </div>
            <DisplayMeals meals={meals} />
        </div>
    );
}
