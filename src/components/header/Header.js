import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.scss";
import { Navbar } from "../navbar/NavBar";
import { AppContext } from "../../context/AppContext";
import { Button } from "../button/Button";

export const Header = () => {
	const ctx = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const wrapRef = useRef(null);

	useEffect(() => {
		const onKey = (e) => e.key === "Escape" && setOpen(false);
		const onClickOutside = (e) => {
			if (!open) return;
			const inside = wrapRef.current && wrapRef.current.contains(e.target);
			if (!inside) setOpen(false);
		};

		document.addEventListener("keydown", onKey);
		document.addEventListener("click", onClickOutside);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("click", onClickOutside);
		};
	}, [open]);

	return (
		<header className="header" ref={wrapRef}>
			<div className="container headerRow">
				<div className="logo">QuickNotes<span className="dot" /></div>

				<button
					className={open ? "burger burger--active" : "burger"}
					onClick={() => setOpen((v) => !v)}
					type="button"
					aria-expanded={open}
					aria-label="Меню"
				>
					<span />
					<span />
					<span />
				</button>

				<Navbar open={open} onNavigate={() => setOpen(false)} />

				<div className="headerRight">
					<Button
						text={ctx.state.theme === "dark" ? "Light" : "Dark"}
						click={ctx.toggleTheme}
					/>
				</div>
			</div>
		</header>
	);
};
