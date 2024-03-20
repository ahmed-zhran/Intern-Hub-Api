const jwt = require('jsonwebtoken');
const constans = require("../utils/constants");
const passport = require('passport');
require('../utils/passport')(passport);
const CONFIG = require("../../config/config");
const { sendResponse } = require("../utils/util.service");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['Authorization'] || req.headers['authorization'];
        if (!authHeader) {
            const authGuard = passport.authenticate("cookie", { session: false });
            return authGuard(req, res, next); // Call authGuard with req, res, and next
        }
        else{
            const token = authHeader.split(`${CONFIG.authKey}`)[1];
            jwt.verify(token, CONFIG.jwt_encryption, (err, decoded) => {
                if (err) {
                    return sendResponse(res, constans.RESPONSE_BAD_REQUEST, err.message, {}, []);
                }
                // If token is valid, you can do something with the decoded token if needed
                req.user = decoded; // Assuming you want to attach decoded user to request object
                next(); // Proceed to the next middleware or route handler
            });
        }

     
    } catch (err) {
        return sendResponse(res, constans.RESPONSE_BAD_REQUEST, err.message, {}, []);
    }
}


module.exports = verifyToken;
