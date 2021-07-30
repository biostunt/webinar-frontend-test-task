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
                return {
                    ...draftState,
                    todoItems: [
                        { id: generateId(), done: false, ...action.data },
                        ...draftState.todoItems,
                    ],
                };
            case "delete":
                return {
                    ...draftState,
                    todoItems: draftState.todoItems.filter(
                        ({ id }) => id !== action.data
                    ),
                };
            case "toggleDone":
                const itemIndex = draftState.todoItems.findIndex(
                    ({ id }) => id === action.data
                );
                const item = draftState.todoItems[itemIndex];
                return {
                    ...draftState,
                    todoItems: [
                        ...draftState.todoItems.slice(0, itemIndex),
                        { ...item, done: !item.done },
                        ...draftState.todoItems.slice(itemIndex + 1),
                    ],
                };
            default:
                return state;
        }
    });

export default reducer;
