var router = require('express').Router();

require('./list')(router);
require('./create')(router);
require('./vote')(router);
require('./delete')(router);
require('./answer')(router);
require('./checkOnline')(router);
require('./time')(router);

module.exports = router;