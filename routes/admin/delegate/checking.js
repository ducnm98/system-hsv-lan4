var { redirectToLogin, success, successWithNoData, errorProcess, errorWithMess } = require("../../../services/returnToUsers");
var mongoose = require('mongoose');
var { updateNumberOfDelegates, delegatesIn, delegatesOut } = require('../../../services/socket');
var { checkPermission } = require('../../../services/checkPermission');
var { TYPE_OF_ADMIN } = require("../../constants");
var { sendTypeOfUsers } = require('./analytics');
var _ = require('lodash');

module.exports = router => {
  router.get("/checking", (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        mongoose.model('attendance').find().exec((err, result) => {
          if (err) throw err;
          if (result) {
            return res.render("admin/delegates/checking", {
              sessionList: result,
              roles: req.user.roles
            });
          } else {
            return errorWithMess(res, "Not done");
          }
        })
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res);
    }
  });

  router.put("/checking/:sessionId/:id", async (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        try {
          sendTypeOfUsers(req.params.sessionId);
          let userInfo = await mongoose.model('delegates').findOne({ _id: req.params.id });
          if (userInfo) {
            let update = {
              $addToSet: {
                delegates: {
                  delegateId: userInfo._id,
                  delegateName: userInfo.fullName,
                  gender: userInfo.gender,
                  IdNumber: userInfo.IdNumber,
                  religion: userInfo.religion,
                  nation: userInfo.nation,
                  birthDate: userInfo.birthDate,
                  numberOfYear: userInfo.numberOfYear,
                  politic: userInfo.politic,
                  isALeaderYouth: userInfo.isALeaderYouth,
                  isALeaderAssociation: userInfo.isALeaderAssociation,
                  isYouth: _.isDate(userInfo.dateInYouthUnion),
                  partyMembers: userInfo.partyMembers,
                  typeOfDelegate: userInfo.typeOfDelegate,
                }
              }
            }
            let option = { new: true }
            let attendance = await mongoose.model('attendance').findOneAndUpdate({ _id: req.params.sessionId}, update, option)
            if (attendance) {
              updateNumberOfDelegates(attendance);
              delegatesIn(userInfo);
              return success(res, "Done", { userInfo, attendance, roles: req.user.roles });
            } else {
              return errorWithMess(res, 'Adding delegates fail')
            }
          } else {
            return errorWithMess(res, "Not found delegates")
          }
        } catch (err) {
          return errorWithMess(res, 'Adding delegates fail');
        }
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });

  router.delete("/checking/:sessionId/:id", async (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        try {
          sendTypeOfUsers(req.params.sessionId);
          let userInfo = await mongoose.model('delegates').findOne({ _id: req.params.id })
          if (userInfo) {
            let update = {
              $pull: {
                delegates: {
                  delegateId: userInfo._id,
                  delegateName: userInfo.fullName,
                  gender: userInfo.gender,
                  IdNumber: userInfo.IdNumber,
                  religion: userInfo.religion,
                  nation: userInfo.nation,
                  birthDate: userInfo.birthDate,
                  numberOfYear: userInfo.numberOfYear,
                  politic: userInfo.politic,
                  isALeaderYouth: userInfo.isALeaderYouth,
                  isALeaderAssociation: userInfo.isALeaderAssociation,
                  isYouth: _.isDate(userInfo.dateInYouthUnion),
                  partyMembers: userInfo.partyMembers,
                  typeOfDelegate: userInfo.typeOfDelegate,
                }
              }
            }
            let option = { new: true }
            let attendance = await mongoose.model('attendance').findOneAndUpdate({ _id: req.params.sessionId}, update, option)
            if (attendance) {
              updateNumberOfDelegates(attendance);
              delegatesOut(userInfo);
              return success(res, "Done", { userInfo, attendance, roles: req.user.roles });
            } else {
              return errorWithMess(res, 'Adding delegates fail')
            }
          } else {
            return errorWithMess(res, "Not found delegates")
          }
        } catch (err) {
          return errorProcess(res, err);
        }
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });

  router.put("/checking/:sessionId/mssv/:id", async (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        try {
          sendTypeOfUsers(req.params.sessionId);
          let userInfo = await mongoose.model('delegates').findOne({ IdNumber: req.params.id });
          if (userInfo) {
            let update = {
              $addToSet: {
                delegates: {
                  delegateId: userInfo._id,
                  delegateName: userInfo.fullName,
                  gender: userInfo.gender,
                  IdNumber: userInfo.IdNumber,
                  religion: userInfo.religion,
                  nation: userInfo.nation,
                  birthDate: userInfo.birthDate,
                  numberOfYear: userInfo.numberOfYear,
                  politic: userInfo.politic,
                  isALeaderYouth: userInfo.isALeaderYouth,
                  isALeaderAssociation: userInfo.isALeaderAssociation,
                  isYouth: _.isDate(userInfo.dateInYouthUnion),
                  partyMembers: userInfo.partyMembers,
                  typeOfDelegate: userInfo.typeOfDelegate,
                }
              }
            }
            let option = { new: true }
            let attendance = await mongoose.model('attendance').findOneAndUpdate({ _id: req.params.sessionId}, update, option)
            if (attendance) {
              updateNumberOfDelegates(attendance);
              delegatesIn(userInfo);
              return success(res, "Done", { userInfo, attendance, roles: req.user.roles });
            } else {
              return errorWithMess(res, 'Adding delegates fail')
            }
          } else {
            return errorWithMess(res, "Not found delegates")
          }
        } catch (err) {
          return errorWithMess(res, 'Adding delegates fail');
        }
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });

  router.delete("/checking/:sessionId/mssv/:id", async (req, res, next) => {
    if (req.isAuthenticated()) {
      if(checkPermission(req.user.roles, TYPE_OF_ADMIN)) {
        try {
          sendTypeOfUsers(req.params.sessionId);
          let userInfo = await mongoose.model('delegates').findOne({ IdNumber: req.params.id })
          if (userInfo) {
            let update = {
              $pull: {
                delegates: {
                  delegateId: userInfo._id,
                  delegateName: userInfo.fullName,
                  gender: userInfo.gender,
                  IdNumber: userInfo.IdNumber,
                  religion: userInfo.religion,
                  nation: userInfo.nation,
                  birthDate: userInfo.birthDate,
                  numberOfYear: userInfo.numberOfYear,
                  politic: userInfo.politic,
                  isALeaderYouth: userInfo.isALeaderYouth,
                  isALeaderAssociation: userInfo.isALeaderAssociation,
                  isYouth: _.isDate(userInfo.dateInYouthUnion),
                  partyMembers: userInfo.partyMembers,
                  typeOfDelegate: userInfo.typeOfDelegate,
                }
              }
            }
            let option = { new: true }
            let attendance = await mongoose.model('attendance').findOneAndUpdate({ _id: req.params.sessionId}, update, option)
            if (attendance) {
              updateNumberOfDelegates(attendance);
              delegatesOut(userInfo);
              return success(res, "Done", { userInfo, attendance, roles: req.user.roles });
            } else {
              return errorWithMess(res, 'Adding delegates fail')
            }
          } else {
            return errorWithMess(res, "Not found delegates")
          }
        } catch (err) {
          return errorProcess(res, err);
        }
      } else {
        return res.redirect('/admin/votes/answers')
      }
    } else {
      return redirectToLogin(res)
    }
  });
};
