import { NoteStructure } from '../../models/note';
import './item.css';

export function Item({
    item,
    handleUpdate,
    handleDelete,
}: {
    item: NoteStructure;
    handleUpdate: (note: Partial<NoteStructure>) => void;
    handleDelete: (id: NoteStructure['id']) => void;
}) {
    const handleChange = () => {
        item.isImportant = !item.isImportant;
        handleUpdate(item);
    };

    const handleClick = () => {
        handleDelete(item.id);
    };

    return (
        <div className="item-note">
            <span className="item-note__start">
                <input
                    type="checkbox"
                    checked={item.isImportant}
                    onChange={handleChange}
                />
                <span>{item.id}</span>
            </span>
            <span className="item-note__middle">
                <output>{item.title}</output>
                <output>{item.author}</output>
            </span>
            <span
                role="button"
                className="item-note__end button"
                onClick={handleClick}
            >
                🗑️
            </span>
        </div>
    );
}
