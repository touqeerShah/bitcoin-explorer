const { MongoClient } = require("mongodb");

/**
 * it will run before every thing and it should be connected
 * @param {*} url mongoDB url
 * @returns
 */
module.exports.connectMongoDB = async (url) => {
    try {
        console.log(url);
        const client = new MongoClient(url);
        // Use connect method to connect to the server
        await client
            .connect()
            .then(() => {
                console.log("Connected successfully to MongoDB");
            })
            .catch((error) => {
                console.log(
                    "Error To connect MongoDB try again after 5 second", error
                );
                process.exit(0);
            });

        return client;
    } catch (error) {
        console.log("Error To connect MongoDB try again after 5 second");
    }
};
