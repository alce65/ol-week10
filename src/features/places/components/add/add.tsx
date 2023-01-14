import { SyntheticEvent, useContext, useState } from 'react';
import { PlaceContext } from '../../../../core/context/places/places.context';
import { PlaceLite, PlaceNoId } from '../../models/place';
import './add.css';

export function Add() {
    const initialFormData: Partial<PlaceNoId> = {
        name: '',
        country: '',
    };

    const { handleAdd } = useContext(PlaceContext);

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleAdd(
            new PlaceLite(
                formData.name as string,
                formData.country ? formData.country : ''
            )
        );
        setFormData(initialFormData);
    };

    return (
        <section>
            <h3>Añadir lugar</h3>
            <form className="add-place" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Lugar</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nombre del lugar"
                        value={formData.name}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Autor</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onInput={handleInput}
                        placeholder="País en el que está el lugar"
                    />
                </div>
                <div>
                    <button type="submit">Añadir</button>
                </div>
            </form>
        </section>
    );
}
