import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest';
import { Send, User, X } from 'lucide-react';
import { format } from "timeago.js"
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';

const Chat = ({ chats, openChatId }) => {

    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [chat, setChat] = useState(null);
    const messageEndRef = useRef();

    const decrease = useNotificationStore((state) => state.decrease);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [chat]);

    let openChatIdNew = "";
    if (chats && openChatId) {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].userIDs.includes(openChatId.id) && chats[i].userIDs.includes(currentUser.id)) {
                openChatIdNew = chats[i].id
            }
        }
    }

    useEffect(() => {
        const handleSpecificChat = async () => {
            if (openChatId !== "" && openChatId && openChatIdNew.trim() !== "") {
                try {
                    const response = await apiRequest.get(`/chats/${openChatIdNew}`);
                    const receiver = openChatId;
                    setChat({ ...response.data, receiver });
                } catch (error) {
                    console.log(error);
                }
            }
        }

        if (openChatId && openChatIdNew !== "") {
            handleSpecificChat();
        }
    }, [openChatId, openChatIdNew]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const response = await apiRequest.get(`/chats/${id}`);

            if (!response.data.seenBy.includes(currentUser.id)) {
                decrease();
            }

            setChat({ ...response.data, receiver });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);

            const text = formData.get("text");

            if (!text) {
                return;
            }

            const response = await apiRequest.post(`/messages/${chat.id}`, {
                text
            });

            setChat((prev) => ({
                ...prev,
                messages: [...prev.messages, response.data]
            }));

            // reset input
            e.target.reset;
            e.target.text.reset;

            // emit/send message
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: response.data
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        // If we receive a message, we need to read it in the database, otherwise it would show the message as being unread
        const read = async () => {
            try {
                await apiRequest.put(`/chats/read/${chat.id}`);
            } catch (error) {
                console.log(error);
            }
        }
        if (chat && socket) {
            socket.on("getMessage", (data) => {
                // Ensure the message belongs to the same chat to update the chat messages
                if (chat.id === data.chatId) {
                    setChat((prev) => ({
                        ...prev,
                        messages: [...prev.messages, data],
                    }));
                    read();
                }
            })
        }

        return () => {
            socket.off("getMessage");
        }
    }, [socket])

    return (
        <div className="relative flex flex-col h-full">
            {chats?.map((specific_chat) => (
                <div key={specific_chat.id} onClick={() => handleOpenChat(specific_chat.id, specific_chat.receiver)} style={{
                    backgroundColor: specific_chat.seenBy.includes(currentUser.id) || chat?.id === specific_chat.id ? "white" : "#B6A99D"
                }} className={`flex-col bg-light_brown_3 p-3 border-b-2 border-light_brown_3/30 cursor-pointer ${chat === null ? "flex" : "hidden"}`}>
                    <div className="flex items-center gap-3">
                        {specific_chat.receiver.avatar ? (
                            <img src={specific_chat.receiver.avatar} alt={`user ${specific_chat.receiver.username}`} className="w-10 h-10 rounded-full" />
                        ) : (
                            <div className="flex justify-center items-center bg-dark_gray text-white w-10 h-10 rounded-full p-1 cursor-pointer select-none">
                                <User />
                            </div>
                        )}

                        <span>{specific_chat.receiver.username}</span>
                    </div>
                    <p className="text-[14px] flex mt-5 truncate line-clamp-1">{specific_chat.lastMessage}</p>
                </div>
            ))}

            {/* chat box */}
            {chat && (
                <div className="absolute flex flex-1 flex-col justify-between h-full w-full p-5 xlp-10 bg-light_white border-0 2xl:border-l-2 border-light_brown_3/30">
                    <div className="flex justify-between items-center bg-light_brown_1 p-2 rounded-md flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                            {chat.receiver.avatar ? (
                                <img src={chat.receiver.avatar || null} alt="" className="w-10 h-10 rounded-full" />
                            ) : (
                                <div className="flex justify-center items-center bg-dark_gray text-white w-10 h-10 rounded-full p-1 cursor-pointer select-none">
                                    <User />
                                </div>
                            )}
                            <span className="text-white">{chat.receiver.username}</span>
                        </div>

                        <div onClick={() => setChat(null)} className="w-6 h-6 text-light_brown_3 cursor-pointer">
                            <X />
                        </div>
                    </div>

                    <div className="relative flex flex-col flex-1">
                        <div className="2xl:absolute w-full bottom-0 left-0 flex flex-col h-full justify-between pt-5">
                            <div className="flex flex-col gap-5 overflow-y-auto px-4 h-[450px] 2xl:h-full">
                                {chat.messages.map((message) => (
                                    <div className={`chatMessage`} key={message.id} style={{
                                        alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                        textAlign: message.userId === currentUser.id ? "right" : "left",
                                    }}>
                                        <p className={`text-[16px] w-full ${message.userId === currentUser.id ? "bg-light_brown_2/50 p-2 rounded-lg ml-auto" : "bg-light_brown_2/30 p-2 rounded-lg mr-auto"}`}>{message.text}</p>
                                        <span className="text-[12px]">{format(message.createdAt)}</span>
                                    </div>
                                ))}
                                <div ref={messageEndRef}></div>
                            </div>

                            <form onSubmit={handleSubmit} className="flex justify-center items-center mt-3 gap-3">
                                <textarea name="text" className="h-12 max-h-20 p-2 w-full min-h-12 rounded-md border-[2px] border-light_brown_3/50"></textarea>
                                <button className="hidden sm:flex justify-center items-center bg-yellow-500 h-12 px-10 rounded-md">Send</button>
                                <button className="flex sm:hidden justify-center items-center bg-yellow-500 h-12 px-3 rounded-md">
                                    <Send />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </div >
    )
}

export default Chat