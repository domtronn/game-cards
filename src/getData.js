'use strict';

// Imports
const Q       = require('q');
const R       = require('ramda');
const request = require('request');
const getUri  = require('./getUri');

// Helper Functions
let firstGame = R.compose(R.head, R.prop('games'));

let getName = R.compose(R.prop('name'), firstGame);
let getReleaseDate = R.compose((date) => (new Date(date)).getTime(), R.prop('release_date'), firstGame);

module.exports = function (term) {

    let uri = getUri('igdb', term);

    console.log(`GET ${uri}`);
    return Q.nfcall(request.get, uri).spread((response, body) => {
        let result = JSON.parse(body);

        return { name: getName(result),
            dueDate: getReleaseDate(result) };
    });

};
