import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { useTodoItems, todoItemsActions } from "../contexts/TodoItems";
import { TodoItemChangeForm } from "./TodoItemForm";
import { useCallback } from "react";

const useModalStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardRoot: {
        width: "fit-content",
    },
}));

export const TodoItemCardChangeModal = () => {
    const classes = useModalStyles();

    const { itemToChange, dispatch } = useTodoItems();

    const handleClose = useCallback(
        () => dispatch(todoItemsActions.deleteItemToChange()),
        [dispatch]
    );

    return (
        <Modal className={classes.root} open={itemToChange !== undefined}>
            <Fade in={itemToChange !== undefined}>
                <Card className={classes.cardRoot}>
                    <CardHeader
                        action={
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Typography align="center" variant="h4" component="p">
                            Change TODO Card
                        </Typography>
                        {itemToChange ? (
                            <TodoItemChangeForm
                                onFinish={handleClose}
                                data={itemToChange}
                            />
                        ) : null}
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    );
};

export default TodoItemCardChangeModal;
