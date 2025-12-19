import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NoteForm } from "../components/notes/NoteForm";
import { NoteList } from "../components/notes/NoteList";

export const NotesPage = () => {
	const ctx = useContext(AppContext);

	return (
		<>
			<h1 className="h1">Notes</h1>

			<div className="toolbar">
				<input
					className="search"
					value={ctx.state.query}
					onChange={(e) => ctx.setQuery(e.target.value)}
					placeholder="Пошук за заголовком або текстом…"
				/>

				<select
					className="search"
					value={ctx.state.tagFilter}
					onChange={(e) => ctx.setTagFilter(e.target.value)}
				>
					<option value="ALL">Всі теги</option>
					<option value="Навчання">Навчання</option>
					<option value="Дім">Дім</option>
					<option value="Ідеї">Ідеї</option>
					<option value="Інше">Інше</option>
				</select>
			</div>

			<NoteForm />

			<NoteList
				notes={ctx.filteredNotes()}
				onOpen={ctx.openNote}
				onRemove={ctx.removeNote}
			/>
		</>
	);
};
