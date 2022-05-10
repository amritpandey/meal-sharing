import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

export const DeleteMeal = () => {
    const { id } = useParams();
    const ID = Number(id);
    const history = useHistory();

    const handleDeleteMeal = async () => {
        const deleteMeal = await fetch(
            `/api/meals/${ID}`,
            {
                method: 'DELETE',
            },
        );
        if (deleteMeal.ok) {
            alert(`meal with id:${id} is deleted`);
            history.push('/meals');
        }else{
          alert('Something went wrong');
        }
    };

    return (
        <div>
            <button onClick={handleDeleteMeal}>Delete</button>
        </div>
    );
};
