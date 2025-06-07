import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, logout, changeBanner } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = ({ setOpen }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [profileImg, setProfileImg] = useState(currentUser?.profilePicture || "");
    const [bannerImg, setBannerImg] = useState(currentUser?.bannerPicture || "");
    const [uploadProgress, setUploadProgress] = useState({ profile: 0, banner: 0 });
    const [isUploading, setIsUploading] = useState(false);


    console.log("EditProfile currentUser:", currentUser);

    const uploadImg = async (file, type) => {
        const formData = new FormData();
        formData.append("image", file);
        setIsUploading(true);
        setUploadProgress((prev) => ({ ...prev, [type]: 0 }));

        try {
            const res = await axios.post(`/upload?type=${type}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress((prev) => ({ ...prev, [type]: percentCompleted }));
                },
            });

            const downloadURL = res.data.imageUrl;
            const updateData = type === "banner"
                ? { bannerPicture: downloadURL }
                : { profilePicture: downloadURL };

            await axios.put(`/users/${currentUser._id}`, updateData);

            console.log("Updating user with:", updateData);


            if (type === "profile") {
                dispatch(changeProfile(downloadURL));
            }

            if (type === "banner") {
                dispatch(changeBanner(downloadURL));
            }


            toast.success(`${type === "banner" ? "Banner" : "Profile"} picture updated!`);
        } catch (error) {
            console.log(`Error uploading ${type} image:`, error);
            toast.error(`Failed to upload ${type} picture.`);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser, navigate]);



    useEffect(() => {
        if (profileImg instanceof File && profileImg.type.startsWith("image/")) {
            uploadImg(profileImg, "profile");
        }
    }, [profileImg]);

    useEffect(() => {
        if (bannerImg instanceof File && bannerImg.type.startsWith("image/")) {
            uploadImg(bannerImg, "banner");
        }
    }, [bannerImg]);


    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${currentUser._id}`);
            dispatch(logout());
            navigate("/signin");
        } catch (err) {
            toast.error("Error deleting account");
        }
    };
    // And guard the JSX from rendering if currentUser is null
    if (!currentUser) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-[600px] max-w-full bg-white rounded-lg p-8 flex flex-col gap-6 relative shadow-lg">
                <ToastContainer position="top-center" />

                {/* Close button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 text-xl font-bold hover:text-gray-700"
                >
                    ×
                </button>

                <h2 className="font-bold text-2xl text-center">Edit Profile</h2>

                {/* Banner Picture */}
                <div>
                    <label className="block font-semibold mb-2">Banner Picture</label>
                    {currentUser?.bannerPicture ? (
                        <img
                            src={currentUser.bannerPicture}
                            alt="Banner"
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                    ) : (
                        <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-500">
                            No Banner Picture
                        </div>
                    )}
                    {uploadProgress.banner > 0 ? (
                        <p>Uploading banner... {uploadProgress.banner}%</p>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setBannerImg(e.target.files[0])}
                            className="block w-full border border-gray-300 rounded p-2"
                        />
                    )}
                </div>


                {/* Profile Picture */}
                <div>
                    <label className="block font-semibold mb-2">Profile Picture</label>
                    {currentUser?.profilePicture ? (
                        <img
                            src={currentUser.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center text-gray-500">
                            No Profile Picture
                        </div>
                    )}
                    {uploadProgress.profile > 0 ? (
                        <p>Uploading profile picture... {uploadProgress.profile}%</p>
                    ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfileImg(e.target.files[0])}
                            className="block border border-gray-300 rounded p-2"
                        />
                    )}
                </div>

                {/* Delete Account */}
                <div className="mt-4 border-t pt-4">
                    <p className="font-semibold text-red-600 mb-2">Delete Account</p>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full w-full"
                        onClick={handleDelete}
                    >
                        Delete Account
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isUploading}
                        onClick={() => {
                            setOpen(false);
                            window.location.reload();
                        }}
                        className={`px-4 py-2 rounded-full text-white ${isUploading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";

// import { changeProfile, logout } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";

// const EditProfile = ({ setOpen }) => {
//     const { currentUser } = useSelector((state) => state.user);

//     // States for profile and banner images and upload progress
//     const [profileImg, setProfileImg] = useState(null);
//     const [bannerImg, setBannerImg] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState({ profile: 0, banner: 0 });

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Upload image helper
//     const uploadImg = async (file, type) => {
//         const formData = new FormData();
//         formData.append("image", file);

//         // Reset progress for this type
//         setUploadProgress((prev) => ({ ...prev, [type]: 0 }));

//         try {
//             // Call upload API with query param to specify type (optional)
//             const res = await axios.post(`/upload?type=${type}`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const percentCompleted = Math.round(
//                         (progressEvent.loaded * 100) / progressEvent.total
//                     );
//                     setUploadProgress((prev) => ({ ...prev, [type]: percentCompleted }));
//                 },
//             });

//             const downloadURL = res.data.imageUrl;

//             // Update user with the new image URL depending on type
//             const updateData =
//                 type === "banner"
//                     ? { bannerPicture: downloadURL }
//                     : { profilePicture: downloadURL };

//             await axios.put(`/users/${currentUser._id}`, updateData);

//             // Dispatch to update Redux state for profilePicture (assumed you handle banner separately if needed)
//             if (type === "profile") {
//                 dispatch(changeProfile(downloadURL));
//             }

//             // Optionally you can dispatch banner update action if you track it in Redux

//         } catch (error) {
//             console.log(`Error uploading ${type} image:`, error);
//         }
//     };

//     // When new profile image selected
//     useEffect(() => {
//         if (profileImg && profileImg.type.startsWith("image/")) {
//             uploadImg(profileImg, "profile");
//         }
//     }, [profileImg]);

//     // When new banner image selected
//     useEffect(() => {
//         if (bannerImg && bannerImg.type.startsWith("image/")) {
//             uploadImg(bannerImg, "banner");
//         }
//     }, [bannerImg]);

//     const handleDelete = async () => {
//         const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
//         dispatch(logout());
//         navigate("/signin");
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="w-[600px] max-w-full bg-white rounded-lg p-8 flex flex-col gap-6 relative shadow-lg">
//                 <button
//                     onClick={() => setOpen(false)}
//                     className="absolute top-3 right-3 text-xl font-bold hover:text-gray-700"
//                 >
//                     ×
//                 </button>

//                 <h2 className="font-bold text-2xl text-center">Edit Profile</h2>

//                 {/* Banner Picture Section */}
//                 <div>
//                     <label className="block font-semibold mb-2">Banner Picture</label>
//                     {currentUser.bannerPicture ? (
//                         <img
//                             src={currentUser.bannerPicture}
//                             alt="Banner"
//                             className="w-full h-32 object-cover rounded-md mb-2"
//                         />
//                     ) : (
//                         <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-500">
//                             No Banner Picture
//                         </div>
//                     )}
//                     {uploadProgress.banner > 0 ? (
//                         <p>Uploading banner... {uploadProgress.banner}%</p>
//                     ) : (
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => setBannerImg(e.target.files[0])}
//                             className="block w-full border border-gray-300 rounded p-2"
//                         />
//                     )}
//                 </div>

//                 {/* Profile Picture Section */}
//                 <div>
//                     <label className="block font-semibold mb-2">Profile Picture</label>
//                     {currentUser.profilePicture ? (
//                         <img
//                             src={currentUser.profilePicture}
//                             alt="Profile"
//                             className="w-24 h-24 rounded-full object-cover mb-2"
//                         />
//                     ) : (
//                         <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center text-gray-500">
//                             No Profile Picture
//                         </div>
//                     )}
//                     {uploadProgress.profile > 0 ? (
//                         <p>Uploading profile picture... {uploadProgress.profile}%</p>
//                     ) : (
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => setProfileImg(e.target.files[0])}
//                             className="block border border-gray-300 rounded p-2"
//                         />
//                     )}
//                 </div>

//                 {/* Delete Account Section */}
//                 <div className="mt-4 border-t pt-4">
//                     <p className="font-semibold text-red-600 mb-2">Delete Account</p>
//                     <button
//                         className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full w-full"
//                         onClick={handleDelete}
//                     >
//                         Delete Account
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProfile;























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";

// import { changeProfile, logout } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";


// const EditProfile = ({ setOpen }) => {
//     const { currentUser } = useSelector((state) => state.user);

//     const [img, setImg] = useState(null);
//     const [imgUploadProgress, setImgUploadProgress] = useState(0);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();



//     const uploadImg = async (file) => {
//         const formData = new FormData();
//         formData.append("image", file);

//         setImgUploadProgress(0); // 🔸 Reset progress to 0% before starting upload

//         try {
//             const res = await axios.post("/upload", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                     setImgUploadProgress(percentCompleted);
//                 }
//             });


//             const downloadURL = res.data.imageUrl;

//             const updateProfile = await axios.put(`/users/${currentUser._id}`, {
//                 profilePicture: downloadURL,
//             });

//             dispatch(changeProfile(downloadURL));
//         } catch (error) {
//             console.log("Error uploading image:", error);
//         }
//     };


//     const handleDelete = async () => {
//         const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
//         dispatch(logout());
//         navigate("/signin");
//     };

//     useEffect(() => {
//         if (img && img.type.startsWith("image/")) {
//             uploadImg(img);
//         }
//     }, [img]);



//     return (
//         <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
//             <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
//                 <button
//                     onClick={() => setOpen(false)}
//                     className="absolute top-3 right-3 cursor-pointer"
//                 >
//                     X
//                 </button>
//                 <h2 className="font-bold text-xl">Edit Profile</h2>
//                 <p>Choose a new profile picture</p>
//                 {imgUploadProgress > 0 ? (
//                     "Uploading " + imgUploadProgress + "%"
//                 ) : (
//                     <input
//                         type="file"
//                         className="bg-transparent border border-slate-500 rounded p-2"
//                         accept="image/*"
//                         onChange={(e) => setImg(e.target.files[0])}
//                     />
//                 )}

//                 <p>Delete Account</p>
//                 <button
//                     className="bg-red-500 text-white py-2 rounded-full"
//                     onClick={handleDelete}
//                 >
//                     Delete Account
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default EditProfile;