var mongoose = require("mongoose");
var {
  redirectToLogin,
  success,
  errorProcess,
  errorWithMess
} = require("../../../services/returnToUsers");
module.exports = router => {
  router.delete("/:id", (req, res, next) => {
    if (req.isAuthenticated()) {
      mongoose
        .model("delegates")
        .findOneAndDelete({ _id: req.params.id }, (err, result) => {
          if (err) return errorProcess(res, err);
          if (result) {
            return success(res, "Done");
          } else {
            return errorWithMess(res, "Not found");
          }
        });
    } else {
      return redirectToLogin(res);
    }
  });
};
