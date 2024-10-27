import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import "../../../src/cssS/SuccessMessage.css";
import config from "../../config.js";

const SuccessMessage = () => {
  const location = useLocation();
  const {
    eventId,
    eventName,
    eventLocation,
    eventDate,
    eventDescription,
    hostName,
  } = location.state || {};
  
  const [copySuccess, setCopySuccess] = useState('');
  const [shareOptionsVisible, setShareOptionsVisible] = useState(false);
  
  const port = config.backendUrl;
  const registrationUrl = `/guest/${eventId}`;
  
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
    הירשם כאן: <a href="${registrationUrl}">הירשם כאן</a>
  `;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToShare);
      setCopySuccess('ההודעה הועתקה!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      console.error('שגיאה בהעתקה: ', err);
    }
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
        <button 
          onClick={() => setShareOptionsVisible(prev => !prev)} 
          className="share-button" 
          title="שתף"
          aria-label="שתף"
        >
          <FaShareAlt />
        </button>
        {shareOptionsVisible && (
          <div className="share-buttons-container">
            <button 
              onClick={copyToClipboard} 
              className="share-button copy-button" 
              title="העתק הודעה"
              aria-label="העתק הודעה"
            >
              <MdContentCopy />
            </button>
            {copySuccess && <span className="copy-success">{copySuccess}</span>}
            <button 
              onClick={shareViaWhatsApp} 
              className="share-button whatsapp-button" 
              title="שתף בוואטסאפ"
              aria-label="שתף בוואטסאפ"
            >
              <FaWhatsapp />
            </button>
            <button 
              onClick={shareViaEmail} 
              className="share-button email-button" 
              title="שתף באימייל"
              aria-label="שתף באימייל"
            >
              <MdEmail />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage;
