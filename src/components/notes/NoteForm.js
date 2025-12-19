import React, { useContext, useRef, useState } from "react";
import "./NoteForm.scss";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { AppContext } from "../../context/AppContext";

const TAGS = ["Навчання", "Дім", "Ідеї", "Інше"];

export const NoteForm = () => {
	const ctx = useContext(AppContext);

	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [tag, setTag] = useState(TAGS[0]);

	const [touched, setTouched] = useState(false);

	const titleRef = useRef(null);

	const titleValid = title.trim().length >= 3;
	const textValid = text.trim().length >= 1;

	const submit = () => {
		setTouched(true);
		if (!titleValid || !textValid) return;

		ctx.addNote({
			id: crypto.randomUUID(),
			title: title.trim(),
			text: text.trim(),
			tag,
			createdAt: Date.now(),
		});

		setTitle("");
		setText("");
		setTag(TAGS[0]);
		setTouched(false);
		titleRef.current?.focus();
	};

	return (
		<div className="noteForm card fade-in">
			<h3>Додати нотатку</h3>

			<div className="noteFormGrid">
				<div>
					<Input
						label="Заголовок"
						type="text"
						value={title}
						valid={!touched || titleValid}
						touched={touched}
						errorMessage="Мінімум 3 символи"
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Напр.: План на тиждень"
					/>
					<input ref={titleRef} style={{ display: "none" }} />
				</div>

				<div className="noteFormTag">
					<div className="inputLabel">Тег</div>
					<select className="select" value={tag} onChange={(e) => setTag(e.target.value)}>
						{TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
					</select>
				</div>

				<div className="noteFormText">
					<div className="inputLabel">Текст</div>
					<textarea
						className={touched && !textValid ? "textarea textarea--error" : "textarea"}
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Одна-дві фрази…"
					/>
					{touched && !textValid ? <div className="inputError">Текст не може бути порожнім</div> : null}
				</div>

				<div className="noteFormActions">
					<Button text="Додати" click={submit} />
				</div>
			</div>
		</div>
	);
};
