'use strict';

let mongoUtil = require("../util/mongoUtil");

function deleteItemFromCollection(collection, itemId, response) {
	collection.deleteOne(mongoUtil.searchById(itemId), function (err, results) {
			if (err) {
				return response.status(400).send(err);
			}
			return response.json(results);
		}
	);
}

function deleteFile(itemFileDb, itemId, response, callback) {
	itemFileDb.find({filename: itemId}).toArray(function (err, documents) {
		if (err) {
			return response.status(400).send(err);
		}
		let doc = documents[0]; // should only be one!

		if (!doc) { // none found, delete item
			return callback();
		}

		itemFileDb.delete(doc._id, function (err) { // delete image
			if (err) {
				return response.status(400).send(err);
			}
			callback(); // delete item after image deletion
		});
	});
}

module.exports = {
	deleteFile: deleteFile,
	deleteCat: function (itemId, collection, itemFileDb, response) {
		deleteFile(itemFileDb, itemId, response, function () {
			return deleteItemFromCollection(collection, itemId, response);
		});
	}
};