import { useEffect, useState } from 'react';
import { useNotes } from '../../hooks/use.notes';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const { getNotes, handleLoad, handleAdd, handleDelete, handleUpdate } =
        useNotes();

    const [notes, setNotes] = useState(getNotes());

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    useEffect(() => {
        setNotes(getNotes());
    }, [getNotes]);

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
