const Danceform = require("./danceform.model");

class Apply {
  constructor(items = [], totalQuantity = 0, totalFee = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalFee = totalFee;
  }

  async updateFees() {
    const danceformIds = this.items.map(function (item) {
      return item.danceform.id;
    });

    const danceforms = await Danceform.findMultiple(danceformIds);

    const deletableApplyItemDanceformIds = [];

    for (const applyItem of this.items) {
      const danceform = danceforms.find(function (prod) {
        return prod.id === applyItem.danceform.id;
      });

      if (!danceform) {
        // danceform was deleted!
        // "schedule" for removal from apply
        deletableApplyItemDanceformIds.push(applyItem.danceform.id);
        continue;
      }

      // danceform was not deleted
      // set danceform data and total Fee to latest Fee from database
      applyItem.danceform = danceform;
      applyItem.totalFee = applyItem.quantity * applyItem.danceform.fees;
    }

    if (deletableApplyItemDanceformIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableApplyItemDanceformIds.indexOf(item.danceform.id) < 0;
      });
    }

    // re-calculate apply totals
    this.totalQuantity = 0;
    this.totalFee = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalFee = this.totalFee + item.fee;
    }
  }

  addItem(danceform) {
    const applyItem = {
      danceform: danceform,
      quantity: 1,
      fee: danceform.fees,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.danceform.id === danceform.id) {
        applyItem.quantity = +item.quantity + 1;
        applyItem.fee = item.fee + danceform.fees;
        this.items[i] = applyItem;

        this.totalQuantity++;
        this.totalFee += danceform.fees;
        return;
      }
    }

    this.items.push(applyItem);
    this.totalQuantity++;
    this.totalFee += danceform.fees;
  }

  updateItem(danceformId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.danceform.id === danceformId && newQuantity > 0) {
        const applyItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        applyItem.quantity = newQuantity;
        applyItem.fee = newQuantity * item.danceform.fees;
        this.items[i] = applyItem;

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalFee += quantityChange * item.danceform.fees;
        return { updatedItemFee: applyItem.totalFee };
      } else if (item.danceform.id === danceformId && newQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalFee -= item.fee;
        return { updatedItemFee: 0 };
      }
    }
  }
}

module.exports = Apply;
