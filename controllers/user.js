const User = require("../model/user");
// const { v4: uuidv4 } = require("uuid");
const {setUser}=require('../service/auth');

async function handelUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });

    return res.redirect("/");
}

async function handelUserLogin(req, res) {
    const {  email, password } = req.body;
    const user=await User.findOne({ email, password });
    if(!user) return res.render("login", { message: "Invalid email or password" });
   
//    const sessionId = uuidv4();
   const token=await setUser(user);
   res.cookie("token", token);
     return res.redirect("/");
   
}


module.exports = { handelUserSignup, handelUserLogin };