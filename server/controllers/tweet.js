import Tweet from "../models/Tweet.js";
import handleError from "../routes/error.js";
import User from "../models/User.js";


export const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    } catch (err) {
        handleError(500, err);
    }
};

export const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("Tweet deleted!")
        } else {
            handleError(500, err);
        }
    } catch (err) {
        handleError(500, err);
    }
};


export const likeOrDislike = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({
                $push: { likes: req.body.id }
            });
            res.status(200).json("Tweet liked!");
        } else {
            await tweet.updateOne({
                $pull: { likes: req.body.id }
            });
            res.status(200).json("Tweet disliked!")
        }
    } catch (err) {
        handleError(500, err);
    }
};

export const getAllTweets = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await Tweet.find({ userId: currentUser._id });
        const followersTweets = await Promise.all(currentUser.following.map((followerId) => {
            return Tweet.find({ userId: followerId });
        })
        );
        res.status(200).json(userTweets.concat(...followersTweets));
    } catch (err) {
        handleError(500, err);
    }
};

export const getUserTweets = async (req, res, next) => {
    try {
        const userTweets = await Tweet.find({ userId: req.params.id }).sort({
            createAt: -1,                                                          //latest one on top
        });

        res.status(200).json(userTweets);
    } catch (err) {
        handleError(500, err);
    }
};


export const getExploreTweets = async (req, res, next) => {
    try {
        const getExploreTweets = await Tweet.find({
            likes: { $exists: true },
        }).sort({ likes: -1 });                                        //sorting tweets based on no of likes

        res.status(200).json(getExploreTweets);
    } catch (err) {
        handleError(500, err);
    }
};