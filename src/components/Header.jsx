import React from 'react';

const Header = ({ darkMode, toggleTheme, searchInput, setSearchInput, handleSearch }) => {
    return (
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 animate-slide-down">
            <div className="flex items-center gap-2">
                <i className={`fas fa-cloud-moon text-3xl ${darkMode ? 'text-amber-300' : 'text-indigo-600'}`}></i>
                <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    WeatherScope
                </h1>
                <span className={`text-xs ml-2 px-2 py-1 rounded-full ${darkMode ? 'bg-white/10' : 'bg-black/5'} ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    dark/light
                </span>
            </div>
            <div className="flex gap-3 items-center">
                <button 
                    onClick={toggleTheme} 
                    className={`p-2 rounded-full text-xl transition-all ${darkMode ? 'bg-amber-400 text-slate-900' : 'bg-indigo-900 text-white'}`}
                >
                    {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                </button>
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <div className={`flex items-center rounded-full px-4 py-2 ${darkMode ? 'bg-slate-800/70 border border-slate-700' : 'bg-white/60 border border-gray-300'} backdrop-blur-sm`}>
                        <i className={`fas fa-search ${darkMode ? 'text-gray-300' : 'text-gray-600'} mr-2`}></i>
                        <input 
                            type="text" 
                            placeholder="City or ZIP..." 
                            value={searchInput} 
                            onChange={(e) => setSearchInput(e.target.value)} 
                            className={`bg-transparent outline-none text-sm w-36 md:w-48 ${darkMode ? 'text-white' : 'text-gray-800'} placeholder:${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                        />
                        <button type="submit" className="ml-1 text-sm font-medium">Go</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;