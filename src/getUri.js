'use strict';

const url      = require('url');
const percento = require('percento')();

const uris    = require('../config/uris');
const apiKeys = require('../config/apiKeys');

module.exports = (key, term) => {
    
    let urlObj = percento.resolve(uris[key], {
        term  : term,
        token : apiKeys[key]
    });
    
    return url.format(urlObj);

};
