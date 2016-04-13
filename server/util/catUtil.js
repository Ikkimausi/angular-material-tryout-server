"use strict";

module.exports = {
	prepare: function (cat) {
		if (cat.hasOwnProperty("gecastreerd")) {
			cat.gecastreerd = cat.gecastreerd === 'true';
		}

		return cat;
	}
};