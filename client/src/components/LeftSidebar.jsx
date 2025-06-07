import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin");
    };

    return (
        <div className="flex flex-col justify-between h-screen md:h-[90vh] mr-6 px-2">
            {/* Navigation Links */}
            <div className="mt-6 flex flex-col space-y-4">
                <Link to="/">
                    <div className="flex items-center space-x-4 px-3 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                        <HomeIcon fontSize="large" />
                        <p className="font-bold hidden lg:block">Home</p>
                    </div>
                </Link>
                <Link to="/explore">
                    <div className="flex items-center space-x-4 px-3 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                        <SearchIcon fontSize="large" />
                        <p className="font-bold hidden lg:block">Explore</p>
                    </div>
                </Link>
                <Link to={`/profile/${currentUser?._id}`}>
                    <div className="flex items-center space-x-4 px-3 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                        <PersonIcon fontSize="large" />
                        <p className="font-bold hidden lg:block">Profile</p>
                    </div>
                </Link>
                <div
                    onClick={handleLogout}
                    className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                        />
                    </svg>
                    <p className="font-bold text-red-500">Logout</p>
                </div>

            </div>


        </div>
    );
};

export default LeftSidebar;












// import React from "react";
// import { Link } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import PersonIcon from '@mui/icons-material/Person';
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/userSlice";

// const LeftSidebar = () => {
//     const { currentUser } = useSelector((state) => state.user);

//     const dispatch = useDispatch();

//     const handleLogout = () => {
//         dispatch(logout());
//     };

//     return (
//         <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
//             <div className="mt-6 flex flex-col space-y-4">
//                 <Link to="/">
//                     <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
//                         <HomeIcon fontSize="large" />
//                         <p className="font-bold invisible lg:visible">Home</p>
//                     </div>
//                 </Link>
//                 <Link to="/explore">
//                     <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
//                         <SearchIcon fontSize="large" />
//                         <p className="font-bold invisible lg:visible">Explore</p>
//                     </div>
//                 </Link>
//                 <Link to={`/profile/${currentUser._id}`}>
//                     <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
//                         <PersonIcon fontSize="large" />
//                         <p className="font-bold invisible lg:visible">Profile</p>
//                     </div>
//                 </Link>
//                 {/* <Link to="/">
//                     <button className="flex items-center px-6 2xl:px-20 lg:px-8 py-3 mx-auto my-4 bg-blue-500 rounded-full ">
//                         <p className="font-bold text-2xl text-white">Tweet</p>
//                     </button>
//                 </Link> */}
//             </div>
//             <div className="flex justify-between">
//                 <div>
//                     <p className="font-bold">{currentUser.username}</p>
//                     <p className="font-bold">@{currentUser.username}</p>
//                 </div>
//                 <div>
//                     <Link to="signin">
//                         <button
//                             onClick={handleLogout}
//                             className="bg-red-500 px-4 py-2 text-white rounded-full">
//                             Logout
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeftSidebar;