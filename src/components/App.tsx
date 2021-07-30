import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TodoItemsContextProvider } from "../contexts/TodoItems";
import Content from "./Content";

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

function App() {
    return (
        <TodoItemsContextProvider>
            <ThemeProvider theme={theme}>
                <Content />
            </ThemeProvider>
        </TodoItemsContextProvider>
    );
}

export default App;
