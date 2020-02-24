import React from "react";

const CurrencyRow = props => {
	return (
		<div>
			<input
				name={props.name}
				type="number"
				className="input"
				value={props.amount}
				onChange={props.amountEnter}
			/>
			<select onChange={props.selected} value={props.selectedCurrency}>
				{props.options.map(option => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default CurrencyRow;
