import { useContext, useEffect } from 'react';
import { NoteContext } from '../../../../core/context/note.context';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const { notes, handleLoad } = useContext(NoteContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <Add></Add>
            <h3>Lista de notas</h3>
            {!notes.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="note-list">
                    {notes.map((item) => {
                        return (
                            <li key={item.id}>
                                <Item item={item}></Item>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
