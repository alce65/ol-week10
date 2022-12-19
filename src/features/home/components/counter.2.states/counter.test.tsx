import { render, screen } from '@testing-library/react';
import {
    buttonDecreaseTest,
    buttonIncreaseTest,
    titleDisplayTest,
} from '../counter/counter.test';
import { Counter2 } from './counter';

describe('Given Counter2 component', () => {
    describe('When it is render in the screen', () => {
        const setTotalMock = jest.fn();
        let buttons: Array<HTMLElement>;
        beforeEach(() => {
            render(<Counter2 setTotal={setTotalMock} />);
            buttons = screen.getAllByRole('button');
        });

        test('Then the title should be displayed', titleDisplayTest);
        test('Then if button + is clicked the new value should be in the screen', () => {
            buttonIncreaseTest(buttons[1]);
        });
        test('Then if button - is clicked the new value should be in the screen', () => {
            buttonDecreaseTest(buttons[0]);
        });
    });
});
