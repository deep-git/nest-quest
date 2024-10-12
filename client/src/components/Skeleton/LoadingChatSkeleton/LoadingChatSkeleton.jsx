import React from 'react';
import './LoadingChatSkeleton.css';

const LoadingChatSkeleton = () => {
    return (
        <div className="relative flex flex-col h-full loading-chat-skeleton">
            {/* Chat List Skeleton */}
            <div className="flex flex-col">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border-b-2 border-light_white">
                        <div className="skeleton-avatar" />
                        <div className="flex flex-col w-full">
                            <div className="skeleton-text w-3/4 mb-1" />
                            <div className="skeleton-text w-1/2" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Box Skeleton */}
            <div className="absolute flex flex-1 flex-col justify-between h-full w-full p-5 bg-light_white border-0 2xl:border-l-2 border-light_white">
                <div className="flex justify-between items-center bg-[#e0e0e0] p-2 rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="skeleton-avatar" />
                        <div className="skeleton-text w-32" />
                    </div>
                    <div className="skeleton-close" />
                </div>

                <div className="relative flex flex-col flex-1">
                    <div className="flex flex-col h-full justify-between pt-5">
                        <div className="flex flex-col gap-5 overflow-y-auto px-4 h-[450px] 2xl:h-full">
                            <div className="skeleton-message" />
                            <div className="skeleton-message" />
                            <div className="skeleton-message" />
                            <div className="skeleton-message" />
                        </div>

                        <form className="flex justify-center items-center mt-3 gap-3">
                            <textarea className="skeleton-textarea" />
                            <button className="skeleton-button" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingChatSkeleton;