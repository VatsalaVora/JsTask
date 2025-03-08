import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductHome.css";

function ProductHome() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        
        if (loggedInUser) {
            setUser(loggedInUser);
        } else {
            navigate("/login"); 
        }

        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((err) => console.error("Error loading products:", err));
    }, [navigate]);

    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div className="product-home">
            {user && <h1>Welcome, {user.name}!</h1>}

            {Object.keys(groupedProducts).map((category) => (
                <div key={category} className="category-section">
                    <h2 className="category-title">{category.toUpperCase()}</h2>
                    <div className="product-list">
                        {groupedProducts[category].map((product) => (
                            <div 
                                key={product.id} 
                                className="product-card"
                                onClick={() => navigate(`/product/${product.id}`)} 
                            >
                                <img src={product.thumbnail} alt={product.title} className="product-image" />
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-price">${product.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductHome;
