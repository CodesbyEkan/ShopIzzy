import { sequelize } from "../config/db.js";

import User from "./user.model.js";
import Product from "./product.model.js";
import Cart from "./cart.model.js";
import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

User.hasMany(Order);
Order.belongsTo(User);

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

Cart.belongsTo(User);
Cart.belongsTo(Product);

User.hasMany(Cart);
Product.hasMany(Cart);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

export { sequelize, User, Product, Cart, Order, OrderItem };
