import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create user!" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    dotenv.config();

    try {

        // CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // IF PASSWORD IS CORRECT, GENERATE COOKIE TOKEN AND SEND TO THE USER
        // npm install cookie-parser
        // npm install jsonwebtoken

        // generate secret key: openssl rand -base64 32

        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        ); // secret key used for hashing, content of token not visible unless you hash

        const { password: userPassword, ...userInfo } = user;

        console.log("CREATE TOKEN: ", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,   // keep true for production
            maxAge: age,
            sameSite: "None"
        }).status(200).json(userInfo);

        // You can use the token to determine whether or not the user is authenticated, whether or not a post or some sort of data belongs to the user, etc. 
        // This is done through decrypting the token and checking the userid
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login!" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
}