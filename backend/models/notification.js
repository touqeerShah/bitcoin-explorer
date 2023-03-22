import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const notifications = new Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
    },
    notification: String,
    isNew: Boolean,
    isView: Boolean

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

module.exports = mongoose.model("notifications", notifications);
