import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <>
            <div className="header">
              <img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ5Li9UuTj31HlImnHp_Hk_MNG9J1a3lyBzQ&usqp=CAU'/>
                <h2>
                    <Link to={'/'}>Meal sharing App</Link>
                </h2>
                <nav>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/meals'}>Meals</Link>
                    </li>
                    <li>
                        <Link to={'/Reservations'}>Reservation</Link>
                    </li>
                    <li>
                        <Link to={'/reviews'}>Reviews</Link>
                    </li>
                    <li>
                        <Link to={'/contact'}>Contact</Link>
                    </li>
                </nav>
            </div>
        </>
    );
};
