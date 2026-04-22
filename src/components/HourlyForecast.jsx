import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HourlyForecast = ({ weatherData, darkMode, cardStyle }) => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null);

    useEffect(() => {
        if (weatherData && weatherData.hourlyTemps && weatherData.hourlyTemps.length > 0 && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: weatherData.hourlyLabels,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: weatherData.hourlyTemps,
                        borderColor: darkMode ? '#facc15' : '#ea580c',
                        backgroundColor: 'rgba(250, 204, 21, 0.05)',
                        borderWidth: 2,
                        pointBackgroundColor: darkMode ? '#ffb347' : '#f97316',
                        pointBorderColor: darkMode ? '#1e293b' : '#fff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: { 
                        legend: { display: false },
                        tooltip: { 
                            mode: 'index',
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y}°C`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: { 
                            grid: { color: darkMode ? '#334155' : '#e2e8f0' }, 
                            ticks: { color: darkMode ? '#cbd5e1' : '#1e293b' },
                            title: {
                                display: true,
                                text: 'Temperature (°C)',
                                color: darkMode ? '#cbd5e1' : '#1e293b'
                            }
                        },
                        x: { 
                            ticks: { color: darkMode ? '#94a3b8' : '#475569' }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [weatherData, darkMode]);

    if (!weatherData || !weatherData.hourlyTemps) {
        return null;
    }

    return (
        <div className={`rounded-2xl p-5 mb-8 ${cardStyle}`}>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                <i className="fas fa-chart-line"></i> Hourly Temperature Forecast
            </h3>
            <div className="temp-graph-container w-full">
                <canvas ref={chartRef} style={{ maxHeight: '100px', width: '100%' }}></canvas>
            </div>
            <p className="text-xs text-center mt-3 opacity-70">Next 24 hours (3-hour intervals)</p>
        </div>
    );
};

export default HourlyForecast;