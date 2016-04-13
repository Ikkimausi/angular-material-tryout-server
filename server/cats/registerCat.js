'use strict';

let mongoUtil = require("../util/mongoUtil");
let catUtil = require("../util/catUtil");
let uploadUtil = require("../util/uploadUtil");

module.exports = function (request, response) {
	let cat = catUtil.prepare(request.body);
	let part = request.files.file;

	return uploadUtil.insertCat(cat, part, mongoUtil.cats(), mongoUtil.catFileDb(), response);
};