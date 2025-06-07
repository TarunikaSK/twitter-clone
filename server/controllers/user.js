import User from "../models/User.js";
import handleError from "../routes/error.js";
import Tweet from "../models/Tweet.js";
import { v2 as cloudinary } from "cloudinary";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true,
            });
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(handleError(403, "You can only update your own account."));
    }
};



export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const user = await User.findById(req.params.id);

            // Extract public IDs from URLs
            const getPublicId = (url) => {
                const parts = url.split('/');
                const folder = parts[parts.length - 2]; // profile_pics or banner_pics
                const filename = parts[parts.length - 1].split('.')[0]; // remove .jpg/.png
                return `${folder}/${filename}`;
            };

            // Delete profile picture if it exists
            if (user.profilePicture) {
                const publicId = getPublicId(user.profilePicture);
                await cloudinary.uploader.destroy(publicId);
            }

            // Delete banner picture if it exists
            if (user.bannerPicture) {
                const publicId = getPublicId(user.bannerPicture);
                await cloudinary.uploader.destroy(publicId);
            }

            // Delete user and tweets
            await User.findByIdAndDelete(req.params.id);
            await Tweet.deleteMany({ userId: req.params.id });

            res.status(200).json("User and associated data deleted.");
        } catch (err) {
            next(err);
        }
    } else {
        return next(handleError(403, "You can only delete your own account."));
    }
};



export const follow = async (req, res, next) => {
    try {
        //user 
        const user = await User.findById(req.params.id);
        //current user
        const currentUser = await User.findById(req.body.id);

        if (!user.followers.includes(req.body.id)) {
            await user.updateOne({
                $push: { followers: req.body.id },
            });

            await currentUser.updateOne({ $push: { following: req.params.id } });
        } else {
            res.status(403).json("You already follow this user.");
        }
        res.status(200).json("Following the user!")
    } catch (err) {
        next(err);
    }
};


export const unfollow = async (req, res, next) => {
    try {
        //user 
        const user = await User.findById(req.params.id);
        //current user
        const currentUser = await User.findById(req.body.id);

        if (currentUser.following.includes(req.params.id)) {
            await user.updateOne({
                $pull: { followers: req.body.id },
            });

            await currentUser.updateOne({ $pull: { following: req.params.id } });
        } else {
            res.status(403).json("You are not following this user.");
        }
        res.status(200).json("Unfollowed the user!")
    } catch (err) {
        next(err);
    }
};