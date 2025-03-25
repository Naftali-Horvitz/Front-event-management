import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Upload, Save, AlertCircle, Pencil } from 'lucide-react';
import config from "../../config.js";
import styles from '../../styles/components/UploadGuestList.module.css';
import { useEventContext } from "../../context/eventDataContext";
import EditGuest from '../guests/EditGuest.jsx';
import UploadInstructions from './UploadInstructions.jsx';
import MessageStatus from './MessageStatus.jsx';

const UploadGuestList = () => {

    const navigate = useNavigate();
    const { eventData } = useEventContext();
    const eventId = eventData.eventId;
    const [guests, setGuests] = useState([]);
    const [disSavedGuests, setGuestsDisSaved] = useState([]);
    const [error, setError] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showPreview, setShowPreview] = useState(false);
    const [editingGuest, setEditingGuest] = useState(null);
    const port = config.backendUrl;

    // טיפול בהעלאת קובץ
    const handleFileUpload = (e) => {
        setMessage({ text: '', type: '' });
        const file = e.target.files[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop().toLowerCase();
        if (!['xlsx', 'xls', 'csv'].includes(fileExt)) {
            setMessage({
                text: 'יש להעלות קובץ אקסל (.xlsx, .xls) או CSV בלבד',
                type: 'error'
            });
            return;
        }

        setIsUploading(true);
        setMessage({ text: '', type: '' });

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const data = evt.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                processUploadedData(json);
            } catch (error) {
                console.error('Error parsing file:', error);
                setMessage({
                    text: 'אירעה שגיאה בקריאת הקובץ. אנא ודא שהקובץ בפורמט תקין',
                    type: 'error'
                });
                setIsUploading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // עיבוד הנתונים מהקובץ
    const processUploadedData = (data) => {
        // בדיקה שיש נתונים
        if (!data || data.length === 0) {
            setMessage({
                text: 'הקובץ ריק. אנא העלה קובץ עם נתונים',
                type: 'error'
            });
            setIsUploading(false);
            return;
        }

        // מיפוי שדות - מאפשר גמישות בכותרות העמודות
        const processedGuests = data.map((row, index) => {
            // חיפוש שדות רלוונטיים בשמות שונים
            const fullName = row['שם מלא'] || row['שם'] || row['fullName'] || row['name'] || '';
            const phone = row['פלאפון'] || row['טלפון'] || row['נייד'] || row['phone'] || row['mobile'] || '';
            const email = row['מייל'] || row['אימייל'] || row['כתובת מייל'] || row['email'] || '';

            return {
                id: index + 1,
                fullName,
                phone,
                email,
                isValid: Boolean(fullName && phone && email) // בדיקה בסיסית לתקינות
            };
        });

        setGuests(processedGuests);
        setShowPreview(true);

        const validCount = processedGuests.filter(g => g.isValid).length;
        setMessage({
            text: `הועלו ${processedGuests.length} רשומות, מתוכן ${validCount} תקינות`,
            type: 'success'
        });
    };

    // שמירת הנתונים
    const saveGuestList = async () => {
        setMessage({ text: '', type: '' });
        setIsSaving(true);
        try {
            const response = await fetch(`${port}/guest/saveGuests/${eventId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId,
                    guests: guests.filter(g => g.isValid)
                })
            });
            const result = await response.json();
            if (response.status === 201) {
                setMessage({
                    text: result.message, // הודעת סטטוס מהשרת
                    type: 'success' // סוג ההודעה
                });
                setTimeout(() => {
                    setIsSaving(false);
                    navigate('/view-events');
                }, 2000);
            } else {
                if (result.unGuestsSaved) {
                    setError(true);
                    setGuestsDisSaved(result.unGuestsSaved)
                    setGuests(result.unGuestsSaved)
                }
                setIsSaving(false);
                setMessage({
                    text: result.error,
                    type: 'error'
                });
            }
        } catch (error) {
            setIsSaving(false);
            setMessage({
                text: result.error,
                type: 'error'
            });
        }
    };

    // טיפול בעריכת אורח
    const saveGuestEdit = (updatedGuest) => {
        setMessage({ text: '', type: '' });
        const updatedGuests = guests.map((guest) =>
            guest.id === updatedGuest.id ? updatedGuest : guest
        );
        setGuests(updatedGuests);
        setEditingGuest(null);
        setMessage({
            text: 'פרטי האורח עודכנו בהצלחה',
            type: 'success',
        });
    };

    // ביטול עריכה
    const cancelEdit = () => {
        setEditingGuest(null);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>העלאת רשימת מוזמנים</h2>

            {/* הסבר כללי */}
            {!showPreview && (<UploadInstructions />)}

            {/* תצוגת מקדימה של המוזמנים */}
            {showPreview && guests.length > 0 && (
                <div className={styles.previewSection}>
                    <h3 className={styles.sectionTitle}>רשימת מוזמנים</h3>

                    {/*  רשימת מוזמנים */}
                    <div className={styles.tableContainer}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead className={styles.tableHeader}>
                                    <tr>
                                        <th className={styles.tableHeaderCell}>
                                            #
                                        </th>
                                        <th className={styles.tableHeaderCell}>
                                            שם מלא
                                        </th>
                                        <th className={styles.tableHeaderCell}>
                                            טלפון
                                        </th>
                                        <th className={styles.tableHeaderCell}>
                                            מייל
                                        </th>
                                        <th className={styles.tableHeaderCell}>
                                            סטטוס
                                        </th>
                                        <th className={styles.tableHeaderCell}>
                                            פעולות
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guests.map((guest) =>
                                        editingGuest && editingGuest.id === guest.id ? (
                                            <EditGuest
                                                key={guest.id}
                                                guest={editingGuest}
                                                onSave={(updatedGuest) => saveGuestEdit(updatedGuest)}
                                                onCancel={cancelEdit}
                                            />
                                        ) : (
                                            <tr key={guest.id} className={!guest.isValid ? styles.invalidRow : guest.id === disSavedGuests.id ? styles.invalidRow : ''}>
                                                <td className={styles.tableCell}>{guest.id}</td>
                                                <td className={styles.tableCell}>
                                                    {guest.fullName || <span className={styles.missingField}>חסר</span>}
                                                </td>
                                                <td className={`${styles.tableCell} ${styles.ltr}`}>
                                                    {guest.phone || <span className={styles.emptyField}>-</span>}
                                                </td>
                                                <td className={`${styles.tableCell} ${styles.ltr}`}>
                                                    {guest.email || <span className={styles.emptyField}>-</span>}
                                                </td>
                                                <td className={styles.tableCell}>
                                                    {guest.isValid ? (
                                                        <span className={styles.validBadge}>תקין</span>
                                                    ) : (
                                                        <span className={styles.invalidBadge}>חסרים פרטים</span>
                                                    )}
                                                </td>
                                                <td className={styles.tableCell}>
                                                    <button
                                                        onClick={() => setEditingGuest(guest)}
                                                        className={styles.editButton}
                                                        title="ערוך"
                                                    >
                                                        <Pencil className={styles.actionIcon} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* סיכום והתראות */}
                    {!error && (<div className={styles.summarySection}>
                        <div className={styles.badgeContainer}>
                            <div className={styles.badge}>
                                סה"כ: {guests.length} מוזמנים
                            </div>
                            <div className={`${styles.badge} ${styles.validBadgeSmall}`}>
                                תקינים: {guests.filter(g => g.isValid).length} מוזמנים
                            </div>
                            {guests.filter(g => !g.isValid).length > 0 && (
                                <div className={`${styles.badge} ${styles.invalidBadgeSmall}`}>
                                    לא תקינים: {guests.filter(g => !g.isValid).length} מוזמנים
                                </div>
                            )}
                        </div>

                        {guests.filter(g => !g.isValid).length > 0 && (
                            <p className={styles.warningText}>
                                <AlertCircle className={styles.warningIcon} />
                                שים לב: רשומות לא תקינות לא יישמרו. כל השדות חובה.
                            </p>
                        )}
                    </div>)}
                </div>
            )}

            {/* הודעת סטטוס */}
            {message.text && (<MessageStatus message={message} setMessage={setMessage} />)}

            {/* כפתור העלאת קובץ */}
            {!isUploading && (<div className={styles.uploadSection}>
                <div className={styles.fileInputWrapper}>
                    <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileUpload}
                        className={styles.fileInput}
                        disabled={isUploading}
                    />
                    <button
                        className={`${styles.uploadButton} ${isUploading ? styles.uploadButtonDisabled : ''}`}
                    >
                        {isUploading ? (
                            <>
                                <div className={styles.spinner}></div>
                                <span>מעלה קובץ...</span>
                            </>
                        ) : (
                            <>
                                <Upload className={styles.buttonIcon} />
                                <span>העלאת קובץ אקסל או CSV</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
            )}

            {/* כפתור שמירה */}
            {isUploading && (<div className={styles.saveSection}>
                <button
                    onClick={saveGuestList}
                    disabled={isSaving || guests.filter(g => g.isValid).length === 0 || editingGuest !== null}
                    className={`${styles.saveAllButton} ${(isSaving || guests.filter(g => g.isValid).length === 0 || editingGuest !== null) ? styles.saveAllButtonDisabled : ''}`}
                >
                    {isSaving ? (
                        <>
                            <div className={styles.spinner}></div>
                            <span>שומר...</span>
                        </>
                    ) : (
                        <>
                            <Save className={styles.buttonIcon} />
                            <span>שמירת {guests.filter(g => g.isValid).length} מוזמנים</span>
                        </>
                    )}
                </button>
            </div>)}
        </div>
    );
};

export default UploadGuestList;