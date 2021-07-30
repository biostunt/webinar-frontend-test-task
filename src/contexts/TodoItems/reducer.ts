import { TodoItemsAction } from "./actions";
import { TodoItemsState } from "./state";
import produce from "immer";

function generateId() {
    return `${Date.now().toString(36)}-${Math.floor(
        Math.random() * 1e16
    ).toString(36)}`;
}

const reducer = (
    state: TodoItemsState,
    action: TodoItemsAction
): TodoItemsState =>
    produce(state, (draftState) => {
        switch (action.type) {
            case "loadState":
                return action.data;
            case "add":
                draftState.todoItems.unshift({
                    id: generateId(),
                    done: false,
                    ...action.data,
                });
                return draftState;
            case "delete":
                draftState.todoItems = draftState.todoItems.filter(
                    ({ id }) => id !== action.data
                );
                return draftState;
            case "toggleDone":
                const itemIndex = draftState.todoItems.findIndex(
                    ({ id }) => id === action.data
                );
                const item = draftState.todoItems[itemIndex];
                draftState.todoItems = [
                    ...draftState.todoItems.slice(0, itemIndex),
                    { ...item, done: !item.done },
                    ...draftState.todoItems.slice(itemIndex + 1),
                ];
                return draftState;
            case "addItemToChange":
                draftState.itemToChange = draftState.todoItems.find(
                    (item) => item.id === action.data
                );
                return draftState;
            case "deleteItemToChange":
                draftState.itemToChange = undefined;
                return draftState;
            case "changeItem":
                const index = draftState.todoItems.findIndex(
                    ({ id }) => id === action.data.id
                );
                draftState.todoItems[index] = action.data;
                return draftState;
            default:
                return draftState;
        }
    });

export default reducer;
