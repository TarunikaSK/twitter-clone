import express from "express"; // used instead of 'require', following es6
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js'
import tweetRoutes from './routes/tweets.js'
import uploadRoute from './routes/upload.js'

const app = express(); //app used for express execution
dotenv.config();
const PORT = process.env.PORT || 8000;

const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("connect to mongodb database");
        })
        .catch((err) => {
            throw err;
        });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/upload", uploadRoute);

app.listen(PORT, () => {
    connect();
    console.log(`listening on port ${PORT}`);
})