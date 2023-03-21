# Blockchain Explorer
## Problem Statement:
In this challenge we want you to build a simple app, using either ReactJS or React Native,
which retrieves address and transaction information from the BTC blockchain. It also allows a
user to subscribe for changes to specific hashes. Each subscribed hash should generate a
notification on the UI. Furthermore, the user should be able to select in which currency the
values should be displayed (USD, EUR or BTC).

```
Bonus points will be awarded for the implementation of a functionality that retrieves the top 5
searched addresses and transactions.
```

## Expected Output:

- Address search; (it will be user address and we need to get following details)
- - Number of confirmed transactions
- - Total BTC received
- - Total BTC spent
- - Total BTC un?pen
- - Current address balance

- Transaction search; (get details about specific transaction with his hash)
- - Transaction hash
- - Received time
- - Status
- - Size (in bytes)
- - Num<er of confirmations (the successful act of a?ing a tran?action and ading it to the blockcain)
- - Total BTC input
- - Total BTC output
- - Total fees (paid to process this transaction)

## Technology and Framework 
- NodeJs (Backend with express server and REST API)
- Frontend React (NextJS Framework)
- Tailwind (for CSS framework )
- MongoDB (to store data)
- Chai and Mocha

## Blockchain Node 
I used open-source free API to get details for Bitcoin Transactions and address [![ Blockchain.com]()](https://www.blockchain.com/explorer/api/blockchain_api)  [for notification i am using Blockchain.com Websocket](https://www.blockchain.com/explorer/api/api_websocket)

```
// this will return details of user account
https://blockchain.info/address/bc1qk5pga4z53zf4hm0tqtf9nh3m454fdvwvnmh3z4?format=json

// this API will return upSpent Balance 
https://blockchain.info/unspent?active=bc1qk5pga4z53zf4hm0tqtf9nh3m454fdvwvnmh3z4 

// thus will return details related to transactions
https://api.blockchain.info/haskoin-store/btc/transaction/089b79b066685df7a03f06d8bc4f66bd05fbb2167301aab2cbd83e2e8ff586f4?format=json

```

## Test-case for functions response API

- First check API are Giving response on valid input.
- Second valid Response on Error and invalid input.
- Check response type is valid with class we define.
- Check response have all values are define and valid.
- Check some expected out from transaction response like size, total input , output  and fee.
