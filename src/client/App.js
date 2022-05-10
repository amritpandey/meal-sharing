import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestComponent from './components/TestComponent/TestComponent';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import Home from './components/Home';
import Meals from './components/Meals';
import { ReviewsWithId } from './components/review/ReviewsWithId';
import { MealsWithId } from './components/MealsWithId';
import { NewMeal } from './components/NewMeal';
import Reviews from './components/review/Reviews';
import { NewReview } from './components/review/NewReview';
import { Contact } from './components/Contact';
import { Reservations } from './components/Reservations';
import { DeleteMeal } from './components/DeleteMeal';

function App() {
    return (
        <Router>
            <Header />
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/meals">
                <Meals />
            </Route>
             <Route exact path="/reservations">
                <Reservations />
            </Route> 
            <Route exact path="/reviews/:id">
                <ReviewsWithId />
            </Route>
            <Route exact path="/meals/:id">
                <MealsWithId />
            </Route>
            <Route exact path="/deleteMeal/:id">
                <DeleteMeal />
            </Route>
            <Route exact path="/meal">
                <NewMeal />
            </Route>
            <Route exact path="/reviews">
                <Reviews />
            </Route>
            <Route exact path="/newReview">
                <NewReview />
            </Route>
            <Route exact path="/contact">
                <Contact />
            </Route>
            <Footer />
        </Router>
    );
}

export default App;
