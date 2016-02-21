'use strict';

const request = require('request');
const R = require('ramda');
const Q = require('q');

const config = require('../config');

let getImageUrls = R.compose(R.pluck('url_image'), R.prop('wallpapers'));

module.exports = function (term) {

	let qs = {
		auth		: config.apikeys.alphacoders,
		method	: 'search',
		term		: term
	};

	return Q.nfcall(request.get, 'http://wall.alphacoders.com/api2.0/get.php', { qs: qs })
		.spread((response, body) => {
			let result = JSON.parse(body);

			return { imgs: getImageUrls(result) };
		});

};
