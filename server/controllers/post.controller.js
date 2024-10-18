import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const getPosts = async (req, res) => {
    const query = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property === "Any" ? undefined : query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000,
                }
            },
            include: {
                review: {
                    select: {
                        rating: true
                    }
                }
            }
        });

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts! " });
    }
}

export const getLandingPagePosts = async (req, res) => {

    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "asc",
            },
            include: {
                review: {
                    select: {
                        rating: true
                    }
                }
            }
        });

        const popularRentPosts = await prisma.post.findMany({
            where: {
                type: "Rent",
            },
            include: {
                review: {
                    select: {
                        rating: true,
                    }
                }
            },
        });

        // Calculate average ratings and sort
        const calculatePopularRentPosts = popularRentPosts
            .map(post => {
                const ratings = post.review.map(r => r.rating);
                const averageRating = ratings.length > 0
                    ? ratings.reduce((acc, r) => acc + r, 0) / ratings.length
                    : 0; // Default to 0 or any other value for posts with no reviews

                return {
                    ...post,
                    averageRating,
                };
            })
            .sort((a, b) => b.averageRating - a.averageRating);

        res.status(200).json({ posts, calculatePopularRentPosts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts! " });
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    dotenv.config();

    try {

        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
                review: {
                    select: {
                        rating: true,
                    },
                },
            },
        });

        // Initialize userId to null
        let userId = null;

        // Check for the token in cookies
        const token = req.cookies?.token;
        if (token) {
            // Verify the token
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
                userId = payload.id; // Extract userId from the payload
            } catch (err) {
                // Token is invalid; userId remains null
            }
        }

        // Construct the where condition for the savedPost lookup
        const savedPostWhere = {
            postId: id,
        };

        // Only include userId if it exists
        if (userId) {
            savedPostWhere.userId = userId;
        }

        // Check if the post is saved by the user
        const saved = await prisma.savedPost.findUnique({
            where: savedPostWhere,
        });

        res.status(200).json({ ...post, isSaved: saved ? true : false });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get post! " });
    }
}

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                }
            }
        })

        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add post! " });
    }
}

export const updatePost = async (req, res) => {
    const tokenUserId = req.userId;
    const postId = req.params.id;
    const body = req.body;

    try {
        const updatePost = await prisma.post.update({
            where: {
                id: postId,
                userId: tokenUserId,
            },
            data: {
                ...body.postData,
                postDetail: {
                    update: body.postDetail,
                },
            },
        });

        res.status(200).json(updatePost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update post! " });
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {

        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });

        if (post.userId !== tokenUserId) {
            res.status(403).json({ message: "Not Authorized!" });
        }

        await prisma.post.delete({
            where: {
                id
            }
        });

        // await prisma.postDetail.delete({
        //     where: {
        //         postId: id,
        //     }
        // })

        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete post! " });
    }
}

export const addRating = async (req, res) => {
    const rating = req.body.rating;
    const tokenUserId = req.userId;
    const id = req.params.id

    try {

        const newRating = await prisma.review.create({
            data: {
                rating,
                userId: tokenUserId,
                postId: id,
            },
        });

        res.status(200).json(newRating);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add rating! " });
    }
}

export const getRating = async (req, res) => {
    const tokenUserId = req.userId;
    const id = req.params.id

    try {

        const rating = await prisma.review.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId: id,
                },
            },
        });

        res.status(200).json(rating);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get rating! " });
    }
}

export const updateRating = async (req, res) => {
    const rating = req.body.rating;
    const tokenUserId = req.userId;
    const id = req.params.id

    try {

        const updateRating = await prisma.review.update({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId: id,
                },
            },
            data: {
                rating
            }
        });

        res.status(200).json(updateRating);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update rating! " });
    }
}