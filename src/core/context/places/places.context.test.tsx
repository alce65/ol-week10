import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { PlaceStructure } from '../../../features/places/models/place';

// Se importa directamente el initialContext
// para que el test utilice las funciones definidas en él
import { initialContext, PlaceContext } from './places.context';

const mockPlace: PlaceStructure = {
    id: '1',
    name: 'Test place',
    country: 'country',
    isVisited: true,
};

initialContext.places = [mockPlace];

describe('Given the context AppContext', () => {
    let TestComponent: () => JSX.Element;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            TestComponent = () => {
                const {
                    places,
                    handleLoad,
                    handleDelete,
                    handleAdd,
                    handleUpdate,
                } = useContext(PlaceContext);
                handleLoad();
                handleAdd(mockPlace);
                handleDelete(mockPlace.id);
                handleUpdate(mockPlace);
                return <>{places[0].name}</>;
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <PlaceContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </PlaceContext.Provider>
            );
            const element = screen.getByText(initialContext.places[0].name);
            expect(element).toBeInTheDocument();
        });
    });
});
