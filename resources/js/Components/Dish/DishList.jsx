import React from 'react';

const DishList = ({ dishes }) => {
    return (
        <div className="bg-gray-800 p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
            <ul>
                {dishes.map(dish => (
                    <li key={dish.id} className="text-gray-200">
                        <span className="font-bold">{dish.name}</span> - ${dish.price}
                        <p className="text-sm">{dish.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DishList;