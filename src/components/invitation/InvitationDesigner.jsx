import React, { useState } from 'react';
import { useEventContext } from "../../context/EventDataContext";

const InvitationDesigner = () => {
  const { eventData, hostName } = useEventContext(); // קבלת נתוני האירוע מהקונטקסט
  // מידע האירוע המתקבל מהשלב הקודם (בדוגמה זו נשתמש בנתונים לדוגמה)
  // const [eventData, setEventData] = useState({
  //   title: "מסיבת יום הולדת",
  //   date: "2025-05-15",
  //   time: "19:00",
  //   location: "גן האירועים המלכותי, תל אביב",
  //   hostName: "ישראל ישראלי",
  //   description: "בואו לחגוג איתנו ערב בלתי נשכח!"
  // });
  const { title, date, time, location, eventDescription } = eventData;
  // אם אין נתונים, נציג הודעה מתאימה
  if (!eventData || !eventData.eventName) {
    return <div className="text-center text-red-500">לא נמצאו נתוני אירוע.</div>;
  }
  // אפשרויות עיצוב
  const [design, setDesign] = useState({
    template: 'elegant', // 'elegant', 'casual', 'formal', 'fun'
    backgroundColor: '#ffffff',
    headerColor: '#4a6ea9',
    textColor: '#333333',
    fontFamily: 'Rubik',
    fontSize: 'medium', // 'small', 'medium', 'large'
    imageUrl: null,
  });

  // תבניות עיצוב מוכנות מראש
  const templates = [
    { id: 'elegant', name: 'אלגנטי', bg: '#ffffff', header: '#4a6ea9', text: '#333333' },
    { id: 'casual', name: 'יומיומי', bg: '#f9f3e6', header: '#e67e22', text: '#444444' },
    { id: 'formal', name: 'רשמי', bg: '#f5f5f5', header: '#2c3e50', text: '#333333' },
    { id: 'fun', name: 'כיפי', bg: '#e8f4ff', header: '#9b59b6', text: '#444444' },
  ];

  // גודלי טקסט
  const fontSizes = {
    small: { title: 'text-xl', subtitle: 'text-lg', body: 'text-sm' },
    medium: { title: 'text-2xl', subtitle: 'text-xl', body: 'text-base' },
    large: { title: 'text-3xl', subtitle: 'text-2xl', body: 'text-lg' },
  };

  // אפשרויות פונטים
  const fontOptions = [
    { id: 'Rubik', name: 'רובי' },
    { id: 'Arial', name: 'אריאל' },
    { id: 'David', name: 'דוד' },
    { id: 'Miriam', name: 'מרים' },
  ];

  // טיפול בשינוי תבנית
  const handleTemplateChange = (templateId) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    setDesign({
      ...design,
      template: templateId,
      backgroundColor: selectedTemplate.bg,
      headerColor: selectedTemplate.header,
      textColor: selectedTemplate.text
    });
  };

  // טיפול בהעלאת תמונה
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      // במציאות פה תהיה לוגיקה לאחסון התמונה בשרת
      // לצורך הדוגמה אנחנו רק מציגים אותה באופן מקומי
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setDesign({ ...design, imageUrl });
    }
  };

  // ריינדור של תצוגה מקדימה של ההזמנה
  const renderInvitationPreview = () => {
    const fontSizeClasses = fontSizes[design.fontSize];

    return (
      <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg"
        style={{ backgroundColor: design.backgroundColor, fontFamily: design.fontFamily, direction: "rtl" }}>

        {design.imageUrl && (
          <div className="w-full h-40 overflow-hidden">
            <img src={design.imageUrl} alt="תמונת הזמנה" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6">
          <div className={`${fontSizeClasses.title} font-bold mb-4 text-center`}
            style={{ color: design.headerColor }}>
            {eventData.eventName}
          </div>
          <div className={`${fontSizeClasses.body} mb-4 text-center`}
            style={{ color: design.textColor }}>
            {eventData.eventDescription}
          </div>
          <div className={`${fontSizeClasses.subtitle} font-semibold mb-3 text-center`}
            style={{ color: design.headerColor }}>
            מאת: {hostName}
          </div>

          <div className="border-t border-b py-3 my-4" style={{ borderColor: design.headerColor }}>
            <div className={`${fontSizeClasses.body} flex justify-between my-1`}
              style={{ color: design.textColor }}>
              <span className="font-semibold">תאריך:</span>
              <span>{new Date(eventData.eventDate).toLocaleDateString('he-IL')}</span>
            </div>
            <div className={`${fontSizeClasses.body} flex justify-between my-1`}
              style={{ color: design.textColor }}>
              <span className="font-semibold">שעה:</span>
              <span>{eventData.eventTime}</span>
            </div>
            <div className={`${fontSizeClasses.body} flex justify-between my-1`}
              style={{ color: design.textColor }}>
              <span className="font-semibold">מיקום:</span>
              <span>{eventData.eventLocation}</span>
            </div>
          </div>

          <div className={`${fontSizeClasses.body} text-center mt-4`}
            style={{ color: design.headerColor }}>
            נשמח לראותכם!
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-100 min-h-screen" style={{ direction: "rtl", paddingTop: 50, paddingRight: 100 }}>
      {/* תפריט עיצוב */}
      <div className="md:w-1/3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-center">עצב את ההזמנה שלך</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">בחר תבנית</label>
          <div className="grid grid-cols-2 gap-2">
            {templates.map(template => (
              <button
                key={template.id}
                className={`p-2 text-center rounded ${design.template === template.id ? 'ring-2 ring-blue-500' : 'bg-gray-50'}`}
                onClick={() => handleTemplateChange(template.id)}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">צבע רקע</label>
          <input
            type="color"
            value={design.backgroundColor}
            onChange={(e) => setDesign({ ...design, backgroundColor: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">צבע כותרות</label>
          <input
            type="color"
            value={design.headerColor}
            onChange={(e) => setDesign({ ...design, headerColor: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">צבע טקסט</label>
          <input
            type="color"
            value={design.textColor}
            onChange={(e) => setDesign({ ...design, textColor: e.target.value })}
            className="w-full h-10 rounded cursor-pointer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">פונט</label>
          <select
            value={design.fontFamily}
            onChange={(e) => setDesign({ ...design, fontFamily: e.target.value })}
            className="w-full p-2 border rounded"
          >
            {fontOptions.map(font => (
              <option key={font.id} value={font.id}>{font.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">גודל טקסט</label>
          <div className="flex justify-between">
            <button
              className={`px-4 py-1 rounded ${design.fontSize === 'small' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setDesign({ ...design, fontSize: 'small' })}
            >
              קטן
            </button>
            <button
              className={`px-4 py-1 rounded ${design.fontSize === 'medium' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setDesign({ ...design, fontSize: 'medium' })}
            >
              בינוני
            </button>
            <button
              className={`px-4 py-1 rounded ${design.fontSize === 'large' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setDesign({ ...design, fontSize: 'large' })}
            >
              גדול
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">הוסף תמונה</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          שמור עיצוב
        </button>
      </div>

      {/* תצוגה מקדימה */}
      <div className="md:w-2/3">
        <h2 className="text-xl font-bold mb-4 text-center">תצוגה מקדימה</h2>
        {renderInvitationPreview()}
      </div>
    </div>
  );
};

export default InvitationDesigner;