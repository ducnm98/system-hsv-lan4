var mongoose = require("mongoose");

module.exports = router => {
  router.get("/attendance/:id", async (req, res, next) => {
    try {
      let religionGroup = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.religion" },
        {
          $group: {
            _id: "$delegates.religion",
            num: { $sum: 1 }
          }
        }
      ]);
      let sessionInfo = await mongoose
        .model("attendance")
        .findOne({ _id: req.params.id });
      let genderGroup = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.gender" },

        {
          $group: {
            _id: "$delegates.gender",
            num: { $sum: 1 }
          }
        }
      ]);
      console.log(religionGroup, genderGroup)
      return res.render("homePage/attendance", {
        sessionInfo,
        religionGroup,
        genderGroup
      });
    } catch (err) {
      console.log(err);
      if (err) return res.render("notFound");
    }
  });
};
