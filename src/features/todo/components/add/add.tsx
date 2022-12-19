import { SyntheticEvent, useState } from 'react';
import { Task, TaskType } from '../../models/task';
import './add.css';

export function Add({ handleAdd }: { handleAdd: (task: TaskType) => void }) {
    const initialFormData: Partial<TaskType> = {
        title: '',
        responsible: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        console.log('Input');
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleAdd(
            new Task(
                formData.title as string,
                // @TODO Re-design for allow testing
                formData.responsible ? formData.responsible : ''
            )
        );
        setFormData(initialFormData);
    };

    return (
        <section>
            <h3>Añadir tarea</h3>
            <form className="add-task" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Tarea</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Describe la tarea"
                        value={formData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="responsible">Responsable</label>
                    <input
                        type="text"
                        name="responsible"
                        id="responsible"
                        value={formData.responsible}
                        onInput={handleInput}
                        placeholder="Responsable de la tarea"
                    />
                </div>
                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </section>
    );
}
