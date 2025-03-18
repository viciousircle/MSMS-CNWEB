const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/error.middleware");
const port = process.env.PORT || 5678;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./routes/product.routes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
