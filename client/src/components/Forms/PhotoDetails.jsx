import { ArrowLeft, X } from 'lucide-react'
import React, { useState } from 'react'
import UploadWidget from '../uploadWidget/UploadWidget'

const PhotoDetails = ({ handleCurrentPage, images, setImages, handleCancel }) => {

    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Add any additional logic you want to handle on submit
        setError("");

        if (images.length === 0) {
            setError("At least one image must be added.");
            return;
        }

        handleCurrentPage("confirmationPage");
    };

    const handleBack = (e) => {
        e.preventDefault();

        handleCurrentPage("additionalPage");
    }

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    }

    const handleClearAll = () => {
        setImages([]);
    }

    return (
        <div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-center items-center gap-10">
                    <ArrowLeft onClick={() => handleCurrentPage("additionalPage")} className="w-10 h-10 text-black hover:text-light_brown_1 hover:-translate-x-1 transition duration-75" />
                    <h1 className="text-3xl">Photos</h1>
                </div>

                <div className="flex mt-5 gap-5">
                    <div className="w-full">
                        <UploadWidget uwConfig={{
                            cloudName: "deepcode",
                            uploadPreset: "nest-quest",
                            folder: "posts",
                            multiple: true,
                        }} setState={setImages} />
                    </div>

                    <button onClick={handleClearAll} className="w-full border border-light_brown_3 px-4 py-2 rounded-md">Clear All</button>
                </div>

                <div className="flex flex-wrap justify-center gap-7 bg-light_white border border-light_brown_3 p-4 w-full rounded-md overflow-y-scroll mt-5 max-h-72">
                    {images && images.map((image, index) => {
                        return (
                            <div key={index} className="relative w-40 h-32 rounded-md">
                                <img src={image} alt={image} className="object-cover object-center w-full h-full" />
                                <div id={index} onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 flex justify-center items-center bg-red-500 w-max p-1 rounded-full">
                                    <X className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {error && <span className="text-red-500">{error}</span>}

                <div className="flex justify-between mt-10 mb-10 items-center">
                    <div onClick={handleCancel} className="flex justify-center items-center px-4 py-2 bg-light_brown_3/30 text-black rounded-md hover:bg-light_brown_1/20 cursor-pointer transition duration-75">Cancel</div>
                    <div className="flex gap-3 items-center">
                        <button onClick={handleBack} className="flex justify-center items-center px-4 py-2 bg-light_brown_3/30 text-black rounded-md hover:bg-light_brown_1/20 transition duration-75">Back</button>
                        <button onClick={handleSubmit} type="submit" className="flex justify-center items-center px-4 py-2 bg-light_brown_1 text-white rounded-md hover:bg-light_brown_1/90 transition duration-75">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetails