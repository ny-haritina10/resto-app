import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestoList = () => {
    const [restos, setRestos] = useState([]);
    const [editingResto, setEditingResto] = useState(null);

    const fetchData = () => {
        axios.get('/api/restos')
        .then(response => setRestos(response.data))
        .catch(error => {
            console.error('There was an error fetching the restos!', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/restos/${id}`)
        .then(() => {
            fetchData(); // Re-fetch the data after deletion
        })
        .catch(error => {
            console.error('There was an error deleting the resto!', error);
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`/api/restos/${editingResto.id}`)
        .then(() => {
            setEditingResto(null); // Stop editing mode
            fetchData(); // Re-fetch the data after update
        })
        .catch(error => {
            console.error('There was an error updating the resto!', error);
        });
    }

    return (
        <div className="dark:bg-gray-800 dark:text-white p-6">
            <h2 className="text-xl mb-4">Restaurants</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b border-gray-600 p-2">Nom</th>
                        <th className="border-b border-gray-600 p-2">Longitude</th>
                        <th className="border-b border-gray-600 p-2">Latitude</th>
                        <th className="border-b border-gray-600 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {restos.map(resto => (
                        <tr key={resto.id} className="border-b border-gray-600">
                            <td className="p-2">
                                {editingResto && editingResto.id === resto.id ? (
                                    <input 
                                        value={editingResto.name} 
                                        onChange={(e) => setEditingResto({...editingResto, name: e.target.value})}
                                        className="p-2 dark:bg-gray-700 dark:text-white w-full"
                                    />
                                ) : (
                                    resto.name
                                )}
                            </td>

                            <td className="p-2">
                                {editingResto && editingResto.id === resto.id ? (
                                    <input 
                                        value={editingResto.x} 
                                        onChange={(e) => setEditingResto({...editingResto, x: e.target.value})}
                                        className="p-2 dark:bg-gray-700 dark:text-white w-full"
                                    />
                                ) : (
                                    resto.x
                                )}
                            </td>
                            
                            <td className="p-2">
                                {editingResto && editingResto.id === resto.id ? (
                                    <input 
                                        value={editingResto.y} 
                                        onChange={(e) => setEditingResto({...editingResto, y: e.target.value})}
                                        className="p-2 dark:bg-gray-700 dark:text-white w-full"
                                    />
                                ) : (
                                    resto.y
                                )}
                            </td>
                            <td className="p-2">
                                {editingResto && editingResto.id === resto.id ? (
                                    <button 
                                        onClick={handleUpdate} 
                                        className="bg-blue-600 text-white px-2 py-1 rounded"
                                    >
                                        Enregistrer
                                    </button>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => setEditingResto(resto)} 
                                            className="bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Modifier
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(resto.id)} 
                                            className="bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Supprimer
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RestoList;