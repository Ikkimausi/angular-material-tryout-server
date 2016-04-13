'use strict';

let mongoUtil = require("../util/mongoUtil");
let catUtil = require("../util/catUtil");
let deleteUtil = require("../util/deleteUtil");
let uploadUtil = require("../util/uploadUtil");

module.exports = function (request, response) {
	let changes = catUtil.prepare(request.body);
	let catId = request.params.catId;
	let file = request.files.file;

	if (!changes) {
		return response.sendStatus(200);
	}

	let collection = mongoUtil.cats();
	let itemFileDb = mongoUtil.catFileDb();

	collection.update(mongoUtil.searchById(catId), {$set: changes}, (err, doc) => {
		if (err) {
			return response.status(400).send(err);
		}

		if(!file){
			return response.status(200).send(doc);
		}
		deleteUtil.deleteFile(itemFileDb, catId, response, function () {
			uploadUtil.uploadFile(itemFileDb, file, catId, response);
		});
	});
};