export const browserSupportsNotification = (): boolean => {
    return "Notification" in window;
};

const getNotificationAccess = async (): Promise<NotificationPermission> => {
    return await Notification.requestPermission();
};

const createNotification = (title: string, opts?: NotificationOptions) =>
    new Notification(title, opts);

interface SendNotificationProps {
    title: string;
    body: string;
    timestamp: number;
}
export const sendNotification = (props: SendNotificationProps): void => {
    const { title, body, timestamp } = props;
    if (Notification.permission === "denied") return;
    if (Notification.permission === "granted") {
        console.log(timestamp - Date.now());
        setTimeout(() => {
            let notification = createNotification(title, { body, timestamp });
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }, timestamp - Date.now());
    } else {
        getNotificationAccess().then((permission: NotificationPermission) => {
            if (permission === "granted") {
                setTimeout(
                    () => new Notification(title, { body, timestamp }),
                    timestamp - Date.now()
                );
            }
        });
    }
};

export const convertNotificationDateToTimestamp = (
    notificationDate: string,
    notificationTime: string
): number => Date.parse(`${notificationDate}T${notificationTime}:00`);
