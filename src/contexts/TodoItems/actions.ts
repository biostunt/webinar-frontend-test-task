import { TodoItemFormValues, TodoItem } from "./interfaces";
import { TodoItemsState } from "./state";

const actionLoadState = (
    data: TodoItemsState
): { type: "loadState"; data: TodoItemsState } => ({ type: "loadState", data });
const actionAddItem = (
    data: TodoItemFormValues
): { type: "add"; data: TodoItemFormValues } => ({ type: "add", data });
const actionDeleteItem = (id: string): { type: "delete"; data: string } => ({
    type: "delete",
    data: id,
});
const actionToggleDoneItem = (
    id: string
): { type: "toggleDone"; data: string } => ({ type: "toggleDone", data: id });

const actionAddItemToChange = (
    id: string
): { type: "addItemToChange"; data: string } => ({
    type: "addItemToChange",
    data: id,
});
const actionDeleteItemToChange = (): { type: "deleteItemToChange" } => ({
    type: "deleteItemToChange",
});
const actionChangeItem = (
    data: TodoItem
): { type: "changeItem"; data: TodoItem } => ({ type: "changeItem", data });

export const todoItemsActions = {
    loadState: actionLoadState,
    addItem: actionAddItem,
    deleteItem: actionDeleteItem,
    toggleDone: actionToggleDoneItem,
    addItemToChange: actionAddItemToChange,
    deleteItemToChange: actionDeleteItemToChange,
    changeItem: actionChangeItem,
};

export type TodoItemsAction =
    | ReturnType<typeof actionLoadState>
    | ReturnType<typeof actionAddItem>
    | ReturnType<typeof actionDeleteItem>
    | ReturnType<typeof actionToggleDoneItem>
    | ReturnType<typeof actionAddItemToChange>
    | ReturnType<typeof actionDeleteItemToChange>
    | ReturnType<typeof actionChangeItem>;
