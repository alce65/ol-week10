import { useContext, useEffect } from 'react';
import { PlaceContext } from '../../../../core/context/places/places.context';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const { places, handleLoad } = useContext(PlaceContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <Add></Add>
            <h3>Lista de lugares</h3>
            {!places.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="place-list">
                    {places.map((item) => {
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
