var router = require('express').Router();

require('./getCode')(router);
require('./checking')(router);
require('./session')(router);
require('./create')(router);
require('./list')(router);
require('./delete')(router);
require('./updateAvatar')(router);
require('./updateInfo')(router);
require('./changePassword')(router);

module.exports = router