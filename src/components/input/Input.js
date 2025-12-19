import React from "react";
import "./Input.scss";

export const Input = (props) => {
	const cls = ["input"];
	if (props.touched && !props.valid) cls.push("input--error");

	return (
		<div className="inputWrap">
			{props.label ? <div className="inputLabel">{props.label}</div> : null}

			<input
				className={cls.join(" ")}
				type={props.type || "text"}
				value={props.value}
				placeholder={props.placeholder || ""}
				onChange={props.onChange}
			/>

			{props.touched && !props.valid ? (
				<div className="inputError">{props.errorMessage || "Некоректне значення"}</div>
			) : null}
		</div>
	);
};
