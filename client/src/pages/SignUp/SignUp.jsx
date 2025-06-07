import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signup", { username, email, password });
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            dispatch(loginFailed());
            console.log(err);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex justify-evenly items-center w-[90%] max-w-7xl min-h-[80vh]">
                {/* Twitter Logo */}
                <div className="hidden md:block">
                    <img
                        className="ml-5"
                        width="300px"
                        src="/images/twitter-logo.png"
                        alt="twitter-logo"
                    />
                </div>

                {/* Signup Form */}
                <div className="w-full md:w-1/2 max-w-md">
                    <div className="my-5">
                        <h1 className="font-bold text-5xl md:text-6xl text-center md:text-left">Join us today</h1>
                    </div>

                    <h2 className="mt-4 mb-6 text-2xl font-bold text-center md:text-left">Sign up</h2>

                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="outline-blue-500 border border-gray-300 px-4 py-2 rounded-full font-medium"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
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
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;






















// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";
// import { useNavigate, Link } from "react-router-dom";

// import { TextField, Button, Typography, Paper } from "@mui/material";

// const SignUp = () => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         dispatch(loginStart());
//         try {
//             const res = await axios.post("/auth/signup", { username, email, password });
//             dispatch(loginSuccess(res.data));
//             navigate("/");
//         } catch (err) {
//             dispatch(loginFailed());
//             console.log(err);
//         }
//     };

//     return (
//         <div className="pt-12 flex justify-center">
//             <Paper elevation={6} className="w-full max-w-md p-10 rounded-2xl shadow-xl">
//                 <div className="mb-6 text-center">
//                     <Typography variant="h4" className="font-bold text-indigo-600 mb-2">Create Account</Typography>
//                     <Typography variant="subtitle1" className="text-gray-500">Sign up to get started</Typography>
//                 </div>

//                 <form onSubmit={handleSignup} className="flex flex-col gap-6">
//                     <TextField
//                         label="Username"
//                         variant="outlined"
//                         fullWidth
//                         onChange={(e) => setUsername(e.target.value)}
//                     />

//                     <TextField
//                         label="Email"
//                         type="email"
//                         variant="outlined"
//                         fullWidth
//                         onChange={(e) => setEmail(e.target.value)}
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
//                         className="rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all"
//                     >
//                         Sign Up
//                     </Button>
//                 </form>

//                 <Typography variant="body2" className="text-center mt-6 text-gray-600">
//                     Already have an account?{" "}
//                     <Link to="/signin" className="text-indigo-500 font-semibold hover:underline">
//                         Sign in
//                     </Link>
//                 </Typography>
//             </Paper>
//         </div>
//     );
// };

// export default SignUp;

