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
    'PROFILE_RESPONSE',
    'MESSAGES_LIST_REQUEST',
    'MESSAGES_LIST_RESPONSE',
    'MESSAGES_ARCHIVE_REQUEST',
    'MESSAGES_ARCHIVE_RESPONSE',
    'MESSAGES_VIEW_CHANGE',
    'MESSAGES_DELETED',
    'MESSAGES_STATUS_CHANGED',
    'CALLS_LIST_REQUEST',
    'CALLS_LIST_RESPONSE',
    'CALLS_ARCHIVE_REQUEST',
    'CALLS_ARCHIVE_RESPONSE',
    'CALLS_VIEW_CHANGE',
    'CALLS_DELETED',
    'CALLS_STATUS_CHANGED',


    'CONTACTS_LIST_REQUEST',
    'CONTACTS_LIST_RESPONSE',
    'CONTACTS_ARCHIVE_RESPONSE',
    'CONTACTS_DELETED'
];
CONFIG.ACTION_TYPES = keyMirror(CONFIG.ACTION_TYPES);




/// API
////////////// dev
var domain = 'http://localhost:6002';
domain = 'http://ef-server.jlxy.cz';
CONFIG.APIS = {
    LOGIN: domain + '/sessions',
    //LOGIN: 'http://ef-server.jlxy.cz/sessions',
    PROFILE: domain + '/profiles',
    MESSAGES_LIST: domain + '/messages',
    DELETE_MESSAGES: domain + '/messages',
    CHANGE_MESSAGES_STATUS: domain + '/messages/status',

    CALLS_LIST: domain + '/calls',
    DELETE_CALLS: domain + '/calls',
    CHANGE_CALLS_STATUS: domain + '/calls/status',

    CONTACTS_LIST: domain + '/contacts',
    DELETE_CONTACTS: domain + 'contacts'
};

/////////// prop
//domain = 'http://vincent.wenyejy.com';
//CONFIG.APIS = {
//    LOGIN: domain + '/Admin/User/login',
//    MESSAGE_LIST: domain + '/Home/index/message'
//};

module.exports = CONFIG;
