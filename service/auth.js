// const sessionIdToUserMap = new Map();

const jwt = require('jsonwebtoken');

const secretKey = 'Prashant@123$'; // Replace

function setUser( user) {
    // sessionIdToUserMap.set(sessionId, user);
   
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secretKey);
}


function getUser(token) {
    if (!token) {
        return null;
    }
    try {
         return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }  
}

module.exports = { setUser, getUser };