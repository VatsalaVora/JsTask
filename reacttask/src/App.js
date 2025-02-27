import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Counter</Link></li>
            <li><Link to="/stopwatch">StopWatch</Link></li>
            <li><Link to="/minicalc">Mini Calculator</Link></li>
            <li><Link to="/form-validation">Form</Link></li>
            <li><Link to="/counter-hooks">Counter Hooks</Link></li>
            <li><Link to="/user-hooks">User Hooks</Link></li>
            <li><Link to="/minicalc-hooks">MiniCalc Hooks</Link></li>
            <li><Link to="/demo-condition">Demo Condition</Link></li>
            <li><Link to="/form-hooks">Form(Hooks)</Link></li>
          </ul>
        </nav>

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
