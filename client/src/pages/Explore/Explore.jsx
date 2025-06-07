import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import ExploreTweets from "../../components/ExploreTweets";
import SignIn from "../SignIn/SignIn";

import { useSelector } from "react-redux";

const Explore = () => {
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
        <>
            {!currentUser ? (
                <SignIn />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="px-6">
                        <LeftSidebar />
                    </div>
                    <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
                        <ExploreTweets />
                    </div>
                    <div className="px-6">
                        <RightSidebar />
                    </div>
                </div>
            )}
        </>
    );
};

export default Explore;