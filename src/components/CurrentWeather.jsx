import React from 'react';

const CurrentWeather = ({ weatherData, darkMode, cardStyle }) => {
    const getAqiLabel = (aqi) => {
        if (aqi <= 50) return "Good";
        if (aqi <= 100) return "Moderate";
        if (aqi <= 150) return "Unhealthy for Sensitive";
        return "Unhealthy";
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Current Weather Card */}
            <div className={`lg:col-span-2 rounded-2xl p-6 ${cardStyle} animate-slide-up`}>
                <div className="flex flex-wrap justify-between items-start">
                    <div>
                        <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {weatherData.location}
                        </h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mt-1`}>
                            MA Now
                        </p>
                        <div className="flex items-center mt-2 gap-3">
                            <i className={`${weatherData.conditionIcon} text-5xl ${darkMode ? 'text-yellow-300' : 'text-amber-500'}`}></i>
                            <div>
                                <span className="text-6xl font-extrabold">{weatherData.currentTemp}°C</span>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} capitalize`}>
                                    {weatherData.condition}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2">Feels like {weatherData.feelsLike}°C</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 md:mt-0 text-sm">
                        <div>
                            <i className="fas fa-tint mr-2 text-blue-400"></i> 
                            Humidity <span className="font-semibold">{weatherData.humidity}%</span>
                        </div>
                        <div>
                            <i className="fas fa-wind mr-2 text-cyan-300"></i> 
                            Wind <span className="font-semibold">{weatherData.windSpeed} km/h</span> {weatherData.windDir}
                        </div>
                        <div>
                            <i className="fas fa-chart-line mr-2 text-emerald-400"></i> 
                            Pressure <span className="font-semibold">{weatherData.pressure} mb</span>
                        </div>
                        <div>
                            <i className="fas fa-eye mr-2 text-gray-400"></i> 
                            Visibility <span className="font-semibold">{weatherData.visibility} km</span>
                        </div>
                        <div>
                            <i className="fas fa-sun mr-2 text-yellow-300"></i> 
                            UV Index <span className="font-semibold">{weatherData.uvIndex}</span>
                        </div>
                        <div>
                            <i className="fas fa-leaf mr-2 text-green-400"></i> 
                            AQI: <span className="font-semibold">{weatherData.aqi} ({getAqiLabel(weatherData.aqi)})</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Air Quality Card */}
            <div className={`rounded-2xl p-5 ${cardStyle} animate-slide-up`} style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <i className="fas fa-chart-simple"></i> Air Quality & Health
                </h3>
                <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                        <span>PM2.5</span>
                        <span>12 µg/m³</span>
                    </div>
                    <div className="w-full bg-gray-500/30 rounded-full h-1.5">
                        <div className="bg-green-400 h-1.5 rounded-full w-3/5"></div>
                    </div>
                    <p className="text-xs mt-1">Ideal for outdoor activity</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                        <span><i className="far fa-sun"></i> Sunrise</span>
                        <span>6:42 AM</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span><i className="far fa-moon"></i> Sunset</span>
                        <span>7:58 PM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;