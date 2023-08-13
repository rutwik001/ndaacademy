const Apply = require('../models/apply.model');

function initializeApply(req, res, next) {
  let apply;

  if (!req.session.apply) {
    apply = new Apply();
  } else {
    const sessionApply = req.session.apply;
    apply = new Apply(
      sessionApply.items,
      sessionApply.totalQuantity,
      sessionApply.totalFee
    );
  }

  res.locals.apply = apply;

  next();
}

module.exports = initializeApply;
