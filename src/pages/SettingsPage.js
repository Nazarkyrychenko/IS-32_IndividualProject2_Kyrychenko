import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "../components/button/Button";

export const SettingsPage = () => {
	const ctx = useContext(AppContext);

	return (
		<>
			<h1 className="h1">Settings</h1>

			<div className="grid">
				<div className="card fade-in">
					<h3>Тема (Context)</h3>
					<p className="muted">Поточна тема: <b>{ctx.state.theme}</b></p>
					<Button text="Перемкнути тему" click={ctx.toggleTheme} />
				</div>

				<div className="card fade-in">
					<h3>Дані</h3>
					<p className="muted">Очистити всі нотатки (localStorage теж оновиться).</p>
					<Button text="Очистити нотатки" click={ctx.clearNotes} />
				</div>
			</div>
		</>
	);
};
