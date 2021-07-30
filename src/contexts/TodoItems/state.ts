import { TodoItem } from "./interfaces";

export interface TodoItemsState {
    todoItems: TodoItem[];
}
export const defaultState: TodoItemsState = {
    todoItems: [],
};
