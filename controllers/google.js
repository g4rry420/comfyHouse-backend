const { OAuth2Client } = require("google-auth-library")
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.CLIENT_ID)
const User = require("../models/user")

exports.googleAuth = async (req, res, next) => {
    const { token } = req.body;

    let ticket;
    try {
        ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
    } catch (error) {
        next(error)
    }


    try {
        const { name, email } = ticket.getPayload();

        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { fullName: name } },
            { upsert: true, new: true }
        )

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        ///put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        return res.json({
            success: "Login successful",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        next(error)
    }
}