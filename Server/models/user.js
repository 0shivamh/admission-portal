const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    emp_id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    psw: {
        type: String,
    },
    phone: {
        type: Number,
    },
    designation:{
        type: String,
    }
});

module.exports = mongoose.model("employee", userSchema);
