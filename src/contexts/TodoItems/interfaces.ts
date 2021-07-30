export interface TodoItemFormValues {
    title: string;
    details?: string;
    notificationRequire: boolean;
    notificationDate: string;
    notificationTime: string;
}

export interface TodoItem extends TodoItemFormValues {
    id: string;
    done: boolean;
}
