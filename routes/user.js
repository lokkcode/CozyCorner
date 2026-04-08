const express = require("express");
const router = express.Router({mergeParams: true});
const User =   require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//MVC framework
const userController = require("../controllers/users.js")


router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,  // middleware.js me local var me save kiya hain
        passport.authenticate("local", {
        failureRedirect:"/login",
        failureFlash:true
    }), 
    userController.login
    );


router.get("/logout", userController.logout);


module.exports = router;
