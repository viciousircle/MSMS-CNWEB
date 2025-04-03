const { faker } = require("@faker-js/faker");
const Product = require("../models/product.model");

const seedProducts = async (count = 20) => {
    try {
        // Clear existing products
        await Product.deleteMany();
        console.log("Existing products cleared".yellow);

        const products = [];

        for (let i = 0; i < count; i++) {
            const product = {
                name: faker.commerce.productName(),
                image: faker.image.urlLoremFlickr({
                    category: "product",
                    https: true,
                }),
                price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
                stock: faker.number.int({ min: 0, max: 100 }),
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
        console.error("Error seeding products:".red, error);
        throw error;
    }
};

module.exports = seedProducts;
