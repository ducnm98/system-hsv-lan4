var mongoose = require('mongoose');

module.exports = router => {
  router.get('/attendance/:id', (req, res, next) => {
    mongoose.model('attendance').findOne({ _id: req.params.id }, (err, result) => {
      if (err) return res.render('notFound');
      if (result) {
        return res.render('homePage/attendance', {
          sessionInfo: result,
          roles: req.user.roles
        })
      } else {
        return res.render('notFound')
      }
    })
  })
}