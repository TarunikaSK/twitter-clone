import jwt from "jsonwebtoken";
import handleError from "./routes/error.js"

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(handleError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is invalid"));
        req.user = user;
        next();
    });
}

export default verifyToken;