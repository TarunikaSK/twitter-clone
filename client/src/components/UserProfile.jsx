import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tweet from "./Tweet";
import EditProfile from "./EditProfile";
import { following } from "../redux/userSlice";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweetsRes = await axios.get(`/tweets/user/all/${id}`);
        const profileRes = await axios.get(`/users/find/${id}`);

        setUserTweets(tweetsRes.data);
        setUserProfile(profileRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleFollow = async () => {
    try {
      if (currentUser.following.includes(id)) {
        await axios.put(`/users/unfollow/${id}`, { id: currentUser._id });
      } else {
        await axios.put(`/users/follow/${id}`, { id: currentUser._id });
      }
      dispatch(following(id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <div className="max-w-3xl mx-auto border border-gray-300 rounded-md shadow-sm bg-white"> */}
      {/* Header with Back Button and User Info */}
      <div className="flex items-center py-3 px-4 border-b border-gray-200">
        <Link
          to="/"
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Go back"
        >
          <IoMdArrowBack size={24} />
        </Link>
        <div className="ml-3">
          <h1 className="font-bold text-lg">{userProfile?.username || "User"}</h1>
          <p className="text-gray-500 text-sm">
            {userTweets.length} {userTweets.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative">
        <img
          src={
            userProfile?.bannerPicture ||
            "/images/coverPic.jpg"
          }
          alt="banner"
          className="w-full h-36 object-cover rounded-t-md"
        />
        {/* Profile Picture */}
        <img
          src={userProfile?.profilePicture || "/images/default-avatar.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white absolute bottom-0 left-4 transform translate-y-1/2 object-cover"
        />
        {/* Follow/Edit Button */}
        <div className="absolute bottom-0 right-4 transform translate-y-1/2">
          {currentUser && currentUser._id === id ? (
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-1 border border-gray-400 rounded-full hover:bg-gray-100 transition"
            >
              Edit Profile
            </button>
          ) : currentUser ? (
            <button
              onClick={handleFollow}
              className={`px-4 py-1 rounded-full font-semibold text-white transition ${currentUser.following.includes(id)
                ? "bg-gray-800 hover:bg-gray-900"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {currentUser.following.includes(id) ? "Following" : "Follow"}
            </button>
          ) : null}
        </div>
      </div>

      {/* User Info Section */}
      <div className="pt-14 px-4 pb-6">
        <h2 className="font-bold text-2xl">{userProfile?.name || userProfile?.username}</h2>
        <p className="text-gray-600">@{userProfile?.username}</p>

        {userProfile?.bio && (
          <p className="mt-3 text-gray-700 text-sm leading-relaxed">{userProfile.bio}</p>
        )}
      </div>

      {/* Tweets List */}
      <div className="border-t border-gray-200">
        {userTweets.length ? (
          userTweets.map((tweet) => (
            <div key={tweet._id} className="p-4 border-b border-gray-100 last:border-none">
              <Tweet tweet={tweet} setData={setUserTweets} />
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No posts yet.</p>
        )}
      </div>
      {/* </div> */}

      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default UserProfile;