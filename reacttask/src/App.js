import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Counter from "./Counter";
import CounterHooks from "./CounterHooks";
import DemoCondition from "./DemoCondition";
import FormValidation from "./FormValidation";
import MiniCalc from "./MiniCalc";
import MinicalcHooks from "./MinicalcHooks";
import StopWatch from "./StopWatch";
import UserHooks from "./UserHooks";
import FormValidationHooks from "./FormValidationHooks";
import SignUp from "./Signup/SignUp";
import Login from "./Signup/Login";
import Home from "./Signup/Home";
import ForgotPassword from "./Signup/ForgotPassword";
import ChangePassword from "./Signup/ChangePassword";
import Profile from "./Signup/Profile";
import ToDoClass from "./ToDoClass";
import ToDoFunction from "./ToDoFunction";
import ToDoClassLocal from "./ToDoClassLocal";
import ToDoFunctionLocal from "./ToDoFunctionLocal";
import AddData from "./CRUD/AddData";
import ProductsApi from "./API/ProductsApi";
import AddDataApi from "./API/AddDataApi";
import EditDataApi from "./API/EditDataApi";
import DisplayDataApi from "./API/DisplayDataApi";
import ProductHome from "./API/ProductHome";
import ProductDetails from "./API/ProductDetails";
import Cart from "./API/Cart";
import Checkout from "./API/Checkout";
import OrdersHistory from "./API/OrdersHistory";
import NewsApi from "./API/NewsApi";
import Currency from "./API/Currency";

function NavbarDropdowns() {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    const selectedPage = event.target.value;
    if (selectedPage) {
      navigate(selectedPage);
    }
  };

  return (
    <header className="navbar">
      <div style={{ display: "flex", gap: "10px" }}>
        <select className="nav-dropdown" onChange={handleNavigation} defaultValue="">
          <option value="" disabled>Select Program</option>
          <option value="/">Counter</option>
          <option value="/stopwatch">StopWatch</option>
          <option value="/minicalc">Mini Calculator</option>
          <option value="/form-validation">Form</option>
          <option value="/counter-hooks">Counter Hooks</option>
          <option value="/user-hooks">User Hooks</option>
          <option value="/minicalc-hooks">MiniCalc Hooks</option>
          <option value="/demo-condition">Demo Condition</option>
          <option value="/form-hooks">Form(Hooks)</option>
          <option value="/ToDOClass">ToDOClass</option>
          <option value="/ToDoClassLocal">ToDoClassLocal</option>
          <option value="/ToDoFunction">ToDoFunction</option>
          <option value="/ToDoFunctionLocal">ToDoFunctionLocal</option>
          <option value="/adddata">CRUD</option>
        </select>
        
        <select className="nav-dropdown" onChange={handleNavigation} defaultValue="">
          <option value="" disabled>API Project CRUD</option>
          <option value="/products-api">Demo API</option>
          <option value="/add-api">Add Data</option>
          <option value="/display-api">Display Data</option>
          <option value="/news-api">News Data</option>
          <option value="/currency-api">Currency Data</option>
        </select>
      </div>
    </header>
  );
}

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    navigate("/login");  
  };

  return (
    <aside className="signup-sidebar">
      <a href="/phome" className="login-button">Home</a>
      <a href="/cart" className="login-button">Cart</a>
      <a href="/orders" className="login-button">Orders</a>
      <a href="/signup" className="signup-button">Sign Up</a>
      <a href="/login" className="login-button">Login</a>
      <a href="/changepassword" className="login-button">Change Password</a>
      <a href="/profile" className="login-button">Profile</a>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavbarDropdowns />
        <div className="main-content">
          <Sidebar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Counter />} />
              <Route path="/stopwatch" element={<StopWatch />} />
              <Route path="/minicalc" element={<MiniCalc />} />
              <Route path="/form-validation" element={<FormValidation />} />
              <Route path="/counter-hooks" element={<CounterHooks />} />
              <Route path="/user-hooks" element={<UserHooks />} />
              <Route path="/minicalc-hooks" element={<MinicalcHooks />} />
              <Route path="/demo-condition" element={<DemoCondition />} />
              <Route path="/form-hooks" element={<FormValidationHooks />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ToDOClass" element={<ToDoClass />} />
              <Route path="/ToDoFunction" element={<ToDoFunction />} />
              <Route path="/ToDoClassLocal" element={<ToDoClassLocal />} />
              <Route path="/ToDoFunctionLocal" element={<ToDoFunctionLocal />} />
              <Route path="/adddata" element={<AddData />} />
              <Route path="/products-api" element={<ProductsApi />} />
              <Route path="/add-api" element={<AddDataApi />} />
              <Route path="/edit-api/:id" element={<EditDataApi />} />
              <Route path="/display-api" element={<DisplayDataApi />} />
              <Route path="/phome" element={<ProductHome />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrdersHistory />} />
              <Route path="/news-api" element={<NewsApi />} />
              <Route path="/currency-api" element={<Currency />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
