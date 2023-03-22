const History = require("./../models/history")
const { Response } = require("../classes")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.addAndUpdateHistory = async (req, res) => {
    const {
        deviceId,
        searchValue,
    } = req.body;
    try {

        let historyRecord = await History.aggregate([
            {
                $match: {
                    deviceId: deviceId
                }
            },
            {
                $unwind: "$searchResults"
            },
            {
                $sort: {
                    "searchResults.timestamps": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    deviceId: {
                        $first: "$deviceId"
                    },
                    searchResults: {
                        $push: "$searchResults"
                    }
                }
            }
        ])
        if (historyRecord.length == 0) {
            const history = new History({
                deviceId,
            });
            history.searchResults.push({ search: searchValue })
            await history.save();
        } else {

            if (historyRecord[0].searchResults.length == 5) {
                historyRecord[0].searchResults.pop()
                historyRecord[0].searchResults.push({ search: searchValue })
            } else {

                historyRecord[0].searchResults.push({ search: searchValue })
                console.log(searchValue, "historyRecord", historyRecord[0].searchResults);

            }
            await History.updateOne({
                deviceId: deviceId
            }, {
                searchResults: historyRecord[0].searchResults
            })
        }
        res.send(new Response({ status: 200, message: "Successfully add", data: historyRecord[0] }))
        // console.log("historyRecord", historyRecord);
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
module.exports.getSearchHistory = async (req, res) => {
    const {
        deviceId,
    } = req.query;
    try {

        let historyRecord = await History.aggregate([
            {
                $match: {
                    deviceId: deviceId
                }
            },
            {
                $unwind: "$searchResults"
            },
            {
                $sort: {
                    "searchResults.timestamps": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    deviceId: {
                        $first: "$deviceId"
                    },
                    searchResults: {
                        $push: "$searchResults"
                    }
                }
            }
        ])

        res.send(new Response({ status: 200, message: "Successfully add", data: historyRecord[0] }))
        // console.log("historyRecord", historyRecord);
    } catch (error) {
        console.log("error", error.message);
        res.send(new Response({ status: error.code, message: error.message, data: historyRecord[0] }))
    }
};
