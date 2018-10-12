var { updateAnalytics } = require("../../../services/socket");
var mongoose = require("mongoose");

module.exports = {
  sendTypeOfUsers: async id => {
    let religionGroup = await mongoose.model("attendance").aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(`${id}`)
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
    let genderGroup = await mongoose.model("attendance").aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(`${id}`)
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
          _id: mongoose.Types.ObjectId(`${id}`)
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
          _id: mongoose.Types.ObjectId(`${id}`)
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
          _id: mongoose.Types.ObjectId(`${id}`)
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
          _id: mongoose.Types.ObjectId(`${id}`)
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
          _id: mongoose.Types.ObjectId(`${id}`)
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
    let data = {
      religionGroup,
      genderGroup,
      isALeaderYouth,
      isALeaderAssociation,
      politic,
      partyMembers,
      numberOfYear,
      typeOfDelegate,
      _id: id
    };
    updateAnalytics(data);
  }
};
