import React, { useCallback, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import MapComponent from '@/Components/MapComponent';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Alert from '@/Components/Alert';

export default function Map({ auth, restaurants  }) {       // retreieve `restaurants` from Controller as a props
    const { data, setData, post, errors } = useForm({
        name: '',
        x: '',
        y: ''
    });

    const [alert, setAlert] = useState({ type: '', message: '' });  // state to handle Alert
    const [coordinates, setCoordinates] = useState({ y: '', x: '' });       // create a state to handle lat and long

    // Objectif : useCallback est utilisé pour mémoriser une fonction de rappel. 
    // Cela signifie qu'il renvoie une version mémorisée du rappel 
    // qui ne change que si l'une des dépendances a changé. 
    // Cela permet d’éviter les nouveaux rendus ou les recréations de fonctions inutiles.

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
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    

    const submit = (e) => {
        e.preventDefault();
        post(route('restaurants.store'), {
            onSuccess: () => {
                setAlert({ type: 'success', message: 'Restaurant ajouté avec succès.' });
            },
            onError: (errors) => {
                setAlert({ type: 'error', message: "Échec de l'ajout du restaurant: " + errors });
            }
        });
    };
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Map</h2>}
        >            
            <Head title="Map" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-dark overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-dark border-b border-dark-200">

                            {
                                alert.message && (
                                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
                                )
                            }

                            {/* give the `restaurants` list from Controller to the MapComponent */}
                            <MapComponent onClick={handleMapClick} restaurants={restaurants} />     

                            <form onSubmit={submit} className="mt-4">
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

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

                                <PrimaryButton type="submit">Add Restaurant</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}