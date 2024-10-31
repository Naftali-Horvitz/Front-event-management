import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">צור קשר</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* כרטיס טלפון */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">טלפון</h3>
              <p className="text-gray-600 mt-1">053-4899854</p>
            </div>
          </div>

          {/* כרטיס אימייל */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">אימייל</h3>
              <p className="text-gray-600 mt-1">ndhb1462@gmail.com</p>
            </div>
          </div>

          {/* כרטיס כתובת */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">כתובת</h3>
              <p className="text-gray-600 mt-1">רחוב הדוגמה 1, תל אביב</p>
            </div>
          </div>
        </div>

        {/* טופס יצירת קשר */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">שלח הודעה</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  טלפון
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  הודעה
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                שלח הודעה
              </button>
            </form>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-center">
                  תודה על פנייתך! נחזור אליך בהקדם האפשרי.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;