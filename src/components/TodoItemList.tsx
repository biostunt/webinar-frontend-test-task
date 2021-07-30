import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { useTodoItems } from "../contexts/TodoItems";
import TodoItemCard from "./TodoItemCard";

const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
    duration: 0.25,
};

const useTodoItemListStyles = makeStyles({
    root: {
        listStyle: "none",
        padding: 0,
    },
});

export const TodoItemsList = function () {
    const { todoItems } = useTodoItems();

    const classes = useTodoItemListStyles();

    const sortedItems = todoItems.slice().sort((a, b) => {
        if (a.done && !b.done) {
            return 1;
        }

        if (!a.done && b.done) {
            return -1;
        }

        return 0;
    });

    return (
        <ul className={classes.root}>
            {sortedItems.map((item) => (
                <motion.li key={item.id} transition={spring} layout={true}>
                    <TodoItemCard item={item} />
                </motion.li>
            ))}
        </ul>
    );
};
