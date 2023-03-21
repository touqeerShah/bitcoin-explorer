
const { assert, expect } = require("chai"); // Using Expect style
const { getTransactionDetails, getUnconfirmedTransactionHash } = require("../utils")
const { Response, Transaction } = require("../classes")

describe("Transactions", async function () {
    let transactionHash;

    before(async () => {
        transactionHash = "089b79b066685df7a03f06d8bc4f66bd05fbb2167301aab2cbd83e2e8ff586f4"
        // console.log(block);
    });
    it("Check API Respond on valid Tx hash", async () => {
        let response = await getTransactionDetails(transactionHash);
        assert.equal(response.status, 200);
    });
    it("Check API Respond on invalid Tx hash", async () => {
        let response = await getTransactionDetails(transactionHash + 1);
        assert.equal(response.status, 404);
    });
    it("Check Response Instance", async () => {
        let response = await getTransactionDetails(transactionHash);
        assert.equal(response instanceof Response, true);
    });
    it("Check Response data is instance of Transaction class", async () => {
        let response = await getTransactionDetails(transactionHash);
        // console.log("response", response);
        assert.equal(response.data instanceof Transaction, true);
    });
    it("Check Transaction Received Time is Date instance", async () => {
        let response = await getTransactionDetails(transactionHash);
        // console.log("response", typeof response.data.receivedTime);
        assert.equal(new Date(response.data.receivedTime) instanceof Date, true);
    });
    it("Check no mine status should pending", async () => {
        let response = await getUnconfirmedTransactionHash();
        response = await getTransactionDetails(response.data);
        assert.equal(response.data.status, "Pending");
    });
    it("Check mine status should Conformed", async () => {
        let response = await getTransactionDetails(transactionHash);
        assert.equal(response.data.status, "Conformed");
    });

    it("Total input,output and fee BTC greater the Zero", async () => {
        let response = await getTransactionDetails(transactionHash);
        assert.isAbove(response.data.totalInputBTC, 0);
        assert.isAbove(response.data.totalOutputBTC, 0);
        assert.isAbove(response.data.totalFeesBTC, 0);
    });

    it("Block Size not equal to Zero", async () => {
        let response = await getTransactionDetails(transactionHash);
        assert.isAbove(response.data.size, 0);
    });
    it("confirmations  greater then zero if is status is conformed", async () => {
        let response = await getTransactionDetails(transactionHash);
        assert.equal(response.data.status, "Conformed");
        assert.isAbove(response.data.confirmations, 0);
    });

});