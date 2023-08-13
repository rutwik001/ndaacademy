const Danceform = require("../models/danceform.model");

async function getApply(req, res) {
  res.render("customer/apply/apply");
}

async function addApplyItem(req, res, next) {
  let danceform;
  try {
    danceform = await Danceform.findById(req.body.danceformId);
  } catch (error) {
    next(error);
    return;
  }

  const apply = res.locals.apply;

  apply.addItem(danceform);
  req.session.apply = apply;

  res.status(201).json({
    message: "Apply updated!",
    newTotalItems: apply.totalQuantity,
  });
}

function updateApplyItem(req, res) {
  const apply = res.locals.apply;

  const updatedItemData = apply.updateItem(
    req.body.danceformId,
    +req.body.quantity
  );

  req.session.apply = apply;

  res.json({
    message: "Item updated!",
    updatedApplyData: {
      newTotalQuantity: apply.totalQuantity,
      newTotalFee: apply.totalFee,
      updatedItemFee: updatedItemData.updatedItemFee,
    },
  });
}

module.exports = {
  addApplyItem: addApplyItem,
  getApply: getApply,
  updateApplyItem: updateApplyItem,
};
