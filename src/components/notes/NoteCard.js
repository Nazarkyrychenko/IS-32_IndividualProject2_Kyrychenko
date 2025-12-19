import React from "react";
import PropTypes from "prop-types";
import "./NoteCard.scss";
import { Button } from "../button/Button";

export const NoteCard = ({ note, onOpen, onRemove }) => {
	return (
		<article className="noteCard">
			<div className="noteTop">
				<span className="badge">{note.tag}</span>
				<span className="small muted">{new Date(note.createdAt).toLocaleString()}</span>
			</div>

			<h4 className="noteTitle">{note.title}</h4>
			<p className="noteText">{note.text}</p>

			<div className="noteActions">
				<Button text="Відкрити" click={onOpen} arg={note.id} />
				<Button text="Видалити" click={onRemove} arg={note.id} />
			</div>
		</article>
	);
};

NoteCard.propTypes = {
	note: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		tag: PropTypes.string.isRequired,
		createdAt: PropTypes.number.isRequired,
	}).isRequired,
	onOpen: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

