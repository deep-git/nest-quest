import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get users!" });
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const users = await prisma.user.findUnique({
            where: {
                id
            }
        });

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get users!" });
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id; // get id from the URL path endpoint
    const tokenUserId = req.userId; // get userId of currently logged in user from the token through the middleware req.userId param
    const { password, avatar, ...inputs } = req.body;

    // check if the user profile id entered in the URL is the same as the user id of the currently logged in user. If it is not, they are not authorized to open/update the page/user profile
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
    }

    let updatedPassword = null;

    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            },
        });

        const { password: userPassword, ...rest } = updatedUser;

        res.status(200).json(rest);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Invalid Credentials!" });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id; // get id from the URL path endpoint
    const tokenUserId = req.userId; // get userId of currently logged in user from the token through the middleware req.userId param

    // check if the user profile id entered in the URL is the same as the user id of the currently logged in user. If it is not, they are not authorized to delete the user
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
    }

    try {

        await prisma.user.delete({
            where: {
                id
            }
        });

        res.status(200).json({ message: "User deleted!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete user!" });
    }
}

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId

    try {
        const userPosts = await prisma.post.findMany({
            where: {
                userId: tokenUserId
            }
        });

        const saved = await prisma.savedPost.findMany({
            where: {
                userId: tokenUserId
            },
            include: {
                post: true
            }
        });

        const savedPosts = saved.map((item) => item.post);

        res.status(200).json({ userPosts, savedPosts });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
}

export const savePost = async (req, res) => {
    const tokenUserId = req.userId
    const id = req.params.id;

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId: id
                }
            }
        });

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id
                },
            });

            res.status(200).json({ message: "Post removed from saved list." });

        } else {
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId: id
                }
            });

            res.status(200).json({ message: "Post saved" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
}

export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId

    try {
        const number = await prisma.chat.count({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId],
                    },
                },
            },
        });

        res.status(200).json(number);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
}