import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import products from './data/products';
import users from './data/users';
import Order from './models/orderModel';
import Product from './models/productModel';
import User from './models/userModel';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all data from database
    await Order.deleteMany({}).exec();
    await Product.deleteMany({}).exec();
    await User.deleteMany({}).exec();

    // Insert data to database
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log(colors.green.inverse('Data imported!'));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`${error}`));
    process.exit(1); // 1: exit with failure
  }
};

const destroyData = async () => {
  try {
    // Clear all data from database
    await Order.deleteMany({}).exec();
    await Product.deleteMany({}).exec();
    await User.deleteMany({}).exec();

    console.log(colors.red.inverse('Data destroyed!'));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`${error}`));
    process.exit(1); // 1: exit with failure
  }
};

// Run command: node backend/seeder -d
// -d: destroy data
// -i: import data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
