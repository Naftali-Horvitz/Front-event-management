import  styles from  '../../styles/components/MessageStatus.module.css';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const MessageStatus = ({ message, setMessage }) => {
    return (
        <div className={`${styles.message} ${message.type === 'error' ? styles.errorMessage : styles.successMessage}`}>
            <div className={styles.messageContent}>
                {message.type === 'error' ? (
                    <AlertCircle className={styles.messageIcon} />
                ) : (
                    <CheckCircle className={styles.messageIcon} />
                )}
                <span>{message.text}</span>
            </div>
            <button
                onClick={() => setMessage({ text: '', type: '' })}
                className={styles.closeButton}
            >
                <X className={styles.closeIcon} />
            </button>
        </div>
    );
}

export default MessageStatus;