const {getUser}=require('../service/auth');

function checkForAuthenticated(req,res,next) {
    const token = req.cookies?.token;
      req.user = null;

    if (!token) {
      
        return next();
    }

    const user = getUser(token);
    req.user = user;
    return next();
}


function restrictTo(roles = []) {
    return function(req, res, next) {
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) {
            return res.status(403).end("you are not authorized to access this route");
        }
        return next();
    }
}

module.exports={checkForAuthenticated, restrictTo};