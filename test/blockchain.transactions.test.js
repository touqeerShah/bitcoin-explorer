
const { assert, expect } = require("chai"); // Using Expect style
const { getTransactionDetails } = require("../utils")
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
});