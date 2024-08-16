import React, { useState } from 'react';
import axios from 'axios';

const DishForm = ({ restaurantId, addDish }) => {
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/restaurants/${restaurantId}/dishes`, data)
            .then(response => {
                console.log('Dish added successfully:', response.data);
                addDish(response.data);  // Ajouter le nouveau plat à la liste
                setData({ name: '', description: '', price: '' });
            })
            .catch(error => console.error('Failed to add dish:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded shadow-md mt-4">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">Dish Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-200">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-200">Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={data.price}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Dish</button>
        </form>
    );
};

export default DishForm;