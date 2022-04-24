import React, {useEffect, useState, useParams} from "react";
import PropTypes from "prop-types";
import { DisplayMeals } from "./DisplayMeals";

export default function DetailMealsInfo() {
  const {id} = useParams();
  const [title, setNewTitle] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async()=>{
    const result = await fetch(`http://localhost:3000/api/meals/${id}`);
    const fetchResult = await result.json()
    setNewTitle(fetchResult)
  }
  
  const singleTitle = title.map((item)=>{return (
    <>
      <section className="menu-item" >
     
    <h2  key={item.id}>Name: {item.title}</h2>
    <p  key={item.id}>Description: {item.description}</p>
    <p key={item.id}>Price: { item.price} dkk</p>
    <p  key={item.id}>Location: {item.location}</p>
    <p key={item.id}>Created: { item.created_date} </p>
    </section>
    </>
    )
  })
  return(
    <div className="single-item">
      {singleTitle}
    </div>
  )
}
