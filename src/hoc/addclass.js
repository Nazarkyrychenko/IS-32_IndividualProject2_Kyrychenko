import React from "react";

export const addClass = (WrappedComponent, className) => {
	return function WithClass(props) {
		return (
			<div className={className}>
				<WrappedComponent {...props} />
			</div>
		);
	};
};
