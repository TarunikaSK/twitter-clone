// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div>
            {/* No header or footer */}
            <Outlet />
        </div>
    );
};

export default AuthLayout;





// import React from "react";

// const AuthHeader = () => {
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
//         </div>
//     );
// };

// export default AuthHeader;

