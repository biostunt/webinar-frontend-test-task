import {
    PropsWithChildren,
    useEffect,
    useReducer,
    createContext,
    useContext,
} from "react";
import { defaultState, TodoItemsState } from "./state";
import { TodoItemsAction } from "./actions";
import reducer from "./reducer";
import { storageAvaiable } from "../context.service";

const localStorageKey = "todoListState";

const TodoItemsContext = createContext<
    (TodoItemsState & { dispatch: (action: TodoItemsAction) => void }) | null
>(null);

export const useTodoItems = () => {
    const todoItemsContext = useContext(TodoItemsContext);

    if (!todoItemsContext) {
        throw new Error(
            "useTodoItems hook should only be used inside TodoItemsContextProvider"
        );
    }
    return todoItemsContext;
};

interface TodoItemsContextProviderProps {}
export const TodoItemsContextProvider = ({
    children,
}: PropsWithChildren<TodoItemsContextProviderProps>) => {
    const [state, dispatch] = useReducer((prevState: any, action: any) => {
        let nextState = reducer(prevState, action);
        let count =
            JSON.stringify(nextState).length - JSON.stringify(prevState).length;
        return count > 0
            ? storageAvaiable(count)
                ? nextState
                : prevState
            : nextState;
    }, defaultState);

    useEffect(() => {
        const savedState = localStorage.getItem(localStorageKey);

        if (savedState) {
            try {
                dispatch({ type: "loadState", data: JSON.parse(savedState) });
            } catch {}
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }, [state]);

    return (
        <TodoItemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TodoItemsContext.Provider>
    );
};
