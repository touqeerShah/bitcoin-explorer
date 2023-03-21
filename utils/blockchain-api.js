const axios = require("axios");
const { Response } = require("../classes")
const { nextConfig } = require("../next.config")
const { getTotalBTC } = require("./../lib")
async function getTransactionDetails(txHash) {
    try {
        const { data } = await axios.get(`${nextConfig.env.BLOCKCHAIN_TRANSACTION_ENDPOINT}${txHash}/?format=json`, {});
        console.log("total : ", getTotalBTC(data?.inputs));
        // console.log(new Response({ status: 200, message: "Successful fetch Result", data }));
        return new Response({ status: 200, message: "Successful fetch Result", data })
    } catch (error) {
        console.log(new Response({ status: 404, message: error.message, data: {} }));
        return new Response({ status: 404, message: error.message, data: {} })
    }

}

getTransactionDetails("089b79b066685df7a03f06d8bc4f66bd05fbb2167301aab2cbd83e2e8ff586f4")




module.exports = { getTransactionDetails }