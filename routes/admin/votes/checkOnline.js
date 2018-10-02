var mongoose = require('mongoose');
var { redirectToLogin, errorProcess, errorWithMess, success } = require('../../../services/returnToUsers');
var { currentQuestion, areYouConnecting, updateNumberOfDelegatesOnVotes } = require('../../../services/socket');

module.exports = router => {
  router.post('/connected/:questionId', (req, res, next) => {
    if (req.isAuthenticated()) {
      let update = {
        $addToSet: {
          delegatesJoined: {
            delegatesId: req.user._id,
            delegateName: req.user.fullName
          }
        }
      }
      let option = { new: true }
      mongoose.model('votes').findOneAndUpdate({ _id: req.params.questionId }, update, option, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          console.log(result)
          updateNumberOfDelegatesOnVotes(result.delegatesJoined.length)
          return success(res, "Done", true);
        } else {
          return errorWithMess(res, "Fail");
        }
      })
    } else {
      return redirectToLogin(res);
    }
  });
 
  router.get('/connected/:sessionId/:questionId', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('attendance').findOne({ _id: req.params.sessionId }, (err, attendance) => {
        if (err) return errorProcess(res, err);
        if (attendance) {
          mongoose.model('votes').findOne({ _id: req.params.questionId }, (err, result) => {
            if (err) return errorProcess(res, err);
            if (result) {
              areYouConnecting(result._id)
              return success(res, "Done", true);
            } else {
              return errorWithMess(res, "Fail")
            }
          })
        } else {
          return errorWithMess(res, "Fail")
        }
      })
    } else {
      return redirectToLogin(res);
    }
  })
}