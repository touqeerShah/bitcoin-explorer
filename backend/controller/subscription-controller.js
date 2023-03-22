const Subscription = require("../models/subscription")
const { Response } = require("../classes")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.addAndUpdateSubscription = async (req, res) => {
    const {
        deviceId,
        hash,
    } = req.body;
    try {
        let subscriptionRecord = await Subscription.aggregate([
            {
                $match: {
                    deviceId: deviceId
                }
            },
            {
                $unwind: "$subscription"
            },
            {
                $sort: {
                    "subscription.timestamps": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    deviceId: {
                        $first: "$deviceId"
                    },
                    subscription: {
                        $push: "$subscription"
                    }
                }
            }
        ])
        if (subscriptionRecord.length == 0) {
            const history = new History({
                deviceId,
            });
            history.subscription.push({ hash })
            await history.save();
        } else {

            subscriptionRecord[0].subscription.push({ hash })

            await Subscription.updateOne({
                deviceId: deviceId
            }, {
                subscription: subscriptionRecord[0].subscription
            })
        }
        res.send(new Response({ status: 200, message: "Successfully add", data: subscriptionRecord[0] }))
        // console.log("subscriptionRecord", subscriptionRecord);
    } catch (error) {
        console.log("error", error.message);
        res.send(new Response({ status: error.code, message: error.message, data: {} }))
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.updateStatusSubscription = async (deviceId, hash) => {
    try {
        let subscriptionRecord = await Subscription.aggregate([
            {
                $match: {
                    deviceId: deviceId
                }
            },
            {
                $unwind: "$subscription"
            },
            {
                $sort: {
                    "subscription.timestamps": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    deviceId: {
                        $first: "$deviceId"
                    },
                    subscription: {
                        $push: "$subscription"
                    }
                }
            }
        ])
        if (subscriptionRecord.length != 0) {
            var foundIndex = subscriptionRecord[0].subscription.findIndex(element => element.hash == hash);
            subscriptionRecord[0].subscription[foundIndex].isActive = false;
            await Subscription.updateOne({
                deviceId: deviceId
            }, {
                subscription: subscriptionRecord[0].subscription
            })
        }
        return (new Response({ status: 200, message: "Successfully add", data: subscriptionRecord[0] }))
        // console.log("subscriptionRecord", subscriptionRecord);
    } catch (error) {
        console.log("error", error.message);
        return (new Response({ status: error.code, message: error.message, data: {} }))
    }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getSubscription = async (deviceId) => {
    try {

        console.log("hetete");

        const subscriptionRecord = await Subscription.find({
            deviceId, 'subscription.isActive': true
        }).sort({ 'subscription.timestamps': -1 });
        return (new Response({ status: 200, message: "query response", data: subscriptionRecord }))

    } catch (error) {
        return (new Response({ status: error.code, message: error.message, data: {} }))

    }
};
