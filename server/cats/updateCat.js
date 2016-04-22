'use strict';

let mongoUtil = require("../util/mongoUtil");
let catUtil = require("../util/catUtil");
let deleteUtil = require("../util/deleteUtil");
let uploadUtil = require("../util/uploadUtil");

module.exports = function (request, response) {
	let changes = catUtil.prepare(request.body);
	let catId = request.params.catId;
	let file = request.files.file;
	let props = changes ? Object.getOwnPropertyNames(changes) : null;

	if (!props && !file) { // No changes and no new file
		return response.sendStatus(200);
	}

	if (!props || props.length == 0) { // no changes => update file
		return updateFile(catId, file, response)
	}

	let collection = mongoUtil.cats();

	// changes => update object
	collection.update(mongoUtil.searchById(catId), {$set: changes}, (err, doc) => {
		if (err) {
			return response.status(400).send(err);
		}
		// update file
		return updateFile(catId, file, response)
	});
};

function updateFile(catId, file, response) {
	let itemFileDb = mongoUtil.catFileDb();
	if (file) { // when file => delete previous and add new
		return deleteUtil.deleteFile(itemFileDb, catId, response, function () {
			uploadUtil.uploadFile(itemFileDb, file, catId, response);
		});
	} // No file => return okay
	return response.sendStatus(200);
}