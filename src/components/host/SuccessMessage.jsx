import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import "../../../src/cssS/SuccessMessage.css";
const port = config.backendUrl;

const SuccessMessage = () => {
  const location = useLocation();
  const { eventId, eventName, eventLocation, eventDate, eventDescription, hostName } = location.state || {};
  const [copySuccess, setCopySuccess] = useState('');
  const [shareOptionsVisible, setShareOptionsVisible] = useState(false);
  const port = config.backendUrl;

  const registrationUrl = `${port}/guest/${eventId}`;

  const messageHtml = `
    <h2>הזמנה לאירוע</h2>
    <p>אנו שמחים להזמינך:</p>
    <p>ל${eventName}</p>
    <p>${eventDescription}</p>
    <p><strong>האירוע יתקיים ב</strong> ${eventLocation}</p>
    <p><strong>בתאריך</strong> ${eventDate}</p>
    <p><strong>נא הבטיחו מקומכם איתנו</strong></p>
    <p><strong>מצפים לכם ${hostName}</strong></p>
    <p><a href="${registrationUrl}">הירשם כאן</a></p>
  `;

  const textToShare = `
    הזמנה לאירוע
    אנו שמחים להזמינך:
    ל${eventName}
    ${eventDescription}
    האירוע יתקיים ב${eventLocation}
    בתאריך ${eventDate}
    נא הבטיחו מקומכם איתנו
    מצפים לכם ${hostName}
    הירשם כאן: ${registrationUrl}
  `;

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = textToShare;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess('ההודעה הועתקה!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      console.error('שגיאה בהעתקה: ', err);
    }
    document.body.removeChild(textArea);
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaEmail = () => {
    const emailSubject = encodeURIComponent(`הזמנה לאירוע: ${eventName}`);
    const emailBody = encodeURIComponent(messageHtml);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="success-message-container">
      <div dangerouslySetInnerHTML={{ __html: messageHtml }} />
      <div className="share-options">
        <button onClick={() => setShareOptionsVisible(!shareOptionsVisible)} className="share-button" title="שתף">
          <FaShareAlt />
        </button>
        {shareOptionsVisible && (
          <div className="share-buttons-container">
            <button onClick={copyToClipboard} className="share-button copy-button" title="העתק הודעה">
              <MdContentCopy />
            </button>
            {copySuccess && <span className="copy-success">{copySuccess}</span>}
            <button onClick={shareViaWhatsApp} className="share-button whatsapp-button" title="שתף בוואטסאפ">
              <FaWhatsapp />
            </button>
            <button onClick={shareViaEmail} className="share-button email-button" title="שתף באימייל">
              <MdEmail />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage;