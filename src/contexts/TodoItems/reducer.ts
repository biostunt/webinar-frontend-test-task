import { TodoItemsAction } from "./actions";
import { TodoItemsState } from "./state";

function generateId() {
    return `${Date.now().toString(36)}-${Math.floor(
        Math.random() * 1e16
    ).toString(36)}`;
}

function reducer(
    state: TodoItemsState,
    action: TodoItemsAction
): TodoItemsState {
    switch (action.type) {
        case "loadState":
            return action.data;
        case "add":
            return {
                ...state,
                todoItems: [
                    { id: generateId(), done: false, ...action.data },
                    ...state.todoItems,
                ],
            };
        case "delete":
            return {
                ...state,
                todoItems: state.todoItems.filter(
                    ({ id }) => id !== action.data
                ),
            };
        case "toggleDone":
            const itemIndex = state.todoItems.findIndex(
                ({ id }) => id === action.data
            );
            const item = state.todoItems[itemIndex];
            return {
                ...state,
                todoItems: [
                    ...state.todoItems.slice(0, itemIndex),
                    { ...item, done: !item.done },
                    ...state.todoItems.slice(itemIndex + 1),
                ],
            };
        default:
            return state;
    }
}

export default reducer;
