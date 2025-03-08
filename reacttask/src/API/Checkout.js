import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();
    const [cartTotal, setCartTotal] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        mobile: "",
        paymentMode: "Credit Card",
    });

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        setCartTotal(total);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Get cart and total price
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2);
        
        // Get past orders
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        
        // Save new order
        const newOrder = {
            date: new Date().toLocaleString(),
            items: cart,
            totalPrice: totalPrice,
            paymentMethod: formData.paymentMode
        };
        
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
    
        alert("Order Placed Successfully! 🎉");
        localStorage.removeItem("cart"); // Clear cart after checkout
        navigate("/orders");
    };
    

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Address</label>
                    <textarea name="address" required value={formData.address} onChange={handleChange}></textarea>
                </div>

                <div className="input-group">
                    <label>Mobile Number</label>
                    <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <label>Payment Mode</label>
                    <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                </div>

                <div className="order-summary">
                    <h2>Total Price: 💲 {cartTotal.toFixed(2)}</h2>
                    <button type="submit" className="place-order-btn">Place Order</button>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
