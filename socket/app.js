import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const io = new Server({
    cors: {
        origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    },
});

let onlineUser = [];
const PORT_SOCKET = process.env.PORT || 4000;

// whenever connecting to the server, create a new user
const addUser = (userId, socketId) => {
    const userExists = onlineUser.find((user) => user.userId === userId);
    if (!userExists) {
        onlineUser.push({ userId, socketId });
    }
}

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
}

// send private messages
const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id)
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            // Only emit if the receiver is found
            io.to(receiver.socketId).emit("getMessage", data);
        } else {
            console.error(`User with ID ${receiverId} not found.`);
        }
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    });
});

io.listen(`${PORT_SOCKET}`);
