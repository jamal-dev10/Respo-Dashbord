import React, { useState, useEffect } from 'react';
import { generateMockWeather, LOCATIONS } from './weatherService';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherDetails from './components/WeatherDetails';
import LoadingSkeleton from './components/LoadingSkeleton';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import './App.css';

const WeatherApp = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
    const [weatherData, setWeatherData] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const { toasts, addToast, removeToast } = useToast();

    const loadWeather = (locationObj) => {
        const mock = generateMockWeather(locationObj.name);
        setWeatherData(mock);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() === "") {
            addToast("Please enter a city or ZIP code", "warning");
            return;
        }
        const customLoc = { name: searchInput.trim(), query: searchInput.trim() };
        setSelectedLocation(customLoc);
        loadWeather(customLoc);
        setSearchInput("");
        addToast(`Loaded weather for ${customLoc.name}`, "success");
    };

    const changeLocation = (loc) => {
        setSelectedLocation(loc);
        loadWeather(loc);
        addToast(`Switched to ${loc.name}`, "success");
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        addToast(`Switched to ${!darkMode ? "light" : "dark"} mode`, "info");
    };

    useEffect(() => {
        loadWeather(selectedLocation);
    }, []);

    if (!weatherData) return <LoadingSkeleton darkMode={darkMode} />;

    const mainBg = darkMode
        ? `bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 ${weatherData.bgGradient}`
        : `bg-gradient-to-br from-sky-50 via-blue-50 to-white ${weatherData.bgGradient}`;

    const cardStyle = darkMode ? "glass-card-dark text-white" : "glass-card-light text-slate-800 shadow-lg";
    const textSecondary = darkMode ? "text-gray-300" : "text-gray-600";

    return (
        <>
        <div className={`min-h-screen ${mainBg} transition-smooth p-4 md:p-6 fade-in-content`}>
            <div className="max-w-7xl mx-auto">
                <Header 
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    handleSearch={handleSearch}
                />
                
                <LocationSelector 
                    darkMode={darkMode}
                    selectedLocation={selectedLocation}
                    changeLocation={changeLocation}
                />
                
                <CurrentWeather 
                    weatherData={weatherData}
                    darkMode={darkMode}
                    cardStyle={cardStyle}
                />
                
                <HourlyForecast 
                    weatherData={weatherData}
                    darkMode={darkMode}
                    cardStyle={cardStyle}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <WeeklyForecast 
                        weatherData={weatherData}
                        darkMode={darkMode}
                        cardStyle={cardStyle}
                    />
                    
                    <WeatherDetails 
                        weatherData={weatherData}
                        darkMode={darkMode}
                        cardStyle={cardStyle}
                    />
                </div>

                {/* Footer */}
                <footer className={`mt-12 pt-6 text-center text-xs ${textSecondary} border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                    <div className="flex flex-wrap justify-center gap-4 mb-2">
                        <span>Dribbble</span><span>For designers</span><span>Hire talent</span><span>Inspiration</span>
                        <span>Advertising</span><span>Blog</span><span>About</span><span>Careers</span><span>Support</span>
                        <span>View all services</span>
                    </div>
                    <p>© 2026 Dribbble Terms Privacy Cookies | Weather Dashboard Concept — Dark & Light UI | Real-time Mock Data</p>
                </footer>
            </div>
        </div>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
    );
};

export default WeatherApp;