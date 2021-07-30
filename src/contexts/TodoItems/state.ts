import { TodoItem } from "./interfaces";

export interface TodoItemsState {
    itemToChange: TodoItem | undefined;
    todoItems: TodoItem[];
}
export const defaultState: TodoItemsState = {
    itemToChange: undefined,
    todoItems: [],
};
