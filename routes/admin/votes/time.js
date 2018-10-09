var mongoose = require('mongoose');
var { errorProcess, success, successWithNoData, redirectToLogin } = require('../../../services/returnToUsers');
var moment = require('moment');

module.exports = router => {
  router.post('/time', (req, res, next) => {
    if (req.isAuthenticated()) {
      let insert = {
        open: moment(req.body.open).utc(7),
        close: moment(req.body.close).utc(7)
      }
      mongoose.model('times').create(insert, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return success(res, "Done", result)
        } else {
          return successWithNoData(res, "Not done")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  });

  router.get('/isOpen', async (req, res, next) => {
    if (req.isAuthenticated()) {
      let times = await mongoose.model('times').find();
      let timesNow = times[times.length - 1];
      let now = moment().utc(7)
      if (timesNow.open < now && timesNow.close > now) {
        return success(res, "Done", true);
      } else {
        return success(res, "Done", false)
      }
    } else {
      return redirectToLogin(res);
    }
  })

  router.delete('/time/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('times').findOneAndRemove({ _id: req.params.id }, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          return success(res, "Done", result)
        } else {
          return successWithNoData(res, "Not done")
        }
      })
    } else {
      return redirectToLogin(res);
    }
  })
}