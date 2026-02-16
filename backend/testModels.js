const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const {
  User,
  Product,
  Category,
  Cart,
  Order,
  Review,
  
} = require("./models");

dotenv.config();

const testModels = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("\n🧪 Testing Model Creation...\n");
    
    // Clear old test data if it exists
    await Category.deleteMany({ name: "Electronics" });
    await Product.deleteMany({ name: "iPhone 15 Pro" });
    await User.deleteMany({ email: "test@test.com" });

    // Test 1: Create Category
    const category = await Category.create({
      name: "Electronics",
      description: "Electronic devices and accessories",
    });
    console.log("✅ Category created:", category.name);

    // Test 2: Create Product
    const product = await Product.create({
      name: "iPhone 15 Pro",
      description: "Latest iPhone with A17 Pro chip",
      price: 999,
      category: category._id,
      brand: "Apple",
      stock: 50,
      images: [{ url: "https://example.com/iphone.jpg", alt: "iPhone 15 Pro" }],
    });
    console.log("✅ Product created:", product.name);

    // Test 3: Create User
    const user = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: "hashedpassword123",
    });
    console.log("✅ User created:", user.name);

    // Test 4: Create Cart
    const cart = await Cart.create({
      user: user._id,
      items: [
        {
          product: product._id,
          quantity: 2,
          price: product.price,
        },
      ],
    });
    console.log("✅ Cart created for user:", user.email);

    // Test 5: Create Order
    const order = await Order.create({
      user: user._id,
      items: [
        {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0].url,
        },
      ],
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      payment: {
        method: "card",
        status: "completed",
      },
      pricing: {
        subtotal: 999,
        tax: 99.9,
        shipping: 0,
        discount: 0,
        total: 1098.9,
      },
    });
    console.log("✅ Order created:", order.orderNumber);

    // Test 6: Create Review
    const review = await Review.create({
      product: product._id,
      user: user._id,
      rating: 5,
      title: "Excellent product!",
      comment: "Love this phone, highly recommended!",
    });
    console.log("✅ Review created for product:", product.name);

    

    console.log("\n🎉 All models tested successfully!\n");

    // Clean up test data
    console.log("🧹 Cleaning up test data...");
    await Category.deleteOne({ _id: category._id });
    await Product.deleteOne({ _id: product._id });
    await User.deleteOne({ _id: user._id });
    await Cart.deleteOne({ _id: cart._id });
    await Order.deleteOne({ _id: order._id });
    await Review.deleteOne({ _id: review._id });

    console.log("✅ Test data cleaned up\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error testing models:", error);
    process.exit(1);
  }
};

testModels();
