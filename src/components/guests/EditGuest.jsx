// EditGuest.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import styles from '../../styles/components/EditGuest.module.css';

const EditGuest = ({ guest, onSave, onCancel }) => {
    const [editingGuest, setEditingGuest] = useState({ ...guest });

    useEffect(() => {
        setEditingGuest({ ...guest });
    }, [guest]);

    const handleEditChange = (e, field) => {
        setEditingGuest((prev) => ({
            ...prev,
            [field]: e.target.value,
            isValid:
                field === 'fullName'
                    ? Boolean(e.target.value && prev.phone && prev.email)
                    : field === 'phone'
                    ? Boolean(prev.fullName && e.target.value && prev.email)
                    : Boolean(prev.fullName && prev.phone && e.target.value),
        }));
    };

    return (
        <tr className={!editingGuest.isValid ? styles.invalidRow : ''}>
            <td className={styles.tableCell}>{editingGuest.id}</td>
            <td className={styles.tableCell}>
                <input
                    type="text"
                    value={editingGuest.fullName}
                    onChange={(e) => handleEditChange(e, 'fullName')}
                    className={styles.editInput}
                />
            </td>
            <td className={`${styles.tableCell} ${styles.ltr}`}>
                <input
                    type="text"
                    value={editingGuest.phone}
                    onChange={(e) => handleEditChange(e, 'phone')}
                    className={styles.editInput}
                    dir="ltr"
                />
            </td>
            <td className={`${styles.tableCell} ${styles.ltr}`}>
                <input
                    type="text"
                    value={editingGuest.email}
                    onChange={(e) => handleEditChange(e, 'email')}
                    className={styles.editInput}
                    dir="ltr"
                />
            </td>
            <td className={styles.tableCell}>
                {editingGuest.isValid ? (
                    <span className={styles.validBadge}>תקין</span>
                ) : (
                    <span className={styles.invalidBadge}>חסרים פרטים</span>
                )}
            </td>
            <td className={styles.tableCell}>
                <div className={styles.actionButtons}>
                    <button
                        onClick={() => onSave(editingGuest)}
                        className={styles.saveButton}
                        title="שמור"
                    >
                        <CheckCircle className={styles.actionIcon} />
                    </button>
                    <button
                        onClick={onCancel}
                        className={styles.cancelButton}
                        title="בטל"
                    >
                        <X className={styles.actionIcon} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default EditGuest;
