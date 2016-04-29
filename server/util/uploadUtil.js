'use strict';

let mongoUtil = require("../util/mongoUtil");

function insertItem(collection, item, response, resultHandler) {
	if (!item) {
		return response.status(400).json({error: "Something went wrong!"});
	}

	collection.insertOne(item, function (err, doc) {
		if (err) {
			return response.status(400).send(err);
		}

		resultHandler(doc.insertedId.toString());
	});
}

function uploadFile(itemFileDb, file, itemId, response) {
	if (!file) {
		return response.status(200).json({itemId: itemId});
	}

	let readStream = mongoUtil.fileSystem().createReadStream(file.path);
	let uploadStream = readStream.pipe(itemFileDb.openUploadStream(itemId));
	uploadStream.on('error', function (error) {
		return response.status(400).send(error);
	});
	uploadStream.on('finish', function () {
		return response.status(200).json({itemId: itemId});
	});
}

module.exports = {
	uploadFile: uploadFile,
	insertCat: function (item, file, collection, itemFileDb, response) {
		insertItem(collection, item, response, function (itemId) {
			return uploadFile(itemFileDb, file, itemId, response);
		});
	}
};