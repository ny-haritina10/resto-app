import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Alert from './Alert';

export default function MapComponent({ onClick, restaurants }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places&callback=initMap",
    });

    const center = {
        lat: 48.8566, // Latitude pour Paris (exemple)
        lng: 2.3522,  // Longitude pour Paris (exemple)
    };

    if (!isLoaded) {
        return (
            <Alert type={"info"} message={"The Map is loading"} onClose={() => setAlert({ type: '', message: '' })} />
        );
    } 
        
    return (
        <GoogleMap
            onClick={onClick}
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={15}
        >
            {
                // loop through all the restaurants and set a Marker
                restaurants.map((restaurant, index) => (
                    <Marker
                        key={index}
                        position={{ lat: parseFloat(restaurant.y), lng: parseFloat(restaurant.x) }}
                        title={restaurant.name}
                    />
                ))
            }
        </GoogleMap>
    );
}