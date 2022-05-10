import React, { useState } from 'react';
import './home.css';

export const NewMeal = () => {
    // controlled inputs
    const [inputs, setInputs] = useState({});

    //multiple inputs field handled
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    
    //handle the submitted form post
    const handleSubmit = (event) => {
   
        const objToPost = {
           // id: mealId + 1,
            title: inputs.title,
            description: inputs.description,
            location: inputs.location,
            when: inputs.when,
            max_reservations: inputs.maxReservation,
            price: inputs.price,
            created_date: inputs.createdDate,
        };

        // POST request using fetch to add new meal()
        fetch('http://localhost:3000/api/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objToPost),
        })
            .then((res) => {
                if (res.ok) {
                    alert('success!! ' + inputs.title + ' added');
                    return res.json();
                }
                alert('Error fetching! Error code: ' + res.status);
                return;
            })
            .then((data) => console.log(data))
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Add new meal</h2>
            <form className="add-meal-form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            value={inputs.title || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <input
                            type="text"
                            name="description"
                            value={inputs.description || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Location
                        <input
                            type="text"
                            name="location"
                            value={inputs.location || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        When
                        <input
                            type="date"
                            name="when"
                            value={inputs.when || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Max Reservation
                        <input
                            type="number"
                            name="maxReservation"
                            value={inputs.maxReservation || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price
                        <input
                            type="decimal"
                            name="price"
                            value={inputs.price || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Created Date
                        <input
                            type="date"
                            name="createdDate"
                            value={inputs.createdDate || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add new Meal</button>
            </form>
        </div>
    );
};
