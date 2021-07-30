import {
    TodoItemFormValues,
    useTodoItems,
    todoItemsActions,
    TodoItem,
} from "../contexts/TodoItems";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Notifications from "../notification-control";

const useInputStyles = makeStyles(() => ({
    root: {
        marginBottom: 24,
    },
    dateRoot: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

interface TodoItemPropsForm {
    formType: "Add" | "Change";
    data?: TodoItemFormValues;
    onFinish: (data: TodoItemFormValues) => void;
}
const TodoItemForm = (props: TodoItemPropsForm) => {
    const classes = useInputStyles();

    const getDefaultFormValues = (): TodoItemFormValues =>
        props.data
            ? props.data
            : {
                  title: "",
                  details: "",
                  notificationRequire: false,
                  notificationDate: new Date().toJSON().split("T")[0],
                  notificationTime: new Date()
                      .toLocaleString()
                      .split(", ")[1]
                      .split(":")
                      .slice(0, 2)
                      .join(":"),
              };
    const { control, handleSubmit, reset, watch } =
        useForm<TodoItemFormValues>();

    const [notificationRequire, setNotificationRequire] = useState(
        props.data?.notificationRequire || false
    );
    const canNotify = Notifications.browserSupportsNotification();
    return (
        <form
            onSubmit={handleSubmit((formData) => {
                props.onFinish(formData);
                reset(getDefaultFormValues());
                setNotificationRequire(
                    props.data?.notificationRequire || false
                );
            })}
        >
            <Controller
                name="title"
                control={control}
                defaultValue={getDefaultFormValues().title}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="TODO"
                        fullWidth={true}
                        className={classes.root}
                    />
                )}
            />
            <Controller
                name="details"
                control={control}
                defaultValue={getDefaultFormValues().details}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Details"
                        fullWidth={true}
                        multiline={true}
                        className={classes.root}
                    />
                )}
            />
            <div className={classes.dateRoot}>
                <Controller
                    name="notificationRequire"
                    control={control}
                    defaultValue={getDefaultFormValues().notificationRequire}
                    render={({ field }) => (
                        <Tooltip
                            title="Your browser doesn`t support notifications"
                            placement="right"
                            arrow
                            disableHoverListener={canNotify}
                        >
                            <FormControlLabel
                                control={
                                    <Switch
                                        {...field}
                                        onChange={(e, checked) => {
                                            field.onChange(e, checked);
                                            setNotificationRequire(checked);
                                        }}
                                        checked={notificationRequire}
                                        color="primary"
                                        disabled={!canNotify}
                                    />
                                }
                                label="Notify me"
                            />
                        </Tooltip>
                    )}
                />
                <Controller
                    name="notificationDate"
                    control={control}
                    defaultValue={getDefaultFormValues().notificationDate}
                    render={({ field }) => (
                        <Fade in={notificationRequire}>
                            <TextField
                                {...field}
                                label="Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Fade>
                    )}
                />
                <Controller
                    name="notificationTime"
                    control={control}
                    defaultValue={getDefaultFormValues().notificationTime}
                    render={({ field }) => (
                        <Fade in={notificationRequire}>
                            <TextField
                                {...field}
                                label="Time"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Fade>
                    )}
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!watch("title") && props.formType === "Add"}
            >
                {props.formType}
            </Button>
        </form>
    );
};

export const TodoItemAddForm = () => {
    const { dispatch } = useTodoItems();

    const handleSubmit = (data: TodoItemFormValues) => {
        let notificationId: string = "";
        if (data.notificationRequire)
            notificationId = Notifications.sendNotification({
                title: data.title,
                body: data.details || "",
                timestamp: Notifications.notificationDateToTimestamp(
                    data.notificationDate,
                    data.notificationTime
                ),
            });
        dispatch(todoItemsActions.addItem({ ...data, notificationId }));
    };
    return <TodoItemForm formType="Add" onFinish={handleSubmit.bind(this)} />;
};

interface TodoItemChangeFormProps {
    data: TodoItem;
    onFinish: () => void;
}
export const TodoItemChangeForm = (props: TodoItemChangeFormProps) => {
    const { data, onFinish } = props;
    const { dispatch } = useTodoItems();
    const handleSubmit = (formData: TodoItemFormValues) => {
        let notificationId: string = "";
        Notifications.deleteNotificationTask(formData.notificationId || "");
        if (formData.notificationRequire)
            notificationId = Notifications.sendNotification({
                title: formData.title,
                body: formData.details || "",
                timestamp: Notifications.notificationDateToTimestamp(
                    formData.notificationDate,
                    formData.notificationTime
                ),
            });
        dispatch(
            todoItemsActions.changeItem({
                ...data,
                ...formData,
                notificationId,
            })
        );
        onFinish();
    };
    return (
        <TodoItemForm
            formType="Change"
            data={{ ...data }}
            onFinish={handleSubmit.bind(this)}
        />
    );
};
