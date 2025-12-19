import React, { useEffect, useRef } from "react";
import "./Modal.scss";

export const Modal = ({ show, title, onClose, children }) => {
	const boxRef = useRef(null);

	useEffect(() => {
		if (!show) return;

		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};

		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [show, onClose]);

	if (!show) return null;

	const onBackdrop = (e) => {
		const inside = boxRef.current && boxRef.current.contains(e.target);
		if (!inside) onClose();
	};

	return (
		<div className="modalBackdrop" onClick={onBackdrop}>
			<div className="modalBox fade-in" ref={boxRef}>
				<div className="modalTop">
					<div className="modalTitle">{title || "Modal"}</div>
					<button className="modalClose" onClick={onClose} type="button">✕</button>
				</div>
				<div className="modalBody">{children}</div>
			</div>
		</div>
	);
};
