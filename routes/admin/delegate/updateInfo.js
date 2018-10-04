var { redirectToLogin, success, successWithNoData, errorProcess, errorWithMess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { StoreFile } = require("../../../services/uploadFile");
var { domain } = require('../../../config')

module.exports = router => {

  router.get('/update-info', (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.render('admin/delegates/uploadInfo');
    } else {
      return redirectToLogin(res);
    }
  })

  router.post('/update-info', StoreFile('delegates').any(), (req, res, next) => {
    if (req.isAuthenticated()) {
      req.files[0].link = req.files[0].destination.substring(6, req.files[0].destination.length) + req.files[0].filename;
      let link = domain + req.files[0].link;
      let update = {
        imageLink: link,
        ...req.body,
      }
      let option = { new: true }
      mongoose.model('delegates').findOneAndUpdate({ _id: req.user._id }, update, option, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return res.render('success');
        } else {
          return res.render('error500');
        }
      })
    } else {
      return redirectToLogin(res);
    }
  })
}