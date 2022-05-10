import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './home.css';

export const MealsWithId = () => {
    const { id } = useParams();
    const [availableReservation, setAvailableReservation] = useState([]);

    const [meals, setMeals] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // controlled inputs
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [seats, setSeats] = useState('');

    useEffect(() => {
        fetchData();
        fetchAvailableReservations();
    }, []);

    const fetchData = async () => {
        const result = await fetch(`/api/meals/${id}`);
        const fetchResult = await result.json();
        setMeals(fetchResult);
    };

    const fetchAvailableReservations = async () => {
        const result = await fetch(
            `/api/meals?availableReservations`,
        );
        const fetchResult = await result.json();
        setAvailableReservation(fetchResult);
    };

    //current date 
    function getCurrentDate() {
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      return date;
    }
    
    //handle the submitted form post
    const handleSubmit = async (event) => {
        event.preventDefault();

        const objToPost = {
            number_of_guests: seats,
            contact_phonenumber: phone,
            contact_name: name,
            contact_email: email,
            meal_id: id,
            created_date: getCurrentDate(),
        };

        // POST request using fetch() to post in backend
        try {
            const config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objToPost),
            };
            const response = await fetch(
                '/api/reservations',
                config,
            );
            if (response.ok) {
                setSuccess('Succeed');
                alert('success!!!');
                return response;
            } else {
                setError('Fetching error ' + response.status);
                alert(response.status);
                return;
            }
        } catch (error) {
            console.log('catch:', error);
        }
    };
    //mapping to get the specific meal
    const specificReview = meals.map((review, index) => (
        <>
            <h2>Name : {review.title}</h2>
            <p>Location : {review.location}</p>
            <p>Max-Reservations : {review.max_reservations}</p>
            <p>Created : {review.when.split('T')[0]}</p>
            <p>Price : {review.price}</p>
        </>
    ));

    //mapping to get available reservations
    const availableGuests = availableReservation
        .filter((a) => a.id == id)
        .map((review) => review.available_reservation);

    return (
        <div>
            <section className="single-item-detail">
                <h5>Meal Number: {id}</h5>
                {specificReview}
                {availableGuests > 0 ? (
                    <p>Available seats : {availableGuests}</p>
                ) : (
                    <p>Available seats : 0</p>
                )}
                <Link to="/meals">
                    <p>Back</p>
                </Link>
            </section>
            {availableGuests > 0 ? (
                <div className="submit-form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Seats
                            <input
                                type="number"
                                value={seats}
                                onChange={(e) => setSeats(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Phone
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit">Book seat</button>
                        <p>{success}</p>
                        <p>{error}</p>
                    </form>
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: 'red' }}>
                    No seats available for this meal.
                </p>
            )}
        </div>
    );
};
