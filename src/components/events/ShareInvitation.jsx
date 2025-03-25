import { Calendar, MapPin, User, FileText } from "lucide-react";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import config from "../../config.js";
import { useState } from "react";
import { useEventContext } from "../../context/eventDataContext";
import { formatDate } from "./formatDate.js";

const ShareInvitation = () => {

    const port = config.backendUrl;
    const [copySuccess, setCopySuccess] = useState("");
    const { hostName, eventData } = useEventContext();
    const { eventName, eventDescription, eventLocation, eventDate, eventTime, eventId } = eventData;
    const registrationUrl = `${port}/guest/${eventId}`;

    // המרת התאריך לפורמט dd/mm/yyyy
    const formattedEventDate = eventDate ? formatDate(eventDate) : '';


    const messageHtml = `
    <h2>הזמנה לאירוע</h2>
    <p>אנו שמחים להזמינך:</p>
    <p>ל${eventName}</p>
    <p>${eventDescription}</p>
    <p><strong>האירוע יתקיים ב</strong> ${eventLocation}</p>
    <p><strong>בתאריך</strong> ${formattedEventDate}</p>
    <p><strong>בשעה</strong> ${eventTime}</p>
    <p><strong>נא הבטיחו מקומכם איתנו</strong></p>
    <p><strong>מצפים לכם ${hostName}</strong></p>
    <p><a href="${registrationUrl}">הירשם כאן</a></p>
  `;

    const textToShare = `
    הזמנה לאירוע
    אנו שמחים להזמינך:
    ל${eventName}
    ${eventDescription}
    האירוע יתקיים ב: ${eventLocation}
    בתאריך: ${formattedEventDate}
    בשעה: ${eventTime}
    נא הבטיחו מקומכם איתנו
    מצפים לכם: ${hostName}
    הירשם כאן: ${registrationUrl}
  `;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(textToShare);
            setCopySuccess("ההודעה הועתקה!");
            setTimeout(() => setCopySuccess(""), 3000);
        } catch (err) {
            console.error("שגיאה בהעתקה: ", err);
        }
    };
    const shareViaWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareViaEmail = () => {
        const emailSubject = encodeURIComponent(`הזמנה לאירוע: ${eventName}`);
        const emailBody = encodeURIComponent(messageHtml);
        window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    };
    return (
        <div>
            {/* Event Details Card */}
            <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800">{eventName}</h2>
                        <p className="text-gray-600">{eventDescription}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">מיקום: {eventLocation}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">בתאריך: {formattedEventDate}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">בשעה: {eventTime}</span>
                </div>
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">מארח: {hostName}</span>
                </div>
            </div>

            {/* Share Options */}
            <div className="space-y-4">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={shareViaWhatsApp}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                        שתף בוואטסאפ
                    </button>
                    <button
                        onClick={shareViaEmail}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <MdEmail className="w-5 h-5" />
                        שתף באימייל
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <MdContentCopy className="w-5 h-5" />
                        העתק קישור
                    </button>
                </div>
                {copySuccess && (
                    <div className="text-center text-green-600 animate-fadeIn">
                        {copySuccess}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShareInvitation;