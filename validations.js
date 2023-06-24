import { body } from "express-validator";

export const registerValidation = [
  body("email", "bad email").isEmail(),
  body("password", "bad pass").isLength({ min: 6 }),
  body("fullName", "bad name").isLength({ min: 3 }),
  body("avatarUrl", "bad url").optional().isURL(),
];

export const loginValidation = [
  body("email", "bad email").isEmail(),
  body("password", "bad pass").isLength({ min: 6 }),
];

export const postCreateValidation = [
  body("title", "bad title").isLength({ min: 3 }).isString(),
  body("text", "bad text").isLength({ min: 3 }).isString(),
  body("imageUrl", "bad image url ").optional().isString(),
];

export const productCreateValidation = [
  body("name", "bad name").isLength({ min: 3 }).isString(),
  body("text", "bad text").isLength({ min: 3 }).isString(),
  body("weight", "bad weight").isFloat(),
  body("sale", "bad sale").isBoolean(),
  body("price", "bad price").isFloat(),
  body("type", "bad type").isString(),
  body("week_sale", "bad week_sale").optional().isBoolean(),
  body("old_price", "bad old_price").optional().isString(),
  body("imageUrl", "bad image url ").optional().isString(),
];

export const orderCreateValidation = [
  body("name", "Ім'я повинно містити принаймні 3 символи")
    .isLength({ min: 3 })
    .isString(),
  body("phone", "Некоректний номер телефону").isMobilePhone(),
  body("email", "Некоректна електронна адреса").isEmail(),
  body("city", "Місто повинно бути рядком").isString(),
  body("street", "Вулиця повинна бути рядком").isString(),
  body("house", "Будинок повинен бути рядком").isString(),
  body("floor", "Поверх повинен бути рядком").optional().isString(),
  body("apartment", "Квартира повинна бути рядком").optional().isString(),
  body("entrance", "Під'їзд повинен бути рядком").optional().isString(),
  body("deliveryType", "Тип доставки повинен бути рядком").isString(),
  body("paymentMethod", "Форма оплати повинна бути рядком").isString(),
  body("changeAmount", "Сума для решти повинна бути рядком")
    .optional()
    .isString(),
  body("comment", "Коментар повинен бути рядком").optional().isString(),
  body("orderList", "Помилка списку замовлень").isObject(),
  body("status", "Помилка статусу замовленя").isString(),
];

export const passwordChangeValidation = [
  body("oldPassword", "bad pass old").isLength({ min: 6 }),
  body("newPassword", "bad pass new").isLength({ min: 6 }),
  body("id", "bad pass new").isLength({ min: 6 }),
];
