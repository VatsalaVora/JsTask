import React, { useEffect, useState } from "react";
import "./OrdersHistory.css";

function OrdersHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders.map(order => ({
            ...order,
            status: order.status || "Placed",
            lastUpdated: order.lastUpdated || Date.now()
        })));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrders(prevOrders => {
                const updatedOrders = prevOrders.map(order => {
                    if (order.status !== "Delivered") {
                        const elapsedTime = Date.now() - order.lastUpdated;
                        if (elapsedTime >= 60000) { // 1-minute update
                            return {
                                ...order,
                                status: getNextStatus(order.status),
                                lastUpdated: Date.now()
                            };
                        }
                    }
                    return order;
                });

                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                return updatedOrders;
            });
        }, 5000); // Checking every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const getNextStatus = (currentStatus) => {
        switch (currentStatus) {
            case "Placed": return "Shipped";
            case "Shipped": return "Out for Delivery";
            case "Out for Delivery": return "Delivered";
            default: return "Delivered";
        }
    };

    // Remove order history
    const clearOrderHistory = () => {
        localStorage.removeItem("orders");
        setOrders([]); // Clear orders from UI
    };

    return (
        <div className="orders-history-wrapper">
            <h2>🛍️ Order History</h2>

            {orders.length > 0 && (
                <div className="clear-history-container">
                    <button className="clear-history-btn" onClick={clearOrderHistory}>
                        🗑️
                    </button>
                </div>
            )}

            {orders.length === 0 ? (
                <p className="no-orders">No past orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <div className="order-info">
                                <h3>Order #{index + 1}</h3>
                                <p>{order.date} | 💲{order.totalPrice}</p>
                                <p>🛒 {order.paymentMethod}</p>
                            </div>

                           <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, i) => (
                                        <tr key={i}>
                                            <td><img src={item.thumbnail} alt={item.title} className="order-img" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.quantity}</td>
                                            <td>💲{(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {order.status === "Delivered" ? (
                                <p className="delivered-message">✅ Delivered Successfully!</p>
                            ) : (
                                <div className="progress-bar">
                                    {["Placed", "Shipped", "Out for Delivery", "Delivered"].map((step, stepIndex) => (
                                        <div key={stepIndex} className={`progress-step ${step === order.status ? "active" : stepIndex < getStatusIndex(order.status) ? "completed" : ""}`}>
                                            <span>{getStepIcon(step)}</span>
                                            <p className="step-label">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const getStatusIndex = (status) => {
    const statuses = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
    return statuses.indexOf(status);
};

const getStepIcon = (step) => {
    switch (step) {
        case "Placed": return "📦";
        case "Shipped": return "🚚";
        case "Out for Delivery": return "🏠";
        case "Delivered": return "✅";
        default: return "⏳";
    }
};

export default OrdersHistory;
