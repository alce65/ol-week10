import { useEffect, useState } from 'react';
import { consoleDebug } from '../../../../tools/debug';
import { getNotes, saveNotes } from '../../data/mock.notes.service';
import { NoteStructure } from '../../models/note';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const initialState: Array<NoteStructure> = [];

    const [notes, setNotes] = useState(initialState);

    const handleLoad = async () => {
        const data = await getNotes();
        setNotes(data);
        consoleDebug('LOAD');
    };

    const handleAdd = function (note: NoteStructure) {
        setNotes([...notes, note]);
    };

    const handleUpdate = function (note: Partial<NoteStructure>) {
        setNotes(
            notes.map((item) =>
                item.id === note.id ? { ...item, ...note } : item
            )
        );
    };

    const handleDelete = function (id: NoteStructure['id']) {
        setNotes(notes.filter((item) => item.id !== id));
    };

    useEffect(() => {
        handleLoad();
    }, []);

    useEffect(() => {
        consoleDebug('useEffect', { notes });
        if (notes.length) {
            saveNotes(notes);
        }
    }, [notes]);

    return (
        <>
            <Add handleAdd={handleAdd}></Add>
            <h3>Lista de notas</h3>
            {!notes.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="note-list">
                    {notes.map((item) => {
                        return (
                            <li key={item.id}>
                                <Item
                                    item={item}
                                    handleUpdate={handleUpdate}
                                    handleDelete={handleDelete}
                                ></Item>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
