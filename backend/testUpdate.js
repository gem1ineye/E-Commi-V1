const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to DB');
        const product = await Product.findOne({ name: /Nokia/i });
        if (!product) {
            console.log('Product not found');
            process.exit(1);
        }

        console.log('Current images:', product.images);

        const updated = await Product.findByIdAndUpdate(
            product._id,
            { images: [{ url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' }] },
            { new: true }
        );

        console.log('Updated images:', updated.images);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
