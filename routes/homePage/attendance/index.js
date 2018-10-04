var mongoose = require('mongoose');

module.exports = router => {
  router.get('/attendance/:id', async (req, res, next) => {
    try {
      let religionGroup = await mongoose.model('attendance').aggregate([{
        $group: {
          _id: delegates.religion,
          num: { $sum: 1}
        }
      }])
      let sessionInfo = await mongoose.model('attendance').findOne({ _id: req.params.id });
      console.log(religionGroup);
      return res.render('homePage/attendance', {
        sessionInfo,
        religionGroup
      })
    } catch (err) {
      if (err) return res.render('notFound')
    }
  })
}