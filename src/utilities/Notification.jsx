import { notificationStyles } from '../styles/PhonebookStyles';

const Notification = ({ message, msgType }) => {
    if (!message) return null

    const styleClass = msgType === 'error' ? notificationStyles.error : notificationStyles.success;

    return (
        <div className={`${styleClass} border-l-4 p-4 rounded mb-4 text-center`}>
            {message}
        </div>
    );
};

export default Notification;
