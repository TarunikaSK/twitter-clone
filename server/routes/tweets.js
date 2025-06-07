import express from "express";
import verifyToken from "../verifyToken.js";
import { createTweet, deleteTweet, likeOrDislike, getAllTweets, getUserTweets, getExploreTweets } from "../controllers/tweet.js";


const router = express.Router();

//create tweet
router.post('/', verifyToken, createTweet)

//delete tweet
router.delete('/:id', verifyToken, deleteTweet)

//like/dislike a tweet
router.put('/:id/like', likeOrDislike);

//get all timeline tweets
router.get("/timeline/:id", getAllTweets)

//get user tweets only
router.get("/user/all/:id", getUserTweets);

//explore
router.get("/explore", getExploreTweets);

export default router;