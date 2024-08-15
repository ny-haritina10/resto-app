import React, { useState } from 'react';
import RestoList from '@/Components/Resto/RestoList';
import RestoForm from '@/Components/Resto/RestoForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Resto({ auth }) {
    const [reload, setReload] = useState(false);
    const handleSuccess = () => setReload(!reload);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Restaurant Management</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="dark:bg-gray-900 min-h-screen p-6">
                            <RestoForm onSuccess={handleSuccess} />
                            <RestoList key={reload} />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout> 
    );
}