import { useCallback, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import ChangeIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import {
    TodoItem,
    useTodoItems,
    todoItemsActions,
} from "../contexts/TodoItems";
import Notifications from "../notification-control";
import { useEffect } from "react";

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
    deleteRoot: {
        fontSize: ".75rem"
    }
});


const TodoItemCardDestructTimer = () => {
    const classes = useTodoItemCardStyles();
    const [remainTime, setRemainTime] = useState(300);
    useEffect(() => {
        let timeout = setTimeout(() => setRemainTime(remainTime - 1), 1000);
        return () => clearTimeout(timeout);
    }, [remainTime])
        return <Typography
                className={classes.deleteRoot}
                align="center"
                variant="body2"
                component="p"
                color="textSecondary"
        >
            Will be deleted via  {`${Math.floor(remainTime / 60)}:${remainTime % 60}`} min. 
        </Typography>
}


const TodoItemCard = ({ item }: { item: TodoItem }) => {
    const classes = useTodoItemCardStyles();
    const { dispatch } = useTodoItems();

    const handleChange = useCallback(
        () => dispatch(todoItemsActions.addItemToChange(item.id)),
        [item.id, dispatch]
    );

    const handleDelete = useCallback(
        () => dispatch(todoItemsActions.deleteItem(item.id)),
        [item.id, dispatch]
    );

    const handleToggleDone = useCallback(
        () => dispatch(todoItemsActions.toggleDone(item.id)),
        [item.id, dispatch]
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;
        if (item.done) {
            timeout = setTimeout(() => {
                dispatch(todoItemsActions.deleteItem(item.id))
            }, 300 * 1000);
        } else {
            if (timeout)
                clearTimeout(timeout)
        }
        return () => {
            if(timeout) clearTimeout(timeout)
        }
    }, [item.done]);
    return (
        <Card
            className={classes.root}
        >
            <CardHeader
                action={
                    <>
                        <IconButton aria-label="change" onClick={handleChange}>
                            <ChangeIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
                title={
                    <FormControlLabel
                        className={classnames({
                            [classes.doneRoot]: item.done,
                        })}
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
                </CardContent>
            ) : null}
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
                                Notifications.notificationDateToTimestamp(
                                    item.notificationDate,
                                    item.notificationTime
                                )
                            ).toLocaleString()}
                        </Typography>
                    ) : null}
            {
                item.done ? <TodoItemCardDestructTimer/>: null
            }
        </Card>
    );
};

export default TodoItemCard;
