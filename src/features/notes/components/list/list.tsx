import { useEffect } from 'react';
import { useNotes } from '../../hooks/use.notes';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const { getNotes, handleLoad, handleAdd, handleDelete, handleUpdate } =
        useNotes();

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <Add handleAdd={handleAdd}></Add>
            <h3>Lista de notas</h3>
            {!getNotes().length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="note-list">
                    {getNotes().map((item) => {
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
