import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    try {

        // check if the chat belongs to the user or not
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
        });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found!" });
        }

        // if chat does exist, create message
        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId: tokenUserId
            },
        });

        // update seen by array since the other user may not have seen the most recent message
        // didn't add set to the seen by method because it should directly pass the array so it will remove the other user's id
        // set would normally push the id value

        await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                seenBy: [tokenUserId],
                lastMessage: text,
            }
        })

        res.status(200).json(message);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add message!" });
    }
}