import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export const Navbar = ({ open, onNavigate }) => {
	return (
		<nav className={open ? "nav nav--open" : "nav"}>
			<NavLink to="/" className="navLink" onClick={onNavigate}>Home</NavLink>
			<NavLink to="/notes" className="navLink" onClick={onNavigate}>Notes</NavLink>
			<NavLink to="/settings" className="navLink" onClick={onNavigate}>Settings</NavLink>
		</nav>
	);
};
