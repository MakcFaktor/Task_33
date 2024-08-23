import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

test('повинно відображатися заголовок TODO', () => {
    render(<TodoApp />);
    const headerElement = screen.getByText(/TODO/i);
    expect(headerElement).toBeInTheDocument();
});

test('повинно бути можливим ввести текст у поле', () => {
    render(<TodoApp />);
    const inputElement = screen.getByPlaceholderText(/Введіть завдання/i);
    userEvent.type(inputElement, 'Придбати молоко123');
    expect(inputElement.value).toBe('Придбати молоко123');
});

test('повинно відображатися повідомлення про помилку при додаванні порожнього завдання', () => {
    render(<TodoApp />);
    const buttonElement = screen.getByText(/Додати/i);
    userEvent.click(buttonElement);
    const errorMessage = screen.getByText(/Завдання не може бути порожнім/i);
    expect(errorMessage).toBeInTheDocument();
});

test('повинно додаватися нове завдання у список', () => {
    render(<TodoApp />);
    const inputElement = screen.getByPlaceholderText(/Введіть завдання/i);
    const buttonElement = screen.getByText(/Додати/i);
    userEvent.type(inputElement, 'Придбати молоко');
    userEvent.click(buttonElement);
    const listItemElement = screen.getByText(/Придбати молоко/i);
    expect(listItemElement).toBeInTheDocument();
});

test('повинно бути можливим видалити елемент зі списку', () => {
    render(<TodoApp />);
    const inputElement = screen.getByPlaceholderText(/Введіть завдання/i);
    const buttonElement = screen.getByText(/Додати/i);
    userEvent.type(inputElement, 'Придбати молоко');
    userEvent.click(buttonElement);

    const deleteButton = screen.getByText(/Видалити/i);
    userEvent.click(deleteButton);
    const listItemElement = screen.queryByText(/Придбати молоко/i);
    expect(listItemElement).not.toBeInTheDocument();
});
