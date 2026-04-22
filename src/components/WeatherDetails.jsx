import React from 'react';

const WeatherDetails = ({ weatherData, darkMode, cardStyle }) => {
    return (
        <div className={`rounded-2xl p-5 ${cardStyle} animate-slide-up`} style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold flex items-center gap-2">
                <i className="fas fa-info-circle"></i> Weather Details
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-black/20 rounded-xl p-2 text-center">
                    <i className="fas fa-temperature-low"></i>
                    <p className="text-xs">Dew point</p>
                    <span className="font-semibold">{weatherData.currentTemp - 3}°C</span>
                </div>
                <div className="bg-black/20 rounded-xl p-2 text-center">
                    <i className="fas fa-cloud-rain"></i>
                    <p className="text-xs">Chance rain</p>
                    <span className="font-semibold">{(weatherData.humidity % 40) + 10}%</span>
                </div>
                <div className="bg-black/20 rounded-xl p-2 text-center">
                    <i className="fas fa-compress-alt"></i>
                    <p className="text-xs">Pressure trend</p>
                    <span className="font-semibold">Stable</span>
                </div>
                <div className="bg-black/20 rounded-xl p-2 text-center">
                    <i className="fas fa-flag-checkered"></i>
                    <p className="text-xs">Gust</p>
                    <span className="font-semibold">{weatherData.windSpeed + 7} km/h</span>
                </div>
            </div>
            <div className="mt-5 pt-3 border-t border-gray-500/30">
                <p className="text-sm flex justify-between">
                    <span><i className="fas fa-map-marker-alt"></i> Nearby cities: </span>
                    <span className="font-medium">Rabat, Casablanca, Agadir</span>
                </p>
                <p className="text-xs mt-2 italic opacity-80">
                    "Dynamic background & theme shifts with weather condition"
                </p>
            </div>
        </div>
    );
};

export default WeatherDetails;