import React, { useState, useEffect } from 'react';
import { StarIcon, Heart, Users, Calendar, ChevronRight, ChevronLeft, Play } from 'lucide-react';
import {useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    event: '',
    text: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // נתוני סטטיסטיקה
  const stats = [
    { label: 'אירועים מוצלחים', value: '1,000+' },
    { label: 'לקוחות מרוצים', value: '950+' },
    { label: 'שנות ניסיון', value: '10+' },
    { label: 'המלצות', value: '4.9★' }
  ];

  // תמונות גלריה לדוגמה
  const galleryImages = [
    '/api/placeholder/800/500',
    '/api/placeholder/800/500',
    '/api/placeholder/800/500',
    '/api/placeholder/800/500'
  ];

  // טעינת תגובות מ-localStorage
  useEffect(() => {
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    }
  }, []);

  // שמירת תגובה חדשה
  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newTestimonialWithId = {
        ...newTestimonial,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };

      const updatedTestimonials = [newTestimonialWithId, ...testimonials];
      setTestimonials(updatedTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));

      setNewTestimonial({
        name: '',
        event: '',
        text: '',
        rating: 5
      });

      alert('תודה על התגובה שלך!');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('אירעה שגיאה בשליחת התגובה. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // החלפת תמונות אוטומטית
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* כותרת ראשית */}
      <div className="relative h-96 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              יוצרים את הרגעים המושלמים שלכם
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              עם ניסיון של למעלה מעשור, אנחנו כאן כדי להפוך כל אירוע לחוויה בלתי נשכחת
            </p>
          </div>
        </div>
      </div>

      {/* סטטיסטיקה */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* גלריית תמונות */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">הרגעים הקסומים שלנו</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg shadow-xl">
              <img
                src={galleryImages[currentSlide]}
                alt={`תמונה ${currentSlide + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prevSlide}
                  className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <Play className={`h-6 w-6 ${isPlaying ? 'text-blue-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* סרטון */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">צפו בסרטון התדמית שלנו</h2>
          <div className="max-w-4xl mx-auto aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-gray-800 w-full h-full flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* המלצות */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">מה הלקוחות שלנו אומרים</h2>
          
          {/* טופס הוספת המלצה */}
          <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">שתף את החוויה שלך</h3>
            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">שם מלא</label>
                <input
                  type="text"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial(prev => ({...prev, name: e.target.value}))}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">סוג האירוע</label>
                <input
                  type="text"
                  value={newTestimonial.event}
                  onChange={(e) => setNewTestimonial(prev => ({...prev, event: e.target.value}))}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">המלצה</label>
                <textarea
                  value={newTestimonial.text}
                  onChange={(e) => setNewTestimonial(prev => ({...prev, text: e.target.value}))}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">דירוג</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewTestimonial(prev => ({...prev, rating: num}))}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`h-6 w-6 ${
                          num <= newTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isSubmitting ? 'שולח...' : 'שלח המלצה'}
              </button>
            </form>
          </div>

          {/* הצגת ההמלצות */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.event}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(testimonial.timestamp).toLocaleDateString('he-IL')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* למה אנחנו */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">למה לבחור בנו?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">מערכת ניהול מתקדמת</h3>
              <p className="text-gray-600">מעקב מלא אחר כל פרט באירוע, ממספר המוזמנים ועד הסידור שולחנות</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">צוות מקצועי</h3>
              <p className="text-gray-600">צוות מנוסה שילווה אתכם מתחילת התכנון ועד לסיום האירוע</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">חווית לקוח מושלמת</h3>
              <p className="text-gray-600">שירות אישי ומותאם לצרכים הספציפיים של כל לקוח</p>
            </div>
          </div>
        </div>
      </div>

      {/* קריאה לפעולה */}
      <div className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">מוכנים להתחיל לתכנן את האירוע שלכם?</h2>
          <p className="mb-8 text-blue-100">צרו איתנו קשר עוד היום ונהפוך את החלום שלכם למציאות</p>
          <button onClick={() => navigate('/contactPage')} className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            צור קשר עכשיו
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;