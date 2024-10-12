import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const allowedOrigins = [
    process.env.CLIENT_URL, // Production
    'https://nestquest-estate.netlify.app', // Production
    'http://localhost:5173' // Development
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})