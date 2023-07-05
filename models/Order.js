import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    changeAmount: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    orderList: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    orderNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
OrderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const lastOrder = await this.constructor.findOne(
      {},
      {},
      { sort: { orderNumber: -1 } }
    );
    if (lastOrder && lastOrder.orderNumber) {
      this.orderNumber = lastOrder.orderNumber + 1;
    } else {
      this.orderNumber = 1;
    }
  }
  next();
});

export default mongoose.model("Order", OrderSchema);
