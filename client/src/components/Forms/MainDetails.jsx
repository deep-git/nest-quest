import React from 'react';

const MainDetails = ({ mainDetails, handleUpdateMainDetails, handleCurrentPage, handleCancel }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        handleCurrentPage("additionalPage");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center w-full gap-10">
                    <h1 className="text-3xl">Main Details</h1>
                </div>

                <div className="flex flex-col gap-10 sm:gap-5 mt-10">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="title">Property Title</label>
                            <input
                                type="text"
                                value={mainDetails.propertyTitle}
                                name="propertyTitle"
                                id="title"
                                placeholder="Property title"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                value={mainDetails.city}
                                name="city"
                                id="city"
                                placeholder="City"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                value={mainDetails.price || ""}
                                name="price"
                                id="price"
                                placeholder="$"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                value={mainDetails.address}
                                name="address"
                                id="address"
                                placeholder="Address"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                value={mainDetails.latitude}
                                name="latitude"
                                id="latitude"
                                placeholder="Latitude"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="number"
                                value={mainDetails.longitude}
                                name="longitude"
                                id="longitude"
                                placeholder="Longitude"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="type">Type</label>
                            <select
                                name="type"
                                value={mainDetails.type}
                                id="type"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            >
                                <option>Sale</option>
                                <option>Rent</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="property">Property</label>
                            <select
                                name="property"
                                value={mainDetails.property}
                                id="property"
                                onChange={handleUpdateMainDetails}
                                className="w-full bg-light_white border border-light_brown_3 rounded-md h-10 px-4 py-2"
                                required
                            >
                                <option>Apartment</option>
                                <option>House</option>
                                <option>Condo</option>
                                <option>Land</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            value={mainDetails.description}
                            name="description"
                            id="description"
                            placeholder="Description"
                            onChange={handleUpdateMainDetails}
                            className="w-full bg-light_white border border-light_brown_3 rounded-md px-4 py-2 max-h-52"
                        />
                    </div>

                    <div className="flex justify-between gap-3 mt-10 mb-10 items-center">
                        <div onClick={handleCancel} className="flex justify-center items-center px-4 py-2 bg-light_brown_3/30 text-black rounded-md hover:bg-light_brown_1/20 cursor-pointer transition duration-75">Cancel</div>
                        <button type="submit" className="flex justify-center items-center px-4 py-2 bg-light_brown_1 text-white rounded-md hover:bg-light_brown_1/90 transition duration-75">Next</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MainDetails