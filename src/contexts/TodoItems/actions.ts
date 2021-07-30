import { TodoItemFormValues } from "./interfaces";
import { TodoItemsState } from "./state";

export const actionLoadState = (
    data: TodoItemsState
): { type: "loadState"; data: TodoItemsState } => ({ type: "loadState", data });
export const actionAddItem = (
    data: TodoItemFormValues
): { type: "add"; data: TodoItemFormValues } => ({ type: "add", data });
export const actionDeleteItem = (
    id: string
): { type: "delete"; data: string } => ({ type: "delete", data: id });
export const actionToggleDoneItem = (
    id: string
): { type: "toggleDone"; data: string } => ({ type: "toggleDone", data: id });

export const todoItemsActions = {
    loadState: actionLoadState,
    addItem: actionAddItem,
    deleteItem: actionDeleteItem,
    toggleDone: actionToggleDoneItem,
};

export type TodoItemsAction =
    | ReturnType<typeof actionLoadState>
    | ReturnType<typeof actionAddItem>
    | ReturnType<typeof actionDeleteItem>
    | ReturnType<typeof actionToggleDoneItem>;
