var router = require('express').Router();

require('./getCode')(router);
require('./checking')(router);
require('./session')(router);
require('./create')(router);

module.exports = router