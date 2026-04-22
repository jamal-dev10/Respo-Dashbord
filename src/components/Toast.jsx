import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose && onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
    }[type];

    const icon = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    }[type];

    return (
        <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300`}>
            <span className="text-xl font-bold">{icon}</span>
            <span>{message}</span>
        </div>
    );
};

export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-4 right-4 space-y-2 pointer-events-none">
            {toasts.map((toast, index) => (
                <div
                    key={index}
                    className={`${toast.bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-pulse pointer-events-auto`}
                >
                    <span className="text-xl font-bold">{toast.icon}</span>
                    <span>{toast.message}</span>
                </div>
            ))}
        </div>
    );
};

export default Toast;
