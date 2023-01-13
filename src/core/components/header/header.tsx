import { useContext } from 'react';
import { NoteContext } from '../../context/note.context';
import './header.css';

export function Header({ children }: { children: JSX.Element }) {
    const title = 'Learning Components';
    const { notes } = useContext(NoteContext);

    return (
        <header aria-label="title">
            <h1>{title}</h1>
            <p className="notas-number">Notas: {notes.length}</p>
            {children}
        </header>
    );
}
