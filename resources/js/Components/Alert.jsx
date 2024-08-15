import React from "react";

const Alert = ({ type, message, onClose }) => {
    const getAlertStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-100 text-green-800 border-green-400";
            case "warning":
                return "bg-yellow-100 text-yellow-800 border-yellow-400";
            case "error":
                return "bg-red-100 text-red-800 border-red-400";
            case "info":
                return "bg-blue-100 text-blue-800 border-blue-400";
            default:
                return "bg-gray-100 text-gray-800 border-gray-400";
        }
    };

    return (
        <div className={`border-l-4 p-4 ${getAlertStyles()} rounded mb-4 flex items-center justify-between`}>
        <span>{message}</span>
        {onClose && (
            <button
            className="text-lg font-bold px-2"
            onClick={onClose}
            >
            &times;
            </button>
        )}
        </div>
    );
};

export default Alert;