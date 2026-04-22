import React from 'react';
import { LOCATIONS } from '../weatherService';

const LocationSelector = ({ darkMode, selectedLocation, changeLocation }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            {LOCATIONS.map(loc => (
                <button 
                    key={loc.name} 
                    onClick={() => changeLocation(loc)} 
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                        selectedLocation.name === loc.name 
                            ? (darkMode ? 'bg-amber-500 text-black' : 'bg-indigo-600 text-white') 
                            : (darkMode ? 'bg-slate-700/70 text-gray-200 hover:bg-slate-600' : 'bg-white/60 text-gray-700 hover:bg-gray-200')
                    }`}
                >
                    {loc.name}
                </button>
            ))}
        </div>
    );
};

export default LocationSelector;