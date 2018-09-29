var { redirectToLogin } = require('../../../services/returnToUsers');

module.exports = router => {
    router.get('/get-code', (req, res, next) => {
        if (req.isAuthenticated()) {

        } else {
            return redirectToLogin(res);
        }
    })
}