import React, { useEffect, useState } from "react";
import axios from "axios";

const Converter = () => {
  const [amount, setAmount] = useState(1); // Editable field for "From Currency"
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [currencyOptions, setCurrencyOptions] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/f52a364f0d5148aa549920c4/latest/${fromCurrency}`
        );

        setCurrencyOptions(Object.keys(response.data.conversion_rates));
        setConversionRate(response.data.conversion_rates);
      } catch (error) {
        console.log("Error getting currencies", error);
      }
    };

    fetchCurrencies();
  }, [fromCurrency]); // Re-fetch when fromCurrency changes

  // Calculate result when conversionRate and amount are available
  useEffect(() => {
    if (conversionRate && amount) {
      const calculatedResult = (amount * conversionRate[toCurrency]).toFixed(2);
      setResult(calculatedResult);
    }
  }, [amount, conversionRate, toCurrency]);

  return (
    <div className="p-6 bg-white/90 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Currency Converter
      </h1>
      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* From Currency Dropdown and Amount Input */}
        <div className="w-full md:w-1/2">
          <label className="block mb-2 text-gray-600 font-medium">
            From Currency ({fromCurrency})
          </label>
          <select
            onChange={(e) => setFromCurrency(e.target.value)}
            value={fromCurrency}
            className="p-2 border border-gray-300 rounded w-full"
          >
            {currencyOptions &&
              currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Enter amount"
          />
        </div>

        {/* To Currency Dropdown and Result */}
        <div className="w-full md:w-1/2">
          <label className="block mb-2 text-gray-600 font-medium">
            To Currency ({toCurrency})
          </label>
          <select
            onChange={(e) => setToCurrency(e.target.value)}
            value={toCurrency}
            className="p-2 border border-gray-300 rounded w-full"
          >
            {currencyOptions &&
              currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
          <input
            type="text"
            value={result || "0.00"}
            disabled
            className="p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      {/* Static message for conversion rate */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Conversion rate: {fromCurrency} = {conversionRate && conversionRate[toCurrency]}
      </p>
    </div>
  );
};

export default Converter;
