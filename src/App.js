import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [fromAmount, setFromAmount] = useState(1);
	const [toAmount, setToAmount] = useState(1);
	const [exchangeRate, setExchangeRate] = useState();

	useEffect(() => {
		fetch(BASE_URL)
			.then(res => res.json())
			.then(data => {
				const defaultCurrency = Object.keys(data.rates)[0];
				setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
				setFromCurrency(data.base);
				setToCurrency(defaultCurrency);
				setExchangeRate(data.rates[defaultCurrency]);
			});
	}, []);

	useEffect(() => {
		if (fromCurrency && toCurrency) {
			fetch(BASE_URL + `?base=${fromCurrency}&symbols=${toCurrency}`)
				.then(res => res.json())
				.then(data => setExchangeRate(data.rates[toCurrency]));
		}
	}, [fromCurrency, toCurrency]);

	const amountInputHandler = e => {
		const eventName = e.target.name;
		if (eventName === "from-currency") {
			const amount = e.target.value;
			setFromAmount(amount);
			setToAmount(amount * exchangeRate);
		}
		if (eventName === "to-currency") {
			const amount = e.target.value;
			setToAmount(amount);
			setFromAmount(amount / exchangeRate);
		}
	};

	return (
		<>
			<h1> Convert </h1>
			<CurrencyRow
				options={currencyOptions}
				selectedCurrency={fromCurrency}
				selected={e => setFromCurrency(e.target.value)}
				name="from-currency"
				amount={fromAmount}
				amountEnter={amountInputHandler}
			/>
			<div className="equals">=</div>
			<CurrencyRow
				options={currencyOptions}
				selectedCurrency={toCurrency}
				selected={e => setToCurrency(e.target.value)}
				name="to-currency"
				amount={toAmount}
				amountEnter={amountInputHandler}
			/>
		</>
	);
}

export default App;
