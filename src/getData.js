'use strict';

const Q = require('q');
const R = require('ramda');
const request = require('request');

const config = require('../config');

let firstGame = R.compose(R.head, R.prop('games'));

let getName = R.compose(R.prop('name'), firstGame);
let getReleaseDate = R.compose((date) => (new Date(date)).getTime(), R.prop('release_date'), firstGame);

module.exports = function (term) {

    var options = {
        qs: { q: term,
              token: config.apikeys.igdb }
    };
	
	console.log(`GET https://www.igdb.com/api/v1/games/search?q=${term}`);
    return Q.nfcall(request.get, 'https://www.igdb.com/api/v1/games/search', options)
        .spread((response, body) => {

            let result = JSON.parse(body);

            return { name: getName(result),
                dueDate: getReleaseDate(result) };
        });

};
