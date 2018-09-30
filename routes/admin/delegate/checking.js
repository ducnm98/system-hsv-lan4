var { redirectToLogin, success, successWithNoData, errorProcess, errorWithMess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { updateNumberOfDelegates, delegatesIn, delegatesOut } = require('../../../services/socket');

module.exports = router => {
  router.get("/checking", (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('attendance').find().exec((err, result) => {
        if (err) throw err;
        if (result) {
          return res.render("admin/delegates/checking", {
            sessionList: result
          });
        } else {
          return errorWithMess(res, "Not done");
        }
      })
    } else {
      return redirectToLogin(res);
    }
  });

  router.put("/checking/:sessionId/:id", (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('delegates').findOne({ _id: req.params.id }).exec((err, userInfo) => {
        if (err) return errorProcess(res, err);
        if (userInfo) {
          let update = {
            $addToSet: {
              delegates: {
                delegateId: userInfo._id,
                delegateName: userInfo.fullName,
                gender: userInfo.gender,
              }
            }
          }
          let option = { new: true }
          mongoose.model('attendance').findOneAndUpdate({ _id: req.params.sessionId}, update, option, (err, attendance) => {
            if (err) return errorProcess(res, err);
            if (attendance) {
              updateNumberOfDelegates(attendance);
              delegatesIn(userInfo);
              return success(res, "Done", { userInfo, attendance });
            } else {
              return errorWithMess(res, 'Adding delegates fail')
            }
          })
        } else {
          return errorWithMess(res, "Not found delegates")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  });

  router.delete("/checking/:sessionId/:id", (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('delegates').findOne({ _id: req.params.id }).exec((err, userInfo) => {
        if (err) return errorProcess(res, err);
        if (userInfo) {
          let update = {
            $pull: {
              delegates: {
                delegateId: userInfo._id,
                delegateName: userInfo.fullName,
                gender: userInfo.gender,
              }
            }
          }
          let option = { new: true }
          mongoose.model('attendance').findOneAndUpdate({ _id: req.params.sessionId}, update, option, (err, attendance) => {
            if (err) return errorProcess(res, err);
            if (attendance) {
              updateNumberOfDelegates(attendance);
              delegatesOut(userInfo);
              return success(res, "Done", { userInfo, attendance });
            } else {
              return errorWithMess(res, 'Adding delegates fail')
            }
          })
        } else {
          return errorWithMess(res, "Not found delegates")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  });
};
