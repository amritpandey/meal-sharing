
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./home.css";

export const Reservations = () => {
    //const { id } = useParams();
    const [availableReservation, setAvailableReservation] = useState([]);

    //const [title, setNewTitle] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // controlled inputs
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [seats, setSeats] = useState('');

  
    useEffect(()=>{
    fetch(`http://localhost:3000/api/meals?availableReservations`)
    .then(res=>res.json())
    .then(data=>setAvailableReservation(data));
  },[]);
     
    //handle the submitted form post
     const handleSubmit = async() => {
      if (
        seats === "" ||
        phone === "" ||
        name === ""||
        email === "" 
    ) {
        alert('form cant be empty');
        return;
    }
        const objToPost = {
            number_of_guests: seats,
            contact_phonenumber: phone,
            contact_name: name,
            contact_email: email,
            meal_id: id,
            created_date: "2022-02-28",
        };

        // POST request using fetch() to post in backend
    try {
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(objToPost)
      }
      const response = await fetch("http://localhost:3000/api/reservations", config)
      if (response.ok) {
          setSuccess("Succeed");
          alert("success!!!")
          return response
      } else {
        setError("Fetching error " + response.status )
        alert(response.status);
          return;
      }
  } catch (error) {
          alert("catch:"+ error)
  }
}
     //mapping to get the specific meal
    const specificReview = availableReservation.map((review, index) => (
        <><Link to={`/meals/${review.id}`}>
          <div className='reservation-item' key={index}>
            <h2>Name : {review.title}</h2>
            <p>Location : {review.location}</p>
            <p>Max-Reservations : {review.max_reservations}</p>
            <p>Created : {review.when.split("T")[0]}</p>
            <p>Price : {review.price}</p>
            </div>
            </Link>
        </>
    ));

    //mapping to get available reservations
    //const availableGuests = availableReservation.filter(a=>a.id==id).map((review) =>review.available_reservation);

    return (
        <div>
            <section className="single-item-detail">
                {specificReview}
            </section>
            
                
        </div>
    );
};

