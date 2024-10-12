import React, { useState } from 'react'
import MainDetails from '../../components/Forms/MainDetails'
import AdditionalDetails from '../../components/Forms/AdditionalDetails'
import { Check } from 'lucide-react';
import PhotoDetails from '../../components/Forms/PhotoDetails';
import ConfirmationDetails from '../../components/Forms/ConfirmationDetails';
import apiRequest from '../../lib/apiRequest';
import { useLoaderData, useNavigate } from 'react-router-dom';

const EditPost = () => {

    const post = useLoaderData();

    const [mainDetails, setMainDetails] = useState({
        propertyTitle: post[0].title || "",
        city: post[0].city || "",
        price: post[0].price || "",
        address: post[0].address || "",
        latitude: post[0].latitude || "",
        longitude: post[0].longitude || "",
        type: post[0].type || "Sale",
        property: post[0].property || "Apartment",
        description: post[0].postDetail.description || "",
    });

    const [additionalDetails, setAdditionalDetails] = useState({
        utilities: post[0].postDetail.utilities || "Owner is responsible",
        petPolicy: post[0].postDetail.pet || "Allowed",
        incomePolicy: post[0].postDetail.income || "",
        totalSize: post[0].size || "",
        bedrooms: post[0].bedroom || "",
        bathrooms: post[0].bathroom || "",
        school: post[0].postDetail.school || "",
        busStop: post[0].postDetail.bus || "",
        restaurant: post[0].postDetail.restaurant || "",
    });

    const [currentPage, setCurrentPage] = useState({
        mainPage: true,
        additionalPage: false,
        photoPage: false,
        confirmationPage: false,
    })

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState(post[0].images || []);
    const navigate = useNavigate();

    const handleUpdateMainDetails = (e) => {
        const { name, value } = e.target;

        setMainDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleUpdateAdditionalDetails = (e) => {
        const { name, value } = e.target;

        setAdditionalDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCurrentPage = (pageValue) => {
        const newState = { ...currentPage };
        // Set all object values to false
        Object.keys(newState).forEach(val => newState[val] = false);
        newState[pageValue] = true;
        setCurrentPage(newState);
    }

    const handleCancel = () => {
        navigate(-1);
    }

    const handleConfirmEdit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {

            const response = await apiRequest.put(`/posts/${post[0].id}`, {
                postData: {
                    title: mainDetails.propertyTitle,
                    price: parseInt(mainDetails.price),
                    city: mainDetails.city,
                    address: mainDetails.address,
                    latitude: mainDetails.latitude,
                    longitude: mainDetails.longitude,
                    type: mainDetails.type,
                    property: mainDetails.property,
                    size: additionalDetails.totalSize,
                    bedroom: parseInt(additionalDetails.bedrooms),
                    bathroom: parseInt(additionalDetails.bathrooms),
                    images: images,
                },
                postDetail: {
                    description: mainDetails.description,
                    utilities: additionalDetails.utilities,
                    pet: additionalDetails.petPolicy,
                    income: additionalDetails.incomePolicy,
                    school: parseInt(additionalDetails.school),
                    bus: parseInt(additionalDetails.busStop),
                    restaurant: parseInt(additionalDetails.restaurant),
                }
            });

            navigate("/" + response.data.id);

        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-[70px] w-[90%] max-w-[700px] ml-auto mr-auto">

            <div className="flex items-center w-full h-[75px] mb-10 gap-2">
                <div className="relative flex flex-col justify-center items-center gap-2">
                    <span className={`hidden md:flex absolute -top-7 w-max ${currentPage.mainPage && "text-light_brown_1 font-semibold"}`}>Main Details</span>
                    <span className={`md:hidden absolute -top-7 w-max ${currentPage.mainPage && "text-light_brown_1 font-semibold"}`}>1</span>
                    <div className={`flex justify-center items-center p-2 rounded-full w-max ${currentPage.mainPage && "bg-light_brown_3/50 border-2 border-light_brown_1"} ${currentPage.additionalPage || currentPage.photoPage || currentPage.confirmationPage ? "bg-yellow-500 text-white" : "bg-light_gray/30"}`}>
                        <Check className={`w-6 h-6 ${currentPage.additionalPage || currentPage.photoPage || currentPage.confirmationPage ? "text-white" : currentPage.mainPage ? "text-light_brown_1" : "text-light_gray"}`} />
                    </div>
                </div>

                <hr className={`flex flex-1 h-[2px] border bg-light_gray ${currentPage.additionalPage || currentPage.photoPage || currentPage.confirmationPage ? "border-none" : "border-dashed"}`} />

                <div className="relative flex flex-col justify-center items-center gap-2">
                    <span className={`hidden md:flex absolute -top-7 w-max ${currentPage.additionalPage && "text-light_brown_1 font-semibold"}`}>Additional Details</span>
                    <span className={`md:hidden absolute -top-7 w-max ${currentPage.additionalPage && "text-light_brown_1 font-semibold"}`}>2</span>
                    <div className={`flex justify-center items-center p-2 rounded-full w-max ${currentPage.additionalPage && "bg-light_brown_3/50 border-2 border-light_brown_1"} ${currentPage.photoPage || currentPage.confirmationPage ? "bg-yellow-500 text-white" : "bg-light_gray/30"}`}>
                        <Check className={`w-6 h-6 ${currentPage.photoPage || currentPage.confirmationPage ? "text-white" : currentPage.additionalPage ? "text-light_brown_1" : "text-light_gray"}`} />
                    </div>
                </div>

                <div className={`flex flex-1 h-[2px] border bg-light_gray ${currentPage.photoPage || currentPage.confirmationPage ? "border-none" : "border-dashed"}`} />

                <div className="relative flex flex-col justify-center items-center gap-2">
                    <span className={`hidden md:flex absolute -top-7 w-max ${currentPage.photoPage && "text-light_brown_1 font-semibold"}`}>Photos</span>
                    <span className={`md:hidden absolute -top-7 w-max ${currentPage.photoPage && "text-light_brown_1 font-semibold"}`}>3</span>
                    <div className={`flex justify-center items-center p-2 rounded-full w-max ${currentPage.photoPage && "bg-light_brown_3/50 border-2 border-light_brown_1"} ${currentPage.confirmationPage ? "bg-yellow-500 text-white" : "bg-light_gray/30"}`}>
                        <Check className={`w-6 h-6 ${currentPage.confirmationPage ? "text-white" : currentPage.photoPage ? "text-light_brown_1" : "text-light_gray"}`} />
                    </div>
                </div>

                <div className={`flex flex-1 h-[2px] border bg-light_gray ${currentPage.confirmationPage ? "border-none" : "border-dashed"}`} />

                <div className="relative flex flex-col justify-center items-center gap-2">
                    <span className={`hidden md:flex absolute -top-7 w-max ${currentPage.confirmationPage && "text-light_brown_1 font-semibold"}`}>Confirmation</span>
                    <span className={`md:hidden absolute -top-7 w-max ${currentPage.confirmationPage && "text-light_brown_1 font-semibold"}`}>4</span>
                    <div className={`flex justify-center items-center p-2 rounded-full w-max bg-light_gray/30 ${currentPage.confirmationPage && "bg-light_brown_3/50 border-2 border-light_brown_1"}`}>
                        <Check className={`w-6 h-6 ${currentPage.confirmationPage ? "text-light_brown_1" : "text-light_gray"}`} />
                    </div>
                </div>
            </div>
            {currentPage.mainPage && (
                <MainDetails mainDetails={mainDetails} handleUpdateMainDetails={handleUpdateMainDetails} handleCurrentPage={handleCurrentPage} handleCancel={handleCancel} />
            )}

            {currentPage.additionalPage && (
                <AdditionalDetails additionalDetails={additionalDetails} handleUpdateAdditionalDetails={handleUpdateAdditionalDetails} handleCurrentPage={handleCurrentPage} handleCancel={handleCancel} />
            )}

            {currentPage.photoPage && (
                <PhotoDetails images={images} setImages={setImages} handleCurrentPage={handleCurrentPage} handleCancel={handleCancel} />
            )}

            {currentPage.confirmationPage && (
                <ConfirmationDetails mainDetails={mainDetails} additionalDetails={additionalDetails} images={images} handleCurrentPage={handleCurrentPage} handleConfirmEdit={handleConfirmEdit} isLoading={isLoading} handleCancel={handleCancel} editMode={true} />
            )}
        </div>
    )
}

export default EditPost