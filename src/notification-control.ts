function generateId() {
    return `${Date.now().toString(36)}-${Math.floor(
        Math.random() * 1e16
    ).toString(36)}`;
}

interface NotificationTask {
    id: string;
    timeoutId: NodeJS.Timeout;
}

interface SendNotificationProps {
    title: string;
    body: string;
    timestamp: number;
}

export default class NotificationControl {
    private static _notificationTasks: NotificationTask[] = [];

    public static browserSupportsNotification(): boolean {
        return "Notification" in window;
    }

    public static deleteNotificationTask(id: string) {
        console.log("deleteNotificationTask", id);
        NotificationControl._notificationTasks =
            NotificationControl._notificationTasks.filter((task) => {
                if (task.id === id) {
                    clearTimeout(task.timeoutId);
                }
                return task.id !== id;
            });
    }

    public static sendNotification(props: SendNotificationProps): string {
        const { title, body, timestamp } = props;
        let id = generateId();
        if (Notification.permission === "denied") return id;
        if (Notification.permission === "granted") {
            console.log(timestamp - Date.now());
            let timeoutId = setTimeout(
                () =>
                    NotificationControl.createNotification(id, title, {
                        body,
                        timestamp,
                    }),
                timestamp - Date.now()
            );
            NotificationControl.addNotificationTask(id, timeoutId);
        } else {
            NotificationControl.getNotificationAccess().then(
                (permission: NotificationPermission) => {
                    if (permission === "granted") {
                        let timeoutId = setTimeout(
                            () =>
                                NotificationControl.createNotification(
                                    id,
                                    title,
                                    { body, timestamp }
                                ),
                            timestamp - Date.now()
                        );
                        NotificationControl.addNotificationTask(id, timeoutId);
                    }
                }
            );
        }
        return id;
    }

    public static notificationDateToTimestamp(
        notificationDate: string,
        notificationTime: string
    ): number {
        return Date.parse(`${notificationDate}T${notificationTime}:00`);
    }

    private static async getNotificationAccess(): Promise<NotificationPermission> {
        return await Notification.requestPermission();
    }

    private static addNotificationTask(id: string, timeoutId: NodeJS.Timeout) {
        console.log("addNotificationTask", id, timeoutId);
        NotificationControl._notificationTasks.push({ id, timeoutId });
    }

    private static createNotification(
        id: string,
        title: string,
        opts?: NotificationOptions
    ): Notification {
        let notification = new Notification(title, opts);
        notification.onshow = () => {
            window.focus();
            NotificationControl.deleteNotificationTask(id);
        };
        return notification;
    }
}
