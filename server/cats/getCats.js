'use strict';

let mongoUtil = require("../util/mongoUtil");
let downloadUtil = require("../util/downloadUtil");

module.exports = function (request, response) {
	let cats = mongoUtil.cats();
	return downloadUtil(cats, mongoUtil.catFileDb(), response);
};