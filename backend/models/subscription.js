import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subscription = new Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
    },
    subscription: [{
        hash: String,
        isActive: Boolean,
        timestamps: { type: Date, default: Date.now }
    }],
});

module.exports = mongoose.model("subscription", subscription);
