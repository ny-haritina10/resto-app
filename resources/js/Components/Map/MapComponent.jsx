import React from 'react';
import { GoogleMap, Marker, Circle, useLoadScript } from '@react-google-maps/api';
import Alert from '../Alert';

export default function MapComponent({ onClick, restaurants, clientPosition }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places&callback=initMap",
    });

    const center = {
        lat: 48.8566, // Latitude pour Paris (exemple)
        lng: 2.3522,  // Longitude pour Paris (exemple)
    };

    const mapCenter = clientPosition && !isNaN(clientPosition.y) && !isNaN(clientPosition.x)
        ? { lat: parseFloat(clientPosition.y), lng: parseFloat(clientPosition.x) }
        : defaultCenter;

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

            {
                // Marker and Circle for client's position if valid
                clientPosition && !isNaN(clientPosition.y) && !isNaN(clientPosition.x) && (
                    <>
                        <Marker
                            position={{ lat: parseFloat(clientPosition.y), lng: parseFloat(clientPosition.x) }}
                            title="Your Position"
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            }}
                        />
                        <Circle
                            center={{ lat: parseFloat(clientPosition.y), lng: parseFloat(clientPosition.x) }}
                            radius={5000} // 5 km radius
                            options={{
                                strokeColor: "#4A90E2",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#4A90E2",
                                fillOpacity: 0.35,
                            }}
                        />
                    </>
                )
            }
        </GoogleMap>
    );
}