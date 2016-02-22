'use strict';

// Imports
const Q       = require('q');
const R       = require('ramda');
const request = require('request');
const getUri  = require('./getUri');

// Helper Functions
const limit = 5;
let getImageUrls = R.compose(R.take(limit), R.pluck('url_image'), R.prop('wallpapers'));

module.exports = function (term) {

    let uri = getUri('alphacoders', term);

    console.log(`GET ${uri}`);
    return Q.nfcall(request.get, uri).spread((response, body) => {
        let result = JSON.parse(body);

        return { imgs: result.success && getImageUrls(result) };
    });

};
