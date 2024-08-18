import { Head } from "@inertiajs/react";
import MapComponent from "@/Components/Map/MapComponent";

import { useForm } from "@inertiajs/react";
import { useState, useCallback, useEffect } from "react";

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Alert from '@/Components/Alert';

export default function Client({ restaurants }) {       

    const { data, setData, post, errors } = useForm({
        name: '',
        x: '',
        y: ''
    });

    const [coordinates, setCoordinates] = useState({ y: '', x: '' }); 
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);


    const handleMapClick = useCallback((event) => {         
        const newCoordinates = {                                    
            y: event.latLng.lat(),
            x: event.latLng.lng(),
        };

        setCoordinates(newCoordinates);         // update coordinate's state  

        setData(prev => ({
            ...prev,
            x: newCoordinates.x,
            y: newCoordinates.y,
        }));
    }, []);

    useEffect(() => {
        if (coordinates.y && coordinates.x) {               // if current position has been set
            const filteredRestaurants = restaurants.filter((restaurant) => {
                const distance = calculateDistance(coordinates.y, coordinates.x, restaurant.y, restaurant.x);
                return distance <= 5; // Filter restaurants within 5 km
            });
            setNearbyRestaurants(filteredRestaurants);
        }
    }, [coordinates, restaurants]);

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // calculate current position and resto position distance
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            0.5 - Math.cos(dLat)/2 + 
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            (1 - Math.cos(dLon))/2;
        return R * 2 * Math.asin(Math.sqrt(a));
    };


    return (
        <>
            <Head title="Front Office" />
            
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Header Section */}
                <header className="bg-gray-800 py-6">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold">Explore Our Restaurants</h1>
                        <p className="mt-2 text-gray-400">Find the best places to eat nearby</p>
                    </div>
                </header>

                {/* Main Content Section */}
                <main className="container mx-auto px-4 py-8">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        {/* Google Map Component */}
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold mb-2">Restaurant Map</h2>
                            <MapComponent 
                                onClick={handleMapClick} 
                                restaurants={restaurants} 
                                clientPosition={coordinates} 
                            />
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-medium">Add your current position</h3>

                            <form className="mt-4">
                                <div className="mb-4">
                                    <InputLabel htmlFor="longitude" value="Longitude" />
                                    <TextInput
                                        id="longitude"
                                        type="number"
                                        name="x"
                                        value={coordinates.x}
                                        onChange={handleInputChange}                                        
                                        className="mt-1 block w-full"
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.x} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                <InputLabel htmlFor="latitude" value="Latitude" />
                                    <TextInput
                                        id="latitude"
                                        name="y"
                                        type="number"
                                        value={coordinates.y}
                                        onChange={handleInputChange}                                        
                                        className="mt-1 block w-full"
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.y} className="mt-2" />
                                </div>
                            </form>
                        </div>

                        {/* Nearby restaurants */}
                        <div className="mt-8">
                            <h3 className="text-xl font-medium">Nearby Restaurants</h3>
                            <ul className="mt-4 space-y-2">
                                {nearbyRestaurants.length > 0 ? (
                                    nearbyRestaurants.map((restaurant, index) => (
                                        <li key={index} className="p-4 bg-gray-700 rounded-lg">
                                            {restaurant.name}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No restaurants nearby</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </main>

                {/* Footer Section */}
                <footer className="bg-gray-800 py-4 mt-12">
                    <div className="container mx-auto px-4 text-center text-gray-500">
                        © 2024 Resto - App made with Laravel and React. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}