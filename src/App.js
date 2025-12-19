import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

import { AppContext } from "./context/AppContext";
import { Layout } from "./components/layout/Layout";
import { Dark } from "./components/dark/Dark";
import { Modal } from "./components/modal/Modal";

import { HomePage } from "./pages/HomePage";
import { NotesPage } from "./pages/NotesPage";
import { SettingsPage } from "./pages/SettingsPage";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: "light",
			notes: [],
			query: "",
			tagFilter: "ALL",

			modalOpen: false,
			activeNote: null,
		};
	}

	componentDidMount() {
		const savedTheme = localStorage.getItem("qn_theme");
		const savedNotes = localStorage.getItem("qn_notes");

		if (savedTheme) this.setState({ theme: savedTheme });
		if (savedNotes) {
			try {
				this.setState({ notes: JSON.parse(savedNotes) });
			} catch { }
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.theme !== this.state.theme) {
			localStorage.setItem("qn_theme", this.state.theme);
		}
		if (prevState.notes !== this.state.notes) {
			localStorage.setItem("qn_notes", JSON.stringify(this.state.notes));
		}
	}

	toggleTheme = () => {
		this.setState((s) => ({ theme: s.theme === "light" ? "dark" : "light" }));
	};

	setQuery = (query) => this.setState({ query });
	setTagFilter = (tagFilter) => this.setState({ tagFilter });

	addNote = (note) => {
		this.setState((s) => ({ notes: [note, ...s.notes] }));
	};

	removeNote = (id) => {
		this.setState((s) => ({ notes: s.notes.filter((n) => n.id !== id) }));
	};

	clearNotes = () => this.setState({ notes: [] });

	filteredNotes = () => {
		const q = this.state.query.trim().toLowerCase();
		const tag = this.state.tagFilter;

		return this.state.notes
			.filter((n) => (tag === "ALL" ? true : n.tag === tag))
			.filter((n) => {
				if (!q) return true;
				return (
					n.title.toLowerCase().includes(q) ||
					n.text.toLowerCase().includes(q)
				);
			});
	};

	openNote = (id) => {
		const note = this.state.notes.find((n) => n.id === id);
		this.setState({ modalOpen: true, activeNote: note || null });
	};

	closeModal = () => {
		this.setState({ modalOpen: false, activeNote: null });
	};

	render() {
		const ctxValue = {
			state: this.state,
			toggleTheme: this.toggleTheme,
			setQuery: this.setQuery,
			setTagFilter: this.setTagFilter,
			addNote: this.addNote,
			removeNote: this.removeNote,
			clearNotes: this.clearNotes,
			filteredNotes: this.filteredNotes,
			openNote: this.openNote,
			closeModal: this.closeModal,
		};

		return (
			<AppContext.Provider value={ctxValue}>
				<Dark theme={this.state.theme} />

				<Modal
					show={this.state.modalOpen}
					title={this.state.activeNote ? this.state.activeNote.title : "Нотатка"}
					onClose={this.closeModal}
				>
					{this.state.activeNote ? (
						<>
							<div className="modalMeta">
								<span className="badge">{this.state.activeNote.tag}</span>
								<span className="muted small">
									{new Date(this.state.activeNote.createdAt).toLocaleString()}
								</span>
							</div>
							<p className="modalText">{this.state.activeNote.text}</p>
						</>
					) : (
						<p className="muted">Нотатку не знайдено.</p>
					)}
				</Modal>

				<Layout>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/notes" element={<NotesPage />} />
						<Route path="/settings" element={<SettingsPage />} />
					</Routes>
				</Layout>
			</AppContext.Provider>
		);
	}
}

export default App;
