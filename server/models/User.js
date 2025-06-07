import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: { type: String, required: true },
        profilePic: { type: String },
        followers: { type: Array, defaultValue: [] },
        following: { type: Array, defaultValue: [] },
        description: { type: String },
        profilePicture: { type: String },
        bannerPicture: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);