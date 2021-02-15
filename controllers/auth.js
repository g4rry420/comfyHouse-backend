const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const User = require("../models/user");

exports.signup = (req, res) => {

    const user = new User(req.body);
    user.save((error, user) => {
        if(error) {
            return res.status(400).json({
                error: "NOT able to save user in DB"
            })
        }

        return res.json({
            success: "User is created successfully",
            name: user.name,
            email: user.email,
            _id: user._id
        });
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "USER Email doesn't exists"
            })
        }

        if(!!!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password don't match"
            })
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        ///put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        // send response to frontend
        const { _id, fullName, email, role } = user;

        return res.json({
            success: "Login successful",
            token,
            user: {
                _id, fullName, email, role
            }
        })

    })
}

exports.signout = (req,res) => {

    res.clearCookie("token");


    res.json({
        message: "User Signout Successfully"
    })
}


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.currentUser && req.auth && (req.currentUser._id == req.auth._id);
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }

    next();
}