import React, { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';

const RestoForm = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/restos', { name, x, y });
            onSuccess();
            setName('');
            setX('');
            setY('');
        } catch (error) {
            console.error('Error saving restaurant', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="dark:bg-gray-800 dark:text-white p-6">
            <div className="mb-4">
                <label className="block">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 dark:bg-gray-700 dark:text-white w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Longitude (x)</label>
                <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="p-2 dark:bg-gray-700 dark:text-white w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Latitude (y)</label>
                <input
                    type="number"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    className="p-2 dark:bg-gray-700 dark:text-white w-full"
                />
            </div>
            <PrimaryButton type="submit">Add Restaurant</PrimaryButton>
        </form>
    );
}

export default RestoForm;