import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                },
            },
        });

        // get recevier user id for each of the chats
        for (const chat of chats) {
            const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

            // fetch receiver's user information, specifically the id, username, and avatar

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            });

            // add the receiver information to the chats object to use that receiver information to display the chats (such as the username and avatar of the receiver as the title of the chat)
            chat.receiver = receiver;
        }
        res.status(200).json(chats);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chats!" });
    }
}

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.id;

    try {

        // find the unique chat based on the chat id provided and check to make sure that the userIDs array has the id of the user who is trying to get the chat for them to be able to fetch the chat, otherwise they shouldn't be able to get the chat. Only the users who's id's are in the userIDs array would be able to get the chat

        // and along with the chat, include the messages that are associated with the chat and order the messages in ascending order according to when they've been created

        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId]
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });

        // update chat seen by array to specify that the user who opened the chat has seen the chat messages

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: {
                    set: [tokenUserId]
                },
            },
        });

        res.status(200).json(chat);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get chat!" });
    }
}

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;
    const receiverUserId = req.body.receiverId;

    try {
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, receiverUserId]
            },
        });

        res.status(200).json(newChat);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add chat!" });
    }
}

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.id;

    try {

        const chat = await prisma.chat.update({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId]
                },
            },
            data: {
                seenBy: {
                    set: [tokenUserId]
                }
            }
        });

        res.status(200).json(chat);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to read chat!" });
    }
}