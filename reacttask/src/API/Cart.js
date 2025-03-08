import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handleQuantityChange = (id, delta) => {
        const newCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        );
        updateCart(newCart);
    };

    const handleRemove = (id) => {
        const newCart = cart.filter((item) => item.id !== id);
        updateCart(newCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h1>🛒 Shopping Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty. <button onClick={() => navigate("/phome")}>Shop Now</button></p>
            ) : (
                <>
                    <div className="cart-list">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.thumbnail} alt={item.title} className="cart-image" />
                                <div className="cart-details">
                                    <h3>{item.title}</h3>
                                    <p>💰 Price: ${item.price.toFixed(2)}</p>
                                    <div className="cart-quantity">
                                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                    </div>
                                    <p><strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                                    <button className="remove-button" onClick={() => handleRemove(item.id)}>🗑 Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="check">
                        <h2 className="total-price">Total: 💲 {getTotalPrice()}</h2>
                        <button className="checkout-buttons" onClick={() => navigate("/checkout")}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
