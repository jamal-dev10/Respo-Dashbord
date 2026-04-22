import React from 'react';

const WeeklyForecast = ({ weatherData, darkMode, cardStyle }) => {
    return (
        <div className={`lg:col-span-2 rounded-2xl p-5 ${cardStyle} animate-slide-up`} style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <i className="fas fa-calendar-week"></i> 7-Day Forecast
            </h3>
            <div className="mt-4 space-y-3">
                {weatherData.dailyForecast.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-gray-600/30 pb-2 last:border-0">
                        <span className="w-14 font-medium">{day.day}</span>
                        <i className={`${day.icon} w-8 text-center ${darkMode ? 'text-yellow-300' : 'text-amber-600'}`}></i>
                        <div className="flex gap-4">
                            <span className="text-sm">{day.low}°</span>
                            <div className="w-24 h-1.5 bg-gray-500/40 rounded-full overflow-hidden">
                                <div 
                                    className="bg-amber-400 h-full rounded-full" 
                                    style={{ width: `${((day.high - day.low) / 20) * 100}%`, minWidth: '20%' }}
                                ></div>
                            </div>
                            <span className="text-sm font-bold">{day.high}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyForecast;