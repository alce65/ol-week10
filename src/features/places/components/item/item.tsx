import { useContext } from 'react';
import { PlaceContext } from '../../../../core/context/places/places.context';
import { PlaceStructure } from '../../models/place';
import './item.css';

export function Item({ item }: { item: PlaceStructure }) {
    const { handleUpdate, handleDelete } = useContext(PlaceContext);

    const handleChange = () => {
        item.isVisited = !item.isVisited;
        handleUpdate(item);
    };

    const handleClick = () => {
        handleDelete(item.id);
    };

    return (
        <div className="item-place">
            <span className="item-place__start">
                <input
                    type="checkbox"
                    checked={item.isVisited}
                    onChange={handleChange}
                />
                <span>{item.id}</span>
            </span>
            <span className="item-place__middle">
                <output>{item.name}</output>
                <output>{item.country}</output>
            </span>
            <span
                role="button"
                className="item-place__end button"
                onClick={handleClick}
            >
                🗑️
            </span>
        </div>
    );
}
