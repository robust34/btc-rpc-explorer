# ![BTC RPC Explorer](public/img/logo/logo-64.png) BTC RPC Explorer

Simple, stateless Bitcoin blockchain explorer, via RPC. Built with Node.js, express, bootstrap-v4.

This tool is intended to be a simple, stateless, self-hosted explorer for the Bitcoin blockchain, driven by RPC calls to your own bitcoind node. This tool is easy to run but lacks features compared to full-fledged (stateful) explorers.

I built this tool because I wanted to use it myself. Whatever reasons one might have for running a full node (trustlessness, technical curiosity, etc) it's helpful to appreciate the "fullness" of a node.

# Features

* List of recent blocks
* Browse blocks by height, in ascending or descending order
* View block details
* View transaction details, with navigation backward via spent outputs
* View raw JSON output used to generate most pages
* Mempool/unconfirmed transaction counts by fee (sat/B)

# Getting started

## Prerequisites

1. Install and run a full, archiving node - [instructions](https://bitcoin.org/en/full-node). Ensure that your node has full transaction indexing enabled (`txindex=1`) and the RPC server enabled (`server=1`).
2. Synchronize your node with the Bitcoin network.

## Instructions

1. Clone this repo
2. `npm install` to install all required dependencies
3. Optional: Uncomment the "bitcoind" section in [env.js](app/env.js) to automatically connect to the target node.
4. `npm start` to start the local server
5. Navigate to http://127.0.0.1:3002/
6. Connect using the RPC credentials for your target bitcoin node (if you didn't edit [env.js](app/env.js) in Step 3)

# Screenshots

### Connect via RPC
# ![Connect](public/img/screenshots/connect.png)

### Homepage (list of recent blocks)
# ![Connect](public/img/screenshots/home.png)

### Block Details
# ![Connect](public/img/screenshots/block.png)

### Transaction Details
# ![Connect](public/img/screenshots/transaction.png)

### Transaction, Raw JSON
# ![Connect](public/img/screenshots/transaction-raw.png)

### List of Blocks by height (in ascending order)
# ![Connect](public/img/screenshots/blocks.png)
