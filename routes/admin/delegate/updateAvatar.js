var mongoose = require('mongoose');
var { IS_STAFF } = require("../../constants");
var { checkPermission } = require('../../../services/checkPermission');
var { StoreFile } = require("../../../services/uploadFile");
var { domain } = require('../../../config')

module.exports = router => {
  router.post('/edit-avatar', StoreFile('delegates').any(), (req, res, next) => {
    if (req.isAuthenticated()) {
      if (checkPermission(req.user.roles, IS_STAFF)) {

        req.files[0].link = req.files[0].destination.substring(6, req.files[0].destination.length) + req.files[0].filename;
        let link = domain + '/' + req.files[0].link;
        let update = {
          imageLink: link,
        }
        let option = { new: true };
        mongoose.model('delegates').findOneAndUpdate({ _id: req.body.IdNumber }, update, option,  (err, result) => {
          if (err) return res.send(err);
          if (result) {
            return res.redirect('/admin/delegates')
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });
}