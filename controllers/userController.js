const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
// const Contact = require("../models/contactModel")

// Desc - Register the user
// route Post /api/users/
// Access will be public for now 

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All feilds are Mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Alerady Registered!");
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("working before ")

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log("working")
    console.log(user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User Data is not in valid ");
    }
    res.json({ message: "Register the user" })
});

// Desc - Login the user
// route Post /api/users/
// Access will be public for now 

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("User Data is not in valid ");
    }

    const user = await User.findOne({ email });
    // comapre pass with hash pass
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m",
            }
        )
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Login failed");
    }
});

// Desc - Current  user
// route Post /api/users
// Access will be private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser }