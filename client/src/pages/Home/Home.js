import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import Feed from "../../components/Feed";

const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return null; // or a loader
    }

    return (
        <>  <div className="grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto">
            <div className="hidden md:block p-4">
                <LeftSidebar />
            </div>
            <div className="col-span-2 border-x px-4 min-h-screen">
                <Feed />
            </div>
            <div className="hidden lg:block p-4">
                <RightSidebar />
            </div>
        </div>
        </>
    );
};

export default Home;












// import React from "react";
// import LeftSidebar from "../../components/LeftSidebar";
// import RightSidebar from "../../components/RightSidebar";
// import Feed from "../../components/Feed";
// import Signin from "../SignIn/SignIn"

// import { useSelector } from "react-redux";


// const Home = () => {
//     const { currentUser } = useSelector((state) => state.user);

//     return (
//         <>
//             {!currentUser ? (
//                 <Signin />
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-4">
//                     <div className="px-6">
//                         <LeftSidebar />
//                     </div>
//                     <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
//                         <Feed />
//                     </div>
//                     <div className="px-6">
//                         <RightSidebar />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
// export default Home;