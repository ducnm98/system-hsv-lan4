var mongoose = require('mongoose');
var { redirectToLogin, errorProcess, errorWithMess, success } = require('../../../services/returnToUsers');
var { currentQuestion } = require('../../../services/socket');

module.exports = router => {
  router.put('/question/:sessionId/:questionId', (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose.model('attendance').findOne({ _id: req.params.sessionId }, (err, attendance) => {
        if (err) return errorProcess(res, err);
        if (attendance) {
          mongoose.model('votes').findOne({ _id: req.params.questionId }, (err, votes) => {
            if (err) return errorProcess(res, err);
            if (votes) {
              let data = {
                question: votes.question,
                questionId: votes._id,
                totalDelegates: attendance.delegates.length,
              }
              currentQuestion(data);
              return success(res, "Done", data)
            } else {
              return errorWithMess(res, "votes not exits")
            }
          })
        } else {
          return errorWithMess(res, "Attendance not exits")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  })
}