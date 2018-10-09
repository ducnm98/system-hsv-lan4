var mongoose = require('mongoose');
var { redirectToLogin, errorProcess, errorWithMess, successWithNoData, success } = require('../../../services/returnToUsers');
var { answerChange } = require('../../../services/socket');

module.exports = router => {
  router.get('/answers', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.render('admin/vote/answers', { roles: req.user.roles })
    } else {
      return redirectToLogin(res)
    }
  });

  router.get('/next-question', (req, res, next) => {
    if (req.isAuthenticated()) {
      let query = {
        'delegatesJoined.delegatesId': {
          $ne: req.user._id
        }
      }
      mongoose.model('votes').find(query, (err, result) => {
        if (err) console.log(err);
        if (result) {
          return success(res, "Done", result)
        } else {
          return success(res, "Done", false)
        }
      })
    } else {
      return redirectToLogin(res);
    }
  })

  router.post('/question/:questionId/approve', (req, res, next) => {
    if (req.isAuthenticated()) {
      let update = {
        $addToSet: {
          approve: {
            delegatesId: req.user._id,
            delegateName: req.user.fullName
          },
          delegatesJoined: {
            delegatesId: req.user._id,
            delegateName: req.user.fullName
          }
        }
      };
      let option = {
        new: true
      }
      mongoose.model('votes').findOneAndUpdate({ _id: req.params.questionId }, update, option, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          answerChange(result);
          return successWithNoData(res, "Vote done")
        } else {
          return errorWithMess(res, "Vote fail")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  })

  router.post('/question/:questionId/disapprove', (req, res, next) => {
    if (req.isAuthenticated()) {
      let update = {
        $addToSet: {
          disApprove: {
            delegatesId: req.user._id,
            delegateName: req.user.fullName
          },
          delegatesJoined: {
            delegatesId: req.user._id,
            delegateName: req.user.fullName
          }
        }
      };
      let option = {
        new: true
      }
      mongoose.model('votes').findOneAndUpdate({ _id: req.params.questionId }, update, option, (err, result) => {
        if (err) return errorProcess(res, err);
        if (result) {
          answerChange(result);
          return successWithNoData(res, "Vote done")
        } else {
          return errorWithMess(res, "Vote fail")
        }
      })
    } else {
      return redirectToLogin(res)
    }
  })
}