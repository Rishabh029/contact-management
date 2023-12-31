const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter the user name"]
    },
    email: {
        type: String,
        required: [true, "Please Add the contact email"],
        unique: [true, "Already an user"]

    },
    password: {
        type: String,
        required: [true, "Please enter the password"]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

