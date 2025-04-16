export const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:5678/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.map((product) => ({
            ...product,
            img: product.image.replace(/^"+|"+$/g, ''),
            colors: product.colors,
        }));
    } catch (error) {
        throw new Error('Failed to fetch products: ' + error.message);
    }
};
