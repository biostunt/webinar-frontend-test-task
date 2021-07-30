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
import {
    TodoItem,
    useTodoItems,
    todoItemsActions,
} from "../contexts/TodoItems";
import { convertNotificationDateToTimestamp } from "../notificationControl";

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

const TodoItemCard = function ({ item }: { item: TodoItem }) {
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

export default TodoItemCard;
