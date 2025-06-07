import React, { useState } from "react";
import TimelineTweets from "./TimelineTweets";
import { useSelector } from "react-redux";
import axios from "axios";

const Feed = () => {
    const [tweetText, setTweetText] = useState("");
    const { currentUser } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tweetText.trim()) return; // prevent empty tweet
        try {
            await axios.post("/tweets", {
                userId: currentUser._id,
                description: tweetText,
            });
            setTweetText(""); // clear after submit
            // Instead of reload, ideally fetch new tweets via state management
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="p-2 border-b border-gray-300">
                {currentUser && (
                    <div className="flex items-start space-x-4 mb-2">
                        {/* Profile picture */}
                        <img
                            src={currentUser?.profilePicture || "/images/default-avatar.jpg"}
                            alt={`${currentUser.username} profile`}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        {/* Tweet form */}
                        <form className="flex-1" onSubmit={handleSubmit}>
                            <textarea
                                value={tweetText}
                                onChange={(e) => setTweetText(e.target.value)}
                                placeholder="What is happening?!"
                                maxLength={280}
                                className="w-full bg-gray-100 rounded-xl p-3 resize-none focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                                rows={3}
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={!tweetText.trim()}
                                    className={`bg-blue-500 text-white py-2 px-5 rounded-full font-semibold hover:bg-blue-600 transition ${!tweetText.trim() ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    Tweet
                                </button>
                            </div>
                        </form>
                    </div>
                )}


            </div>
            <TimelineTweets />
        </div>
    );
};

export default Feed;










// import React, { useState } from "react";
// import TimelineTweets from "./TimelineTweets";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const Feed = () => {
//     const [tweetText, setTweetText] = useState("");

//     const { currentUser } = useSelector((state) => state.user);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const submitTweet = await axios.post("/tweets", {
//                 userId: currentUser._id,
//                 description: tweetText,
//             });
//             window.location.reload(false);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div>
//             {currentUser && (
//                 <p className="font-bold pl-2 my-2">{currentUser.username}</p>
//             )}

//             <form className="border-b-2 pb-6">
//                 <textarea
//                     onChange={(e) => setTweetText(e.target.value)}
//                     type="text"
//                     placeholder="What's happening"
//                     maxLength={280}
//                     className="bg-slate-200 rounded-lg w-full p-2"
//                 ></textarea>
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
//                 >
//                     Tweet
//                 </button>
//             </form>
//             <TimelineTweets />
//         </div>
//     );
// };

// export default Feed;