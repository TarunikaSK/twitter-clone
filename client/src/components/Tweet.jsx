import axios from "axios";
import React, { useState, useEffect } from "react";
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Tweet = ({ tweet, setData }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [userData, setUserData] = useState(null);

    const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
    const location = useLocation().pathname;
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/users/find/${tweet.userId}`);
                setUserData(res.data);
            } catch (err) {
                console.log("error", err);
            }
        };
        fetchData();
    }, [tweet.userId, tweet.likes]);

    const handleLike = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/tweets/${tweet._id}/like`, { id: currentUser._id });
            // Refresh tweets based on current page
            let newData;
            if (location.includes("profile")) {
                newData = await axios.get(`/tweets/user/all/${id}`);
            } else if (location.includes("explore")) {
                newData = await axios.get(`/tweets/explore`);
            } else {
                newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
            }
            setData(newData.data);
        } catch (err) {
            console.log("error", err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/tweets/${tweet._id}`, { data: { id: currentUser._id } });
            // Refresh tweets after delete
            let newData;
            if (location.includes("profile")) {
                newData = await axios.get(`/tweets/user/all/${id}`);
            } else if (location.includes("explore")) {
                newData = await axios.get(`/tweets/explore`);
            } else {
                newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
            }
            setData(newData.data);
        } catch (err) {
            console.log("error deleting tweet", err);
        }
    };

    if (!userData) return null;

    return (
        <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow duration-200 w-full">
            <div className="flex items-start space-x-3 w-full">
                {/* Profile Picture */}
                <Link to={`/profile/${userData._id}`}>
                    <img
                        src={userData?.profilePicture || "/images/default-avatar.jpg"}
                        alt={`${userData.username} profile`}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    />
                </Link>

                <div className="flex-1 w-full">
                    {/* Header (username + time) */}
                    <div className="flex flex-wrap items-center gap-x-2 text-sm">
                        <Link to={`/profile/${userData._id}`}>
                            <h3 className="font-bold cursor-pointer hover:underline">{userData.username}</h3>
                        </Link>
                        <span className="text-gray-500">@{userData.username}</span>
                        <span className="text-gray-500">· {dateStr} ago</span>
                    </div>

                    {/* Tweet Content */}
                    <p className="mt-2 text-gray-800 whitespace-pre-wrap break-words">{tweet.description}</p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-6 mt-3 text-sm text-gray-600">
                        {/* Like */}
                        <button
                            onClick={handleLike}
                            className="flex items-center hover:text-red-500"
                            aria-label="Like Tweet"
                        >
                            {tweet.likes.includes(currentUser._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            <span className="ml-1">{tweet.likes.length}</span>
                        </button>

                        {/* Comment */}
                        <button className="flex items-center hover:text-blue-500 cursor-pointer">
                            <ChatBubbleOutlineIcon className="mr-1" />
                            <span>{tweet.comments?.length || 0}</span>
                        </button>

                        {/* Delete (only if current user owns the tweet) */}
                        {tweet.userId === currentUser._id && (
                            <button
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-700"
                                title="Delete Tweet"
                                aria-label="Delete Tweet"
                            >
                                <DeleteOutlineIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;












// import axios from "axios";
// import React, { useState } from "react";
// import formatDistance from "date-fns/formatDistance";

// import { useEffect } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// const Tweet = ({ tweet, setData }) => {
//     const { currentUser } = useSelector((state) => state.user);

//     const [userData, setUserData] = useState();

//     const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
//     const location = useLocation().pathname;
//     const { id } = useParams();

//     console.log(location);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const findUser = await axios.get(`/users/find/${tweet.userId}`);

//                 setUserData(findUser.data);
//             } catch (err) {
//                 console.log("error", err);
//             }
//         };

//         fetchData();
//     }, [tweet.userId, tweet.likes]);

//     const handleLike = async (e) => {
//         e.preventDefault();

//         try {
//             const like = await axios.put(`/tweets/${tweet._id}/like`, {
//                 id: currentUser._id,
//             });

//             if (location.includes("profile")) {
//                 const newData = await axios.get(`/tweets/user/all/${id}`);
//                 setData(newData.data);
//             } else if (location.includes("explore")) {
//                 const newData = await axios.get(`/tweets/explore`);
//                 setData(newData.data);
//             } else {
//                 const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
//                 setData(newData.data);
//             }
//         } catch (err) {
//             console.log("error", err);
//         }
//     };

//     return (
//         <div>
//             {userData && (
//                 <>
//                     <div className="flex space-x-2">
//                         {/* <img src="" alt="" /> */}
//                         <Link to={`/profile/${userData._id}`}>
//                             <h3 className="font-bold">{userData.username}</h3>
//                         </Link>

//                         <span className="font-normal">@{userData.username}</span>
//                         <p> - {dateStr}</p>
//                     </div>

//                     <p>{tweet.description}</p>
//                     <button onClick={handleLike}>
//                         {tweet.likes.includes(currentUser._id) ? (
//                             <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
//                         ) : (
//                             <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
//                         )}
//                         {tweet.likes.length}
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Tweet;