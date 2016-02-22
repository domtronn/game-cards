'use strict';

const R   = require('ramda');
const Q   = require('q');
const app = require('express')();
const morgan = require('morgan');

const getData      = require('./src/getData');
const getWallpaper = require('./src/getWallpaper');

let sanitise = R.compose(R.join(' '), R.split(/\-_/));

app.use(morgan('dev'));

app.param('term', (req, res, next, term) => {
  req.term = sanitise(term);
	next();
});

app.get('/game/:term', (req, res) => {
	Q.all([getWallpaper(req.term), getData(req.term)])
		.spread((a, b) => { res.json(R.merge(a, b)); });
});

app.listen(8811);
