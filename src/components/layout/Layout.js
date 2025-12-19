import React from "react";
import "./Layout.scss";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const Layout = ({ children }) => {
	return (
		<div className="app">
			<Header />
			<main className="container main">{children}</main>
			<Footer />
		</div>
	);
};
