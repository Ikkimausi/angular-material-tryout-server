'use strict';

let express = require('express');
let router = express.Router();
let multiparty = require('connect-multiparty');
let multipartyMiddleware = multiparty();

router.route("/")
	.get(require('./getCats'))
	.post(multipartyMiddleware, require('./registerCat'));

router.route("/:catId")
	.get(require('./getCatById'))
	.put(multipartyMiddleware, require('./updateCat'))
	.delete(require('./deleteCat'));

module.exports = router;