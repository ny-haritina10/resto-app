import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import DishList from '@/Components/Dish/DishList';
import DishForm from '@/Components/Dish/DishForm';

import { useState } from 'react';

export default function Dish({ auth, restaurant, initialDishes }) { // props received from laravel controller
                                                                    // props name need to be same with params name
                                                                    // retrieve from the func Inertia 
                                                                    // Inertia ('JSX components', array('name' => rgs))
    const [dishes, setDishes] = useState(initialDishes);

    const addDish = (newDish) => {
        setDishes([...dishes, newDish]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Resto Dishes</h2>}
        >
            <Head title="Resto Dishes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-gray-900 text-white p-6 rounded shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
                            <DishList dishes={dishes} />
                            <DishForm restaurantId={restaurant.id} addDish={addDish}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}