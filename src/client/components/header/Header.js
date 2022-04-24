import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

export const Header=()=>{
  return(
    <>
    <div className="header">
      <h2><Link to={"/"}>Meal sharing App</Link></h2>
      <nav>
        <li><Link to={"/"}>Home</Link>
          </li>
        <li><Link to={"/meals"}>Meals</Link></li>
        <li><Link to={"/Reservations"}>Reservation</Link></li>
        <li><Link to={"/reviews"}>Reviews</Link></li>
        <li><Link to={"/contact"}>Contact</Link></li>
      </nav>
    </div>
    </>
  )
}