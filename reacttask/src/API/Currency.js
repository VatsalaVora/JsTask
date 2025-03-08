import React, { useState, useEffect } from "react";

const API_KEY = "ef1216cbf470959358415ed688006d3c";
const API_URL = `https://api.exchangerate-api.com/v4/latest/`;

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}USD?apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setCurrencies(Object.keys(data.rates)))
      .catch((error) => console.error("Error fetching currency data:", error));
  }, []);

  const convertCurrency = async () => {
    try {
      const response = await fetch(`${API_URL}${fromCurrency}?apikey=${API_KEY}`);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={{ width: "48%", padding: "10px", borderRadius: "5px" }}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} style={{ width: "48%", padding: "10px", borderRadius: "5px" }}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <button onClick={convertCurrency} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Convert
      </button>
      {convertedAmount && (
        <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
          Converted Amount: {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
