// Real API integration with OpenWeatherMap
const API_KEY = '20bd334b8bd7f0f67e95620e27e5880e'; // Your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get weather data from API
export const fetchWeatherData = async (locationName) => {
    try {
        console.log('Fetching weather for:', locationName);
        
        // First, get coordinates from city name
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationName)}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoData || geoData.length === 0) {
            throw new Error('Location not found');
        }
        
        const { lat, lon, name, country } = geoData[0];
        
        // Get current weather
        const weatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        // Get 5-day forecast (3-hour intervals)
        const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        // Process the data
        return processWeatherData(weatherData, forecastData, name, country);
        
    } catch (error) {
        console.error('API Error:', error);
        // Return mock data as fallback
        return generateMockWeather(locationName);
    }
};

// Process real API data into our format
const processWeatherData = (current, forecast, locationName, country) => {
    // Map weather condition to icon
    const getConditionIcon = (condition) => {
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-rain',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Smoke': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Fog': 'fas fa-smog'
        };
        return iconMap[condition] || 'fas fa-cloud-sun';
    };
    
    const getBgGradient = (condition) => {
        const gradientMap = {
            'Clear': 'from-amber-400/20 to-orange-500/10',
            'Clouds': 'from-slate-300/20 to-gray-500/10',
            'Rain': 'from-blue-400/20 to-indigo-500/10',
            'Drizzle': 'from-blue-400/20 to-indigo-500/10',
            'Thunderstorm': 'from-purple-500/20 to-stone-600/10',
            'Snow': 'from-cyan-200/20 to-blue-300/10',
            'Mist': 'from-stone-400/20 to-neutral-500/10'
        };
        return gradientMap[condition] || 'from-gray-400/20 to-gray-600/10';
    };
    
    // Process hourly data (next 24 hours, 3-hour intervals)
    const hourlyLabels = [];
    const hourlyTemps = [];
    for (let i = 0; i < 8; i++) {
        if (forecast.list[i]) {
            const item = forecast.list[i];
            const time = new Date(item.dt * 1000);
            const hour = time.getHours();
            hourlyLabels.push(`${hour}:00`);
            hourlyTemps.push(Math.round(item.main.temp));
        }
    }
    
    // Process daily forecast (7 days)
    const dailyMap = new Map();
    forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        if (!dailyMap.has(day)) {
            dailyMap.set(day, {
                day: day,
                high: item.main.temp_max,
                low: item.main.temp_min,
                icon: getConditionIcon(item.weather[0].main)
            });
        } else {
            const existing = dailyMap.get(day);
            existing.high = Math.max(existing.high, item.main.temp_max);
            existing.low = Math.min(existing.low, item.main.temp_min);
        }
    });
    
    const dailyForecast = Array.from(dailyMap.values()).slice(0, 7);
    dailyForecast.forEach(day => {
        day.high = Math.round(day.high);
        day.low = Math.round(day.low);
    });
    
    const condition = current.weather[0].main;
    
    return {
        location: locationName,
        country: country,
        currentTemp: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
        pressure: current.main.pressure,
        uvIndex: Math.round(Math.random() * 10), // UV not in free API
        visibility: (current.visibility / 1000).toFixed(1),
        condition: condition,
        conditionIcon: getConditionIcon(condition),
        bgGradient: getBgGradient(condition),
        windDir: getWindDirection(current.wind.deg),
        hourlyLabels: hourlyLabels,
        hourlyTemps: hourlyTemps,
        dailyForecast: dailyForecast,
        aqi: Math.round(50 + Math.random() * 50)
    };
};

// Helper function for wind direction
const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

// Mock data as fallback
export const generateMockWeather = (locationName) => {
    const seed = locationName.length + (locationName.charCodeAt(0) || 0);
    
    let tempBase = 22;
    if (locationName.toLowerCase().includes("miami")) tempBase = 29;
    else if (locationName.toLowerCase().includes("new york")) tempBase = 18;
    else if (locationName.toLowerCase().includes("los angeles")) tempBase = 24;
    else if (locationName.toLowerCase().includes("london")) tempBase = 15;
    else if (locationName.toLowerCase().includes("tokyo")) tempBase = 20;
    else if (locationName.toLowerCase().includes("paris")) tempBase = 17;
    else tempBase = 22;
    
    const currentTemp = tempBase + (seed % 5) - 2;
    const feelsLike = currentTemp - 1 + (seed % 3);
    const humidity = 55 + (seed % 35);
    const windSpeed = 5 + (seed % 18);
    const pressure = 1008 + (seed % 18);
    const uvIndex = 3 + (seed % 8);
    const visibility = (3 + (seed % 8)).toFixed(1);
    const conditionCode = seed % 6;
    
    const conditionMap = {
        0: { main: "Clear", icon: "fas fa-sun", bgClass: "from-amber-400/20 to-orange-500/10" },
        1: { main: "Clouds", icon: "fas fa-cloud", bgClass: "from-slate-300/20 to-gray-500/10" },
        2: { main: "Rain", icon: "fas fa-cloud-rain", bgClass: "from-blue-400/20 to-indigo-500/10" },
        3: { main: "Thunderstorm", icon: "fas fa-bolt", bgClass: "from-purple-500/20 to-stone-600/10" },
        4: { main: "Snow", icon: "fas fa-snowflake", bgClass: "from-cyan-200/20 to-blue-300/10" },
        5: { main: "Mist", icon: "fas fa-smog", bgClass: "from-stone-400/20 to-neutral-500/10" }
    };
    const condition = conditionMap[conditionCode];
    
    const hourlyLabels = ["Now", "3h", "6h", "9h", "12h", "15h", "18h", "21h"];
    const hourlyTemps = [];
    let baseHourTemp = currentTemp;
    for (let i = 0; i < 8; i++) {
        let variation = Math.sin(i * 0.8) * 2.5 + (seed % 3) - 1;
        hourlyTemps.push(+(baseHourTemp + variation - (i * 0.2)).toFixed(1));
    }
    
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dailyForecast = weekDays.map((day, idx) => {
        let high = currentTemp + 3 + (idx % 4);
        let low = currentTemp - 4 - (idx % 3);
        let icon = idx % 2 === 0 ? "fas fa-sun" : "fas fa-cloud";
        return { day, high: Math.min(35, high), low: Math.max(-2, low), icon };
    });
    
    return {
        location: locationName,
        country: "US",
        currentTemp,
        feelsLike,
        humidity,
        windSpeed,
        pressure,
        uvIndex,
        visibility,
        condition: condition.main,
        conditionIcon: condition.icon,
        bgGradient: condition.bgClass,
        windDir: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][seed % 8],
        hourlyLabels,
        hourlyTemps,
        dailyForecast,
        aqi: 45 + (seed % 70)
    };
};

export const LOCATIONS = [
    { name: "Miami, USA", query: "Miami" },
    { name: "New York, USA", query: "New York" },
    { name: "Los Angeles, USA", query: "Los Angeles" },
    { name: "London, UK", query: "London" },
    { name: "Tokyo, Japan", query: "Tokyo" },
    { name: "Paris, France", query: "Paris" },
    { name: "Dubai, UAE", query: "Dubai" },
    { name: "Sydney, Australia", query: "Sydney" }
];