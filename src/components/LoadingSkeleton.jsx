import React from 'react';

const LoadingSkeleton = ({ darkMode }) => {
    const skeletonBg = darkMode ? 'bg-slate-700/50' : 'bg-gray-300/50';
    const shimmer = 'animate-pulse';

    const moroccanCities = [
        'Casablanca, MA',
        'Rabat, MA',
        'Marrakech, MA',
        'Fès, MA',
        'Tanger, MA',
        'Agadir, MA',
        'Meknès, MA',
        'Oujda, MA',
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'} p-4 md:p-6`}>
            <div className="max-w-7xl mx-auto">

                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${skeletonBg} ${shimmer}`} aria-hidden="true"></div>
                        <div className={`w-36 h-8 rounded ${skeletonBg} ${shimmer}`} aria-hidden="true"></div>
                        <div className={`w-20 h-6 rounded-full ${skeletonBg} ${shimmer}`} aria-hidden="true"></div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className={`w-10 h-10 rounded-full ${skeletonBg} ${shimmer}`} aria-hidden="true"></div>
                        <div className={`w-48 h-10 rounded-full ${skeletonBg} ${shimmer}`} aria-hidden="true"></div>
                    </div>
                </div>

                {/* Moroccan City Selector Skeleton */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {moroccanCities.map((city, i) => (
                        <div
                            key={i}
                            className={`px-4 py-2 rounded-full ${shimmer} flex-shrink-0 ${
                                i === 0
                                    ? darkMode
                                        ? 'bg-yellow-500/40'
                                        : 'bg-yellow-400/50'
                                    : skeletonBg
                            }`}
                            style={{ minHeight: '36px' }}
                            aria-hidden="true"
                        />
                    ))}
                </div>

                {/* Current Weather + Air Quality Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* Main Weather Card */}
                    <div className={`lg:col-span-2 rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`} aria-hidden="true">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1 space-y-3">
                                <div className={`w-44 h-8 rounded ${skeletonBg}`}></div>
                                <div className={`w-48 h-4 rounded ${skeletonBg}`}></div>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className={`w-12 h-14 rounded ${skeletonBg}`}></div>
                                    <div className={`w-32 h-14 rounded ${skeletonBg}`}></div>
                                </div>
                                <div className={`w-28 h-5 rounded ${skeletonBg}`}></div>
                                <div className={`w-36 h-4 rounded ${skeletonBg}`}></div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-3 content-center">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className={`w-36 h-5 rounded ${skeletonBg}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Air Quality Card */}
                    <div className={`rounded-2xl p-5 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`} aria-hidden="true">
                        <div className="space-y-4">
                            <div className={`w-40 h-6 rounded ${skeletonBg}`}></div>
                            <div className="flex justify-between">
                                <div className={`w-16 h-5 rounded ${skeletonBg}`}></div>
                                <div className={`w-24 h-5 rounded ${skeletonBg}`}></div>
                            </div>
                            <div className={`w-full h-3 rounded-full ${skeletonBg}`}></div>
                            <div className={`w-44 h-4 rounded ${skeletonBg}`}></div>
                            <div className="space-y-2 pt-2">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <div className={`w-20 h-4 rounded ${skeletonBg}`}></div>
                                        <div className={`w-16 h-4 rounded ${skeletonBg}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hourly Forecast Skeleton */}
                <div className={`rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} mb-8 ${shimmer}`} aria-hidden="true">
                    <div className="space-y-4">
                        <div className={`w-52 h-6 rounded ${skeletonBg}`}></div>
                        <div className={`w-full h-24 rounded-lg ${skeletonBg}`}></div>
                        <div className={`w-48 h-4 rounded mx-auto ${skeletonBg}`}></div>
                    </div>
                </div>

                {/* 7-Day Forecast + Weather Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* 7-Day Forecast */}
                    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`} aria-hidden="true">
                        <div className="space-y-3">
                            <div className={`w-36 h-6 rounded ${skeletonBg}`}></div>
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-10 h-5 rounded ${skeletonBg}`}></div>
                                    <div className={`w-6 h-6 rounded-full ${skeletonBg}`}></div>
                                    <div className={`flex-1 h-3 rounded-full ${skeletonBg}`}></div>
                                    <div className={`w-10 h-5 rounded ${skeletonBg}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weather Details */}
                    <div className={`lg:col-span-2 rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`} aria-hidden="true">
                        <div className="space-y-4">
                            <div className={`w-36 h-6 rounded ${skeletonBg}`}></div>
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`h-24 rounded-xl ${skeletonBg}`}></div>
                                ))}
                            </div>
                            <div className="flex justify-between pt-1">
                                <div className={`w-28 h-4 rounded ${skeletonBg}`}></div>
                                <div className={`w-48 h-4 rounded ${skeletonBg}`}></div>
                            </div>
                            <div className={`w-72 h-4 rounded ${skeletonBg}`}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoadingSkeleton;