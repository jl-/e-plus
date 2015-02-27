/**
 *
 * Created by jl on 2/19/15.
 */


var keyMirror = require('../utils/keyMirror');

var CONFIG = {};


/// path
CONFIG.PATHS = {
    ASSETS_ROOT: '/assets'
};




/// payload_sources
CONFIG.PAYLOAD_SOURCES = 'SERVER,CLIENT';
CONFIG.PAYLOAD_SOURCES = keyMirror(CONFIG.PAYLOAD_SOURCES);

/// action_types
CONFIG.ACTION_TYPES = [
    'LOGIN_REQUEST',
    'LOGIN_RESPONSE',
    'MESSAGE_LIST_REQUEST',
    'MESSAGE_LIST_RESPONSE',
    'MESSAGE_ARCHIVE_REQUEST',
    'MESSAGE_ARCHIVE_RESPONSE'
];
CONFIG.ACTION_TYPES = keyMirror(CONFIG.ACTION_TYPES);

/// API
var domain = 'http://localhost:6002';

CONFIG.APIS = {
    LOGIN: domain + '/session',
    MESSAGE_LIST: domain + '/message'
};


module.exports = CONFIG;
