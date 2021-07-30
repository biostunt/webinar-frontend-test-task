import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TodoItemsList } from "./TodoItems";
import { TodoItemsContextProvider, useTodoItems } from "./contexts/TodoItems";
import TodoItemForm from "./TodoItemForm";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9012fe",
        },
        secondary: {
            main: "#b2aabf",
        },
    },
});

const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
    duration: 0.25,
};

function App() {
    return (
        <TodoItemsContextProvider>
            <ThemeProvider theme={theme}>
                <Content />
            </ThemeProvider>
        </TodoItemsContextProvider>
    );
}

const useContentStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%",
    },
    headerRoot: {
        textAlign: "center",
        height: "10%",
    },
    mainRoot: {
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        overflow: "hidden",
    },
    formRoot: {
        alignSelf: "flex-start",
        width: "45%",
        height: "fit-content",
    },
    listRoot: {
        width: "45%",
        height: "100%",
        overflowY: "scroll",
    },
    "@media screen and (max-width: 768px)": {
        formRoot: {
            width: "100%",
        },
        listRoot: {
            width: "100%",
        },
    },
}));

function Content() {
    const classes = useContentStyles();
    const { todoItems } = useTodoItems();

    return (
        <Container className={classes.root} maxWidth="lg">
            <header className={classes.headerRoot}>
                <Typography variant="h2" component="h1">
                    Todo List
                </Typography>
            </header>
            <main className={classes.mainRoot}>
                <motion.div
                    className={classes.formRoot}
                    transition={spring}
                    layout={true}
                >
                    <TodoItemForm />
                </motion.div>
                {todoItems.length ? (
                    <motion.div
                        className={classes.listRoot}
                        transition={spring}
                        layout={true}
                    >
                        <TodoItemsList />
                    </motion.div>
                ) : null}
            </main>
        </Container>
    );
}

export default App;
