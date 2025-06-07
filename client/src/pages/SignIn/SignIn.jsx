import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signin", { username, password });
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            dispatch(loginFailed());
            console.log(err);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex items-center justify-evenly w-[90%] max-w-7xl">
                {/* Twitter Logo */}
                <div className="hidden md:block">
                    <img
                        className="ml-5"
                        width="300px"
                        src="/images/twitter-logo.png"
                        alt="twitter-logo"
                    />
                </div>

                {/* Login Form */}
                <div className="w-full md:w-1/2 max-w-md">
                    <div className="my-5">
                        <h1 className="font-bold text-5xl md:text-6xl text-center md:text-left">Happening now</h1>
                    </div>

                    <h2 className="mt-4 mb-6 text-2xl font-bold text-center md:text-left">Sign in</h2>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-[#1D9BF0] hover:bg-[#1a8cd8] transition-colors text-white font-semibold py-2 rounded-full"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;












// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
// import { useNavigate, Link } from "react-router-dom";

// import { TextField, Button, Typography, Paper } from "@mui/material";

// const SignIn = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         dispatch(loginStart());
//         try {
//             const res = await axios.post("/auth/signin", { username, password });
//             dispatch(loginSuccess(res.data));
//             navigate("/");
//         } catch (err) {
//             dispatch(loginFailed());
//             console.log(err);
//         }
//     };

//     return (
//         <div className=" pt-12 flex justify-center">
//             <Paper elevation={6} className="w-full max-w-md p-10 rounded-2xl shadow-xl ">
//                 <div className="mb-6 text-center">
//                     <Typography variant="h4" className="font-bold text-blue-600 mb-2">Welcome Back</Typography>
//                     <Typography variant="subtitle1" className="text-gray-500">Sign in to your account</Typography>
//                 </div>

//                 <form onSubmit={handleLogin} className="flex flex-col gap-6">
//                     <TextField
//                         label="Username"
//                         variant="outlined"
//                         fullWidth
//                         onChange={(e) => setUsername(e.target.value)}
//                     />

//                     <TextField
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         fullWidth
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                     <Button
//                         variant="contained"
//                         color="primary"
//                         type="submit"
//                         size="large"
//                         className="rounded-full bg-blue-500 hover:bg-blue-600 transition-all"
//                     >
//                         Sign In
//                     </Button>
//                 </form>

//                 <Typography variant="body2" className="text-center mt-6 text-gray-600">
//                     Don’t have an account?{" "}
//                     <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
//                         Sign up
//                     </Link>
//                 </Typography>
//             </Paper>
//         </div>
//     );
// };

// export default SignIn;








// import React, { useState } from "react";
// import axios from "axios";

// import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice"

// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         dispatch(loginStart());
//         try {
//             const res = await axios.post("/auth/signin", { username, password });
//             dispatch(loginSuccess(res.data));
//             navigate("/");
//             console.log("res", res.data);
//         } catch (err) {
//             dispatch(loginFailed());
//             console.log(err);
//         }
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         dispatch(loginStart());
//         try {
//             const res = await axios.post("/auth/signup", { username, email, password });
//             dispatch(loginSuccess(res.data));
//             navigate("/");
//             console.log("res", res.data);
//         } catch (err) {
//             dispatch(loginFailed());
//             console.log(err);
//         }
//     }

//     return (
//         <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
//             <h2 className="text-3xl font-bold text-center">Sign in</h2>

//             <input
//                 onChange={(e) => setUsername(e.target.value)}
//                 type="text" placeholder="Username" className="text-xl py-2 rounded-full px-4" />

//             <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password" placeholder="Password" className="text-xl py-2 rounded-full px-4" />

//             <button className="bg-blue-500 text-xl py-2 rounded-full px-4 text-white" onClick={handleLogin}>Sign in</button>

//             <p className="text-center text-xl">Don't have an account?</p>
//             <h2 className="text-3xl font-bold text-center">Sign up</h2>

//             <input
//                 onChange={(e) => setUsername(e.target.value)}
//                 type="text" placeholder="Username" className="text-xl py-2 rounded-full px-4" />

//             <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email" placeholder="Email" required className="text-xl py-2 rounded-full px-4" />

//             <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password" placeholder="Password" className="text-xl py-2 rounded-full px-4" />

//             <button
//                 onClick={handleSignup}
//                 className="bg-blue-500 text-xl py-2 rounded-full px-4 text-white" type="submit">Sign up</button>

//         </form>
//     )
// };
