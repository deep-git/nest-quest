import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React from 'react';

const Lightbox = ({ isOpen, onClose, currentIndex, images, setCurrentIndex }) => {
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-10">
            <div className="relative">
                <img src={images[currentIndex]} alt="" className="w-full max-w-2xl h-[225px] md:h-[400px]" />
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-dark_gray/40 hover:bg-yellow-500/50 p-2 rounded-full">
                    <ChevronLeft className="w-7 h-7" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-dark_gray/40 hover:bg-yellow-500/50 p-2 rounded-full">
                    <ChevronRight className="w-7 h-7" />
                </button>
                <button onClick={onClose} className="absolute top-2 right-2 bg-dark_gray/20 text-white text-2xl hover:bg-dark_gray/50 p-2 rounded-full">
                    <X className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default Lightbox;