import { ArrowLeft } from 'lucide-react'
import React from 'react'

const ConfirmationDetails = ({ mainDetails, additionalDetails, images, handleCurrentPage, handleConfirm, handleConfirmEdit, isLoading, editMode }) => {

    return (
        <div>
            <div className="flex justify-center items-center gap-10">
                <ArrowLeft onClick={() => handleCurrentPage("photoPage")} className="w-10 h-10 text-black hover:text-light_brown_1 hover:-translate-x-1 transition duration-75" />
                <h1 className="text-3xl">Confirmation</h1>
            </div>
            <div className="mt-10">
                <p><span className="font-semibold">Property title:</span> {mainDetails.propertyTitle}</p>
                <p className="mt-5"><span className="font-semibold">City:</span> {mainDetails.city}</p>
                <p><span className="font-semibold">Address:</span> {mainDetails.address}</p>
                <p><span className="font-semibold">Latitude:</span> {mainDetails.latitude}</p>
                <p><span className="font-semibold">Longitude:</span> {mainDetails.longitude}</p>

                <div className="mt-5">
                    <p className="font-semibold">Description</p>
                    <p>{mainDetails.description}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mt-10">
                    <div>
                        <p><span className="font-semibold">Utilities:</span> {additionalDetails.utilities}</p>
                        <p><span className="font-semibold">Pet policy:</span> {additionalDetails.petPolicy}</p>
                        <p><span className="font-semibold">Income policy:</span> {additionalDetails.incomePolicy}</p>
                    </div>

                    <div>
                        <p><span className="font-semibold">Total Size:</span> {additionalDetails.totalSize} sqft/m2</p>
                        <p><span className="font-semibold">Bedrooms:</span> {additionalDetails.bedrooms}</p>
                        <p><span className="font-semibold">Bathrooms:</span> {additionalDetails.bathrooms}</p>
                    </div>

                    <div>
                        <p><span className="font-semibold">School (distance):</span> {additionalDetails.school}m</p>
                        <p><span className="font-semibold">Bus Stop (distance):</span> {additionalDetails.busStop}m</p>
                        <p><span className="font-semibold">Restaurant (distance):</span> {additionalDetails.restaurant}m</p>
                    </div>
                </div>

                <p className="mt-5"><span className="font-semibold">Images:</span> {images.length}</p>

                <div className="flex flex-col mt-5 gap-1 text-[18px]">
                    <p><span className="font-semibold">Type:</span> {mainDetails.type}</p>
                    <p><span className="font-semibold">Property:</span> {mainDetails.property}</p>
                    <p><span className="font-semibold">Price:</span> ${mainDetails.price}</p>
                </div>

                <div className="flex justify-end ml-auto gap-3 mt-10 mb-10 items-center">
                    <button onClick={() => handleCurrentPage("photoPage")} className="flex justify-center items-center px-4 py-2 bg-light_brown_3/30 text-black rounded-md hover:bg-light_brown_1/20 transition duration-75">Back</button>

                    {editMode === true ? (
                        <button disabled={isLoading} onClick={handleConfirmEdit} className="flex justify-center items-center px-4 py-2 bg-dark_gray text-white rounded-md hover:bg-dark_gray/90 transition duration-75">Save changes</button>
                    ) : (
                        <button disabled={isLoading} onClick={handleConfirm} className="flex justify-center items-center px-4 py-2 bg-dark_gray text-white rounded-md hover:bg-dark_gray/90 transition duration-75">Confirm</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDetails