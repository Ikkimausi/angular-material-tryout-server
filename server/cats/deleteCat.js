'use strict';

let mongoUtil = require("../util/mongoUtil");
let deleteUtil = require("../util/deleteUtil");

module.exports = function (request, response) {
	let catId = request.params.catId;
	let cats = mongoUtil.cats();
	let catFileDb = mongoUtil.catFileDb();

	return deleteUtil.deleteCat(catId, cats, catFileDb, response);
};