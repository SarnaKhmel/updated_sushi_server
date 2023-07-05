import { json } from "express";
import OrderModel from "../models/Order.js";

// export const getAll = async (req, res) => {
//   try {
//     const Orders = await OrderModel.find().populate("user").exec();
//     res.json(Orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500),
//       json({
//         message: "Cant find Orders",
//       });
//   }
// };

export const getAll = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("user").exec();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot find orders",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const OrderId = req.params.id;
    const doc = await OrderModel.findOneAndUpdate(
      {
        _id: OrderId,
      },

      {
        returnDocument: "after",
      }
    );

    if (!doc) {
      return res.status(404).json({
        message: "Error, cant found Order",
      });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant find Orders",
    });
  }
};

export const create = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      city,
      street,
      house,
      paymentMethod,
      changeAmount,
      comment,
      orderList,
      status,
      orderNumber,
    } = req.body;

    const doc = new OrderModel({
      name,
      phone,
      email,
      city,
      street,
      house,
      paymentMethod,
      changeAmount,
      comment,
      orderList,
      status,
      orderNumber,
    });

    const order = await doc.save();
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create Order",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const OrderId = req.params.id;
    const doc = await OrderModel.findOneAndDelete({
      _id: OrderId,
    });

    if (!doc) {
      return res.status(404).json({
        message: "Error, cant found Order",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant remove Orders",
    });
  }
};

export const update = async (req, res) => {
  console.log(req);
  try {
    const orderId = req.params.id;
    const updatedFields = {
      orderNumber: req.body.orderNumber,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      city: req.body.city,
      street: req.body.street,
      house: req.body.house,
      paymentMethod: req.body.paymentMethod,
      changeAmount: req.body.changeAmount,
      comment: req.body.comment,
      orderList: req.body.orderList,
      status: req.body.status,
    };
    const doc = await OrderModel.findByIdAndUpdate(orderId, updatedFields, {
      new: true,
    });
    if (!doc) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({
      message: "Cannot update Order",
    });
  }
};
