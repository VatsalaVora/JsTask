import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => {
                const foundProduct = data.products.find((p) => p.id === parseInt(id));
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    navigate("/home"); // Redirect if product is not found
                }
            })
            .catch((err) => console.error("Error loading product:", err));
    }, [id, navigate]);

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists in the cart
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new product with quantity = 1
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    if (!product) return <h2>Loading...</h2>;

    return (
        <div className="product-detailsp">
            <button className="back-buttonp" onClick={() => navigate("/phome")}>⬅ Back</button>
            
            <div className="product-containerp">
                <div className="product-image-containerp">
                    <img src={product.thumbnail} alt={product.title} className="product-imagep" />
                </div>

                <div className="product-infop">
                    <h1>{product.title}</h1>
                    <p className="product-pricep">💰 Price: <strong>${product.price.toFixed(2)}</strong></p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Stock:</strong> {product.stock} left</p>
                    <p><strong>Rating:</strong> ⭐ {product.rating} / 5</p>

                    <button className="add-to-cartp" onClick={handleAddToCart}>🛒 Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
