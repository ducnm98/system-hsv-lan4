var mongoose = require("mongoose");
var { updateAnalytics } = require("../../../services/socket");

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
      let numberOfYear = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.numberOfYear" },
        {
          $group: {
            _id: "$delegates.numberOfYear",
            num: { $sum: 1 }
          }
        }
      ]);
      let nation = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.nation" },
        {
          $group: {
            _id: "$delegates.nation",
            num: { $sum: 1 }
          }
        }
      ]);
      let isYouth = await mongoose.model("attendance").aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(`${req.params.id}`)
          }
        },
        { $unwind: "$delegates" },
        { $unwind: "$delegates.isYouth" },
        {
          $group: {
            _id: "$delegates.isYouth",
            num: { $sum: 1 }
          }
        }
      ]);
      let nameMax = await mongoose.model('delegates').find().sort({ birthDate: 1}).limit(1);
      let nameMin = await mongoose.model('delegates').find().sort({ birthDate: -1}).limit(1);
      let data = {
        religionGroup,
        genderGroup,
        isALeaderYouth,
        isALeaderAssociation,
        politic,
        partyMembers,
        typeOfDelegate,
        nation,
        isYouth,
        numberOfYear,
        nameMin,
        nameMax,
        _id: req.params.id
      };
      setTimeout(function() {
        console.log(data);
        updateAnalytics(data);
      }, 3000);
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
