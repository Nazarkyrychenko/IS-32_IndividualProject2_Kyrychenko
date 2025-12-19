import React from "react";
import "./Dark.scss";

export class Dark extends React.Component {
	componentDidMount() {
		this.applyTheme(this.props.theme);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.theme !== this.props.theme) {
			this.applyTheme(this.props.theme);
		}
	}

	applyTheme(theme) {
		document.body.classList.toggle("theme-dark", theme === "dark");
	}

	render() {
		return null;
	}
}