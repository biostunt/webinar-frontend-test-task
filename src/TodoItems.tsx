import { useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { motion } from "framer-motion";
import { TodoItem, useTodoItems, todoItemsActions } from "./contexts/TodoItems";
import { convertNotificationDateToTimestamp } from "./notificationControl";

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

const useTodoItemCardStyles = makeStyles({
    root: {
        marginTop: 24,
        marginBottom: 24,
    },
    doneRoot: {
        textDecoration: "line-through",
        color: "#888888",
    },
    notificationRoot: {
        fontSize: ".75rem",
    },
});

export const TodoItemCard = function ({ item }: { item: TodoItem }) {
    const classes = useTodoItemCardStyles();
    const { dispatch } = useTodoItems();

    const handleDelete = useCallback(
        () => dispatch(todoItemsActions.deleteItem(item.id)),
        [item.id, dispatch]
    );

    const handleToggleDone = useCallback(
        () => dispatch(todoItemsActions.toggleDone(item.id)),
        [item.id, dispatch]
    );

    return (
        <Card
            className={classnames(classes.root, {
                [classes.doneRoot]: item.done,
            })}
        >
            <CardHeader
                action={
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                }
                title={
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item.done}
                                onChange={handleToggleDone}
                                name={`checked-${item.id}`}
                                color="primary"
                            />
                        }
                        label={item.title}
                    />
                }
            />
            {item.details ? (
                <CardContent>
                    <Typography variant="body2" component="p">
                        {item.details}
                    </Typography>
                    {item.notificationRequire ? (
                        <Typography
                            className={classes.notificationRoot}
                            align="center"
                            variant="body2"
                            component="p"
                            color="textSecondary"
                        >
                            Notify in{" "}
                            {new Date(
                                convertNotificationDateToTimestamp(
                                    item.notificationDate,
                                    item.notificationTime
                                )
                            ).toLocaleString()}
                        </Typography>
                    ) : null}
                </CardContent>
            ) : null}
        </Card>
    );
};
