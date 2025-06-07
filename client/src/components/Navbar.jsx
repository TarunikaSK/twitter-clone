import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserPlaceholder from "./UserPlaceholder";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
    const [userData, setUserData] = useState(null);
    const location = useLocation().pathname;
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const getPageTitle = () => {
        if (location.includes("profile")) return <UserPlaceholder setUserData={setUserData} userData={userData} />;
        if (location.includes("explore")) return "Explore";
        return "Home";
    };

    return (
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-4 border-b border-gray-200">
            {/* Left - Logo with fixed width */}
            <div className="w-20 flex justify-start">
                <img src="/images/twitter-logo.png" alt="Twitter Logo" width={36} className="" />
            </div>

            {/* Center - Title, flex-grow, centered text */}
            <div className="flex-grow text-center">
                <h2 className="text-xl font-bold inline-block">{getPageTitle()}</h2>
            </div>

            {/* Right - Search and Star icon, same width as left */}
            <div className="w-20 flex items-center justify-end space-x-2 relative">
                {/* Desktop Search Input */}
                <div className="hidden md:flex items-center relative">
                    <SearchIcon className="absolute left-2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="pl-8 pr-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Mobile search toggle */}
                <div className="md:hidden relative">
                    <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle Search">
                        <SearchIcon />
                    </button>
                    {searchOpen && (
                        <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="absolute right-0 top-10 w-40 pl-8 pr-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;














// import React, { useState } from "react";
// import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
// import SearchIcon from "@mui/icons-material/Search";

// import { useLocation } from "react-router-dom";
// import UserPlaceholder from "./UserPlaceholder";

// const Navbar = () => {
//     const [userData, setUserData] = useState(null);
//     const location = useLocation().pathname;

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
//             <div className="mx-auto md:mx-0">
//                 <img
//                     src="/twitter-logo.png"
//                     alt="Twitter Logo"
//                     width={"40px"}
//                     className="ml-8"
//                 />
//             </div>

//             <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
//                 <div className="flex justify-between items-center">
//                     <h2 className="font-bold text-2xl">
//                         {location.includes("profile") ? (
//                             <UserPlaceholder setUserData={setUserData} userData={userData} />
//                         ) : location.includes("explore") ? (
//                             "Explore"
//                         ) : (
//                             "Home"
//                         )}
//                     </h2>
//                     <StarBorderPurple500Icon />
//                 </div>
//             </div>

//             <div className="px-0 md:px-6 mx-auto">
//                 <SearchIcon className="absolute m-2" />
//                 <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
//             </div>
//         </div>
//     );
// };

// export default Navbar;