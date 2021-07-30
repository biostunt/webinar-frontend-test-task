export interface TodoItemFormValues {
    title: string;
    details?: string;
    notificationRequire: boolean;
    notificationDate: string;
    notificationTime: string;
    notificationId?: string;
}

export interface TodoItem extends TodoItemFormValues {
    id: string;
    done: boolean;
}
