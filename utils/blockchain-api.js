const axios = require("axios");
const { Response, Transaction } = require("../classes")
const { nextConfig } = require("../next.config")
const { getTotalBTC, epochToDate, btcFiat } = require("./../lib")
async function getTransactionDetails(txHash, currency) {
    try {
        const { data } = await axios.get(`${nextConfig.env.BLOCKCHAIN_TRANSACTION_ENDPOINT}${txHash}/?format=json`, {});
        // console.log("total : ", getTotalBTC(data?.inputs));
        let receivedTime = epochToDate(data?.time)
        let totalInputBTC = await btcFiat(getTotalBTC(data?.inputs), currency)
        let totalOutputBTC = await btcFiat(getTotalBTC(data?.outputs), currency)
        let totalFeesBTC = await btcFiat(data?.fee, currency)
        let size = data?.size
        let confirmations = 0
        let status = data?.block.hasOwnProperty("mempool") ? "Pending" : "Conformed"
        if (status == "Conformed") {
            let latestBlock = await getLatestBlock();
            // console.log("latestBlock", latestBlock);

            confirmations = latestBlock?.data - data?.block?.height + 1
        }
        let transaction = new Transaction({ transactionHash: "", receivedTime, status, size, confirmations, totalInputBTC, totalOutputBTC, totalFeesBTC })
        // console.log("transaction=== >", transaction);
        return new Response({ status: 200, message: "Successful fetch Result", data: transaction })
    } catch (error) {
        // console.log(new Response({ status: 404, message: error.message, data: {} }));
        return new Response({ status: 404, message: error.message, data: {} })
    }

}

async function getUnconfirmedTransactionHash() {
    try {
        const { data } = await axios.get(`${nextConfig.env.BLOCKCHAIN_API_ENDPOINT}unconfirmed-transactions?format=json`, {});
        // console.log("data.txs[0]", data.txs[0].hash);
        return new Response({ status: 200, message: "Successful fetch Result", data: data.txs[0]["hash"] })
    } catch (error) {
        console.log(new Response({ status: 404, message: error.message, data: {} }));
        return new Response({ status: 404, message: error.message, data: {} })
    }

}

async function getLatestBlock() {
    try {
        const { data } = await axios.get(`${nextConfig.env.BLOCKCHAIN_API_ENDPOINT}latestblock?format=json`, {});
        // console.log("data.txs[0]", data.txs[0].hash);
        return new Response({ status: 200, message: "Successful fetch Result", data: data["height"] })
    } catch (error) {
        return new Response({ status: 404, message: error.message, data: 0 })
    }

}



module.exports = { getTransactionDetails, getUnconfirmedTransactionHash }