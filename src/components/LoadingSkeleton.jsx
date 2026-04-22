import React from 'react';

const LoadingSkeleton = ({ darkMode }) => {
    const skeletonBg = darkMode ? 'bg-slate-700/50' : 'bg-gray-300/50';
    const shimmer = 'animate-pulse';

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'} p-4 md:p-6`}>
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${skeletonBg} ${shimmer}`}></div>
                        <div className={`w-32 h-8 rounded ${skeletonBg} ${shimmer}`}></div>
                    </div>
                    <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-full ${skeletonBg} ${shimmer}`}></div>
                        <div className={`w-48 h-10 rounded-full ${skeletonBg} ${shimmer}`}></div>
                    </div>
                </div>

                {/* Location Selector Skeleton */}
                <div className="flex gap-2 mb-6 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`px-4 py-2 rounded-full ${skeletonBg} ${shimmer} min-w-max`}>
                            <div className="w-24 h-6"></div>
                        </div>
                    ))}
                </div>

                {/* Current Weather Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className={`lg:col-span-2 rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`}>
                        <div className="space-y-4">
                            <div className={`w-48 h-8 rounded ${skeletonBg}`}></div>
                            <div className={`w-full h-20 rounded ${skeletonBg}`}></div>
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className={`h-6 rounded ${skeletonBg}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Air Quality Card Skeleton */}
                    <div className={`rounded-2xl p-5 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`}>
                        <div className="space-y-3">
                            <div className={`w-32 h-6 rounded ${skeletonBg}`}></div>
                            <div className={`w-full h-8 rounded ${skeletonBg}`}></div>
                            <div className={`w-full h-4 rounded ${skeletonBg}`}></div>
                        </div>
                    </div>
                </div>

                {/* Hourly Forecast Skeleton */}
                <div className={`rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} mb-8 ${shimmer}`}>
                    <div className="space-y-4">
                        <div className={`w-40 h-6 rounded ${skeletonBg}`}></div>
                        <div className="flex gap-4 overflow-x-auto">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`min-w-max p-4 rounded-lg ${skeletonBg} w-24 h-24`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Weekly & Details Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`}>
                        <div className="space-y-3">
                            <div className={`w-32 h-6 rounded ${skeletonBg}`}></div>
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className={`w-full h-8 rounded ${skeletonBg}`}></div>
                            ))}
                        </div>
                    </div>
                    <div className={`lg:col-span-2 rounded-2xl p-6 ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} ${shimmer}`}>
                        <div className="space-y-4">
                            <div className={`w-40 h-6 rounded ${skeletonBg}`}></div>
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className={`h-24 rounded ${skeletonBg}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
