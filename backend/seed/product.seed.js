const { faker } = require('@faker-js/faker');
const Product = require('../models/product.model');
const colors = require('colors');

// Predefined images from JSON
const productImages = [
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone16hero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1723234230295',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-studio-select-202503?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1739499054120',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-mini-digitalmat-gallery-1-202410?wid=730&hei=666&fmt=png-alpha&.v=1727279895834',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipadpro11-digitalmat-gallery-2-202404?wid=728&hei=666&fmt=png-alpha&.v=1713308651870',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451276',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724041669458',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp-14-digitalmat-gallery-1-202410?wid=728&hei=666&fmt=png-alpha&.v=1728342371746',
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-digitalmat-gallery-2-202410?wid=728&hei=666&fmt=png-alpha&.v=1729266243103',
];

// Common product colors
const availableColors = [
    'Black',
    'White',
    'Silver',
    'Gold',
    'Space Gray',
    'Blue',
    'Red',
    'Green',
    'Pink',
    'Purple',
];

const seedProducts = async (count = 20) => {
    try {
        // Clear existing products
        await Product.deleteMany();
        console.log('Existing products cleared'.yellow);

        const products = [];

        for (let i = 0; i < count; i++) {
            const colorCount = faker.number.int({ min: 1, max: 3 });
            const usedColors = new Set();
            const colorVariants = [];

            while (colorVariants.length < colorCount) {
                const randomColor =
                    availableColors[
                        faker.number.int({
                            min: 0,
                            max: availableColors.length - 1,
                        })
                    ];

                if (!usedColors.has(randomColor)) {
                    usedColors.add(randomColor);
                    colorVariants.push({
                        color: randomColor,
                        stock: faker.number.int({ min: 0, max: 100 }),
                    });
                }
            }

            const product = {
                name: faker.commerce.productName(),
                image: productImages[i % productImages.length],
                price: parseFloat(
                    faker.commerce.price({ min: 10000000, max: 1000000000 })
                ),
                colors: colorVariants,
                rate: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
            };
            products.push(product);
        }

        await Product.insertMany(products);
        console.log(
            `${products.length} products seeded successfully`.green.bold
        );

        return products;
    } catch (error) {
        console.error('Error seeding products:'.red, error);
        throw error;
    }
};

module.exports = seedProducts;
