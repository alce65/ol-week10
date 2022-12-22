import { SyntheticEvent, useState } from 'react';
import { Note, NoteStructure } from '../../models/note';
import './add.css';

export function Add({
    handleAdd,
}: {
    handleAdd: (note: NoteStructure) => void;
}) {
    const initialFormData: Partial<NoteStructure> = {
        title: '',
        author: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleAdd(
            new Note(
                formData.title as string,
                formData.author ? formData.author : ''
            )
        );
        setFormData(initialFormData);
    };

    return (
        <section>
            <h3>Añadir nota</h3>
            <form className="add-note" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Nota</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Describe la nota"
                        value={formData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Autor</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onInput={handleInput}
                        placeholder="Autor de la nota"
                    />
                </div>
                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </section>
    );
}
