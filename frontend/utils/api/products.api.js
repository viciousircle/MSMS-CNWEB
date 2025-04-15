export const fetchProducts = async () => {
    const response = await fetch('http://localhost:5678/api/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const cleanedProducts = data.map((product) => ({
        ...product,
        img: product.image.replace(/^"+|"+$/g, ''),
        colors: product.colors,
    }));

    return cleanedProducts;
};
