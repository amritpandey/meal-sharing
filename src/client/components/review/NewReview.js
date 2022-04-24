import React,{useState} from "react";
import "../home.css";
export const NewReview=()=>{
  const [mealId, setMealId] = useState(''); 
    const [inputs, setInputs] = useState({});

    //to get new meal id
    fetch(`http://localhost:3000/api/meals`)
    .then((res) => res.json())
    .then((data) => {
        const total = data.length;
        setMealId(total);
    });

    //multiple inputs field handled
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

    //handle the submitted form post
    const handleSubmit = (event) => {
      if (
        inputs.id === undefined ||
        inputs.title === undefined ||
        inputs.description === undefined ||
        inputs.stars === undefined ||
        inputs.createdDate === undefined
    ) {
        alert('one or many of field(s) are empty');
        return;
    }
        const objToPost = {
            meal_id: inputs.id,
            title: inputs.title,
            description: inputs.description,
            stars: inputs.stars,
            created_date: inputs.createdDate,
        };
        
        // POST request using fetch to add new meal()
        fetch('http://localhost:3000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objToPost),
        })
            .then((res) => {
                if (res.ok) {
                    alert('success!! ' + inputs.title + ' added to meal id '+ inputs.id);
                    return res.json();
                }
                alert('Error fetching! Error code: ' + res.status);
                return;
            })
            .then((data)=>console.log(data))
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div>
            <h2 style={{textAlign:"center"}}>Add New Review</h2>
            <form className="add-meal-form" onSubmit={handleSubmit}>
            <div>
                    <label>
                        Meal Id
                        <input
                            type="number"
                            name="id"
                            value={inputs.id || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Review 
                        <input
                            type="text"
                            name="title"
                            value={inputs.title || ""}
                            onChange={handleChange}
                            placeholder="e.g. good, bad"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <input
                            type="text"
                            name="description"
                            value={inputs.description|| ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                   <div>
                    <label>
                        Stars
                        <input
                            type="number"
                            name="stars"
                            value={inputs.stars|| ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Created Date
                        <input
                            type="date"
                            name="createdDate"
                            value={inputs.createdDate|| ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Add new Review</button>
            </form>
        </div>
    );
};

 