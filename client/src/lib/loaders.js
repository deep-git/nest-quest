import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePostLoader = async ({ request, params }) => {
    const postRes = await apiRequest.get("/posts/" + params.id);

    const data = [postRes.data];

    return data;
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1];

    const postPromise = apiRequest.get("/posts?" + query);

    return defer({
        postResponse: postPromise,
    })
}

export const userPostsLoader = async () => {
    const postPromise = apiRequest.get("/users/profile-posts");
    // receive user chat data
    const chatPromise = apiRequest.get("/chats");

    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise,
    });
}

export const landingPageLoader = async ({ request, params }) => {
    const postPromise = apiRequest.get("/posts/landing");

    return defer({
        postResponse: postPromise,
    })
}