async function updateApplyFees(req, res, next) {
  const apply = res.locals.apply;

  await apply.updateFees();

  // req.session.apply = apply;
  next();
}

module.exports = updateApplyFees;