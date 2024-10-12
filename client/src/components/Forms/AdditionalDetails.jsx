import { ArrowLeft } from 'lucide-react'
import React from 'react'

const AdditionalDetails = ({ additionalDetails, handleUpdateAdditionalDetails, handleCurrentPage, handleCancel }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        handleCurrentPage("photoPage");
    }

    const handleBack = (e) => {
        e.preventDefault();

        handleCurrentPage("mainPage");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center gap-10">
                    <ArrowLeft onClick={() => handleCurrentPage("mainPage")} className="w-10 h-10 text-black hover:text-light_brown_1 hover:-translate-x-1 transition duration-75" />
                    <h1 className="text-3xl">Additional Details</h1>
                </div>

                <div className="flex flex-col gap-10 mt-10">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select
                                name="utilities"
                                id="utilities"
                                value={additionalDetails.utilities}
                                onChange={handleUpdateAdditionalDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            >
                                <option>Owner is responsible</option>
                                <option>Tenant is responsible</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="pets">Pet Policy</label>
                            <select
                                name="petPolicy"
                                id="pets"
                                value={additionalDetails.petPolicy}
                                onChange={handleUpdateAdditionalDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            >
                                <option>Allowed</option>
                                <option>Not Allowed</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="income">Income Policy</label>
                            <input
                                type="string"
                                name="incomePolicy"
                                id="income"
                                value={additionalDetails.incomePolicy}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="Income policy"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="size">Total Size (sqft/m2)</label>
                            <input
                                type="number"
                                name="totalSize"
                                id="size"
                                value={additionalDetails.totalSize || ""}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="sqft/m2"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="bedrooms">Bedrooms</label>
                            <input
                                type="number"
                                name="bedrooms"
                                id="bedrooms"
                                value={additionalDetails.bedrooms || ""}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="Num. of Bedrooms"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="bathrooms">Bathrooms</label>
                            <input
                                type="number"
                                name="bathrooms"
                                id="bathrooms"
                                value={additionalDetails.bathrooms || ""}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="Num. of Bathrooms"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="school">School (distance)</label>
                            <input
                                type="number"
                                name="school"
                                id="school"
                                value={additionalDetails.school || ""}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="School distance"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="bus">Bus Stop (distance)</label>
                            <input
                                type="number"
                                name="busStop"
                                id="bus"
                                value={additionalDetails.busStop || ""}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="Bus stop distance"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="restaurant">Restaurant (distance)</label>
                            <input
                                type="number"
                                name="restaurant"
                                id="restaurant"
                                value={additionalDetails.restaurant || ""}
                                onChange={handleUpdateAdditionalDetails}
                                placeholder="Restaurant distance"
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-10 mb-10 items-center">
                        <div onClick={handleCancel} className="flex justify-center items-center px-4 py-2 bg-light_brown_3/30 text-black rounded-md hover:bg-light_brown_1/20 cursor-pointer transition duration-75">Cancel</div>
                        <div className="flex gap-3 items-center">
                            <button onClick={handleBack} className="flex justify-center items-center px-4 py-2 bg-light_brown_3/30 text-black rounded-md hover:bg-light_brown_1/20 transition duration-75">Back</button>
                            <button type="submit" className="flex justify-center items-center px-4 py-2 bg-light_brown_1 text-white rounded-md hover:bg-light_brown_1/90 transition duration-75">Next</button>
                        </div>
                    </div>
                </div >
            </form >
        </div >
    )
}

export default AdditionalDetails