import { FileUp } from 'lucide-react';
import styles from '../../styles/components/UploadInstructions.module.css';


const UploadInstructions = () => {
    return (
        <div className={styles.instructionsSection}>
            <h3 className={styles.instructionsTitle}>הנחיות להכנת הקובץ:</h3>
            <ul className={styles.instructionsList}>
                <li>הכן קובץ אקסל או ייצא קובץ CSV מגוגל שיטס (קיימת דוגמה להורדה). </li>
                <li>ודא שהקובץ מכיל את העמודות הבאות: שם מלא, פלאפון, כתובת מייל. </li>
                <li>ניתן להשתמש בשמות עמודות שונים כמו "שם", "טלפון", "מייל", "email" וכו'. </li>
                <li> <span className={styles.instructionsMust}> שם מלא פלאפון ומייל חובה. </span></li>
                <li>
                    קובץ לדוגמה:
                    <FileUp className={styles.templateIcon} />
                    <a
                        href="/example_contacts.xlsx"
                        download
                        className={styles.templateLink}
                    >
                        הורד תבנית
                    </a>
                </li>
            </ul>
        </div>
    );
}


export default UploadInstructions;