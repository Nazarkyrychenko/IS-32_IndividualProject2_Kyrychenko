import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const HomePage = () => {
	const ctx = useContext(AppContext);

	return (
		<>
			<h1 className="h1">QuickNotes</h1>
			<p className="muted">Найпростіші нотатки: додав, знайшов, відкрив в модалці.</p>

			<div className="grid">
				<div className="card fade-in">
					<h3>Статистика</h3>
					<ul className="list">
						<li>Кількість нотаток: <b>{ctx.state.notes.length}</b></li>
						<li>Тема: <b>{ctx.state.theme}</b></li>
					</ul>
				</div>

				<div className="card fade-in">
					<h3>Порада</h3>
					<p className="muted">На сторінці Notes є пошук та фільтр за тегом.</p>
				</div>
			</div>
		</>
	);
};
