import React from 'react';
import './LoadingMapSkeleton.css';

const LoadingMapSkeleton = () => {
    return (
        <div className="loading-map-skeleton w-full h-full flex items-center justify-center">
            <div className="skeleton-map" />
            <div className="skeleton-text">Loading map...</div>
        </div>
    );
};

export default LoadingMapSkeleton;