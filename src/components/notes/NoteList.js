import React from "react";
import "./NoteList.scss";
import { NoteCard } from "./NoteCard";

export const NoteList = ({ notes, onOpen, onRemove }) => {
	return (
		<div className="card fade-in">
			<h3>Список нотаток</h3>

			{notes.length ? (
				<div className="noteGrid">
					{notes.map((n) => (
						<NoteCard key={n.id} note={n} onOpen={onOpen} onRemove={onRemove} />
					))}
				</div>
			) : (
				<p className="muted">Поки що нотаток немає — додай першу 🙂</p>
			)}
		</div>
	);
};
