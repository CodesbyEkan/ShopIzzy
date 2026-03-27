import { Order, Cart, Product, OrderItem } from "../models/index.js";

export const createOrder = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { UserId: req.user.id },
      include: Product,
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    // Calculate total
    cartItems.forEach((item) => {
      total += item.quantity * item.Product.price;
    });

    // Create order
    const order = await Order.create({
      UserId: req.user.id,
      total,
    });

    // Create order items
    const orderItems = await Promise.all(
      // iterates over promises
      cartItems.map((item) =>
        OrderItem.create({
          OrderId: order.id,
          ProductId: item.Product.id,
          quantity: item.quantity,
          price: item.Product.price,
        }),
      ),
    );

    // Clear cart items
    await Cart.destroy({
      where: { UserId: req.user.id },
    });

    res.json({
      message: "Order created successfully",
      order,
      items: orderItems,
    });
  } catch (err) {
    console.error("Error creating order.", err.message);
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: {
        model: Product,
        through: {
          attributes: ["quantity", "price"],
        },
      },
    });

    res.json(orders);
  } catch (err) {
    console.error("Error getting orders", err.message);
  }
};
