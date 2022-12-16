const mongoose = require("mongoose");

const adminssionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    contact: {
        type: String,
    },
    domain: {
        type: String,
    },
    totalAmount: {
        type: String,
    },
    discountAmount: {
        type: String,
    },
    paidAmount: {
        type: Number,
    },
    dueAmount: {
        type: String,
    },
    duePayDate:{
        type: String,
    },
    remark:{
        type: String,
    }
});

module.exports = mongoose.model("admission", adminssionSchema);
