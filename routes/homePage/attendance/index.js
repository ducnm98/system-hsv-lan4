var mongoose = require("mongoose");
var { updateAnalytics } = require('../../../services/socket');

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
      let isALeaderYouth = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.isALeaderYouth" },
        {
          $group: {
            _id: "$delegates.isALeaderYouth",
            num: { $sum: 1 }
          }
        }
      ]);
      let isALeaderAssociation = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.isALeaderAssociation" },
        {
          $group: {
            _id: "$delegates.isALeaderAssociation",
            num: { $sum: 1 }
          }
        }
      ]);
      let partyMembers = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.partyMembers" },
        {
          $group: {
            _id: "$delegates.partyMembers",
            num: { $sum: 1 }
          }
        }
      ]);
      let politic = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.politic" },
        {
          $group: {
            _id: "$delegates.politic",
            num: { $sum: 1 }
          }
        }
      ]);
      let typeOfDelegate = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.typeOfDelegate" },
        {
          $group: {
            _id: "$delegates.typeOfDelegate",
            num: { $sum: 1 }
          }
        }
      ]);
      let data = {
        religionGroup,
        genderGroup,
        isALeaderYouth,
        isALeaderAssociation,
        politic,
        partyMembers,
        typeOfDelegate,
        _id: req.params.id
      };
      setTimeout(function() {
        console.log('run here')
        updateAnalytics(data);
      }, 1500);
      console.log(religionGroup, genderGroup, isALeaderYouth, isALeaderAssociation, politic, partyMembers, typeOfDelegate)
      return res.render("homePage/attendance", {
        sessionInfo,
        religionGroup,
        genderGroup,
        isALeaderYouth,
        isALeaderAssociation,
        politic,
        partyMembers,
        typeOfDelegate
      });
    } catch (err) {
      console.log(err);
      if (err) return res.render("notFound");
    }
  });
};
