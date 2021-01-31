"use strict";

const debug = require("debug");
const debugLog = debug("btcexp:router");

const fs = require('fs');
const v8 = require('v8');

const express = require('express');
const csurf = require('csurf');
const router = express.Router();
const util = require('util');
const moment = require('moment');
const bitcoinCore = require("bitcoin-core");
const qrcode = require('qrcode');
const bitcoinjs = require('bitcoinjs-lib');
const sha256 = require("crypto-js/sha256");
const hexEnc = require("crypto-js/enc-hex");
const Decimal = require("decimal.js");

const utils = require('./../app/utils.js');
const coins = require("./../app/coins.js");
const config = require("./../app/config.js");
const coreApi = require("./../app/api/coreApi.js");
const addressApi = require("./../app/api/addressApi.js");

const forceCsrf = csurf({ ignoreMethods: [] });




router.get("/dashboard", function(req, res, next) {
	res.locals.appStartTime = global.appStartTime;
	res.locals.memstats = v8.getHeapStatistics();
	res.locals.rpcStats = global.rpcStats;
	res.locals.electrumStats = global.electrumStats;
	res.locals.cacheStats = global.cacheStats;
	res.locals.errorStats = global.errorStats;

	res.locals.appConfig = {
		privacyMode: config.privacyMode,
		slowDeviceMode: config.slowDeviceMode,
		demoSite: config.demoSite,
		rpcConcurrency: config.rpcConcurrency,
		addressApi: config.addressApi,
		ipStackComApiAccessKey: !!config.credentials.ipStackComApiAccessKey,
		redisCache: !!config.redisUrl,
		noInmemoryRpcCache: config.noInmemoryRpcCache
	};

	res.render("admin/dashboard");

	next();
});


router.get('/heapdump', (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	debugLog(`Heap dump requested by IP ${ip}...`);

	if (ip == "127.0.0.1") {
		const filename = `./heapDump-${Date.now()}.heapsnapshot`;
		const heapdumpStream = v8.getHeapSnapshot();
		const fileStream = fs.createWriteStream(filename);
		heapdumpStream.pipe(fileStream);
		
		debugLog("Heap dump at startup written to", filename);

		res.status(200).send({msg: "successfully took a heap dump"});
	}
});



module.exports = router;
