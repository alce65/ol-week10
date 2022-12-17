import { TaskType } from '../../models/task';
import './item.css';

export function Item({
    item,
    handleUpdate,
    handleDelete,
}: {
    item: TaskType;
    handleUpdate: (task: Partial<TaskType>) => void;
    handleDelete: (id: TaskType['id']) => void;
}) {
    const handleChange = () => {
        item.isCompleted = !item.isCompleted;
        handleUpdate(item);
    };

    const handleClick = () => {
        handleDelete(item.id);
    };

    return (
        <div className="item-task">
            <span className="item-task__start">
                <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={handleChange}
                />
                <span>{item.id}</span>
            </span>
            <span className="item-task__middle">
                <output>{item.title}</output>
                <output>{item.responsible}</output>
            </span>
            <span
                role="button"
                className="item-task__end button"
                onClick={handleClick}
            >
                🗑️
            </span>
        </div>
    );
}
