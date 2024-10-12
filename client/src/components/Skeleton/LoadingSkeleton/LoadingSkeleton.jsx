import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-5 w-full skeleton">
            <div className="w-full h-[175px] sm:w-[500px] sm:h-[200px] skeleton-image" />
            <div className="flex flex-col w-full gap-1 sm:gap-0">
                <div className="skeleton-title" />
                <div className="flex items-center gap-2 mt-2">
                    <div className="skeleton-icon" />
                    <span className="skeleton-text skeleton-address" />
                </div>
                <div className="bg-light_brown_3/30 w-max mt-3 px-5 py-2 rounded-md">
                    <span className="skeleton-text skeleton-price" />
                </div>
                <div className="flex flex-col mt-auto gap-3 w-full">
                    <div className="hidden sm:flex justify-center items-center w-max gap-2">
                        <div className="skeleton-icon" />
                        <span className="skeleton-text skeleton-size" />
                    </div>
                    <div className="flex justify-center items-center w-max gap-1">
                        <div className="skeleton-stars" />
                    </div>
                    <div className="flex justify-between w-full mt-4 sm:mt-0">
                        <div className="flex justify-center items-center gap-5">
                            <div className="flex justify-center items-center gap-2">
                                <span className="skeleton-text skeleton-bed" />
                                <div className="skeleton-icon" />
                            </div>
                            <div className="w-[1px] h-full bg-light_brown_3" />
                            <div className="flex justify-center items-center gap-2">
                                <span className="skeleton-text skeleton-bath" />
                                <div className="skeleton-icon" />
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center items-center gap-5 mr-5">
                            <div className="skeleton-button" />
                            <div className="skeleton-button" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;