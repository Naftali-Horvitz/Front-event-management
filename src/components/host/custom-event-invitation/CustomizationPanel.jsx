// CustomizationPanel.jsx
import React from "react";
import { FaImage } from "react-icons/fa";
import { templates, commonEmojis } from "./constants";

const CustomizationPanel = ({
  selectedTemplate,
  setSelectedTemplate,
  customStyle,
  setCustomStyle,
  customMessage,
  setCustomMessage,
  customImage,
  setCustomImage,
  selectedEmojis,
  setSelectedEmojis,
}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCustomImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 animate-fadeInRight">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">התאמה אישית</h2>
      
      {/* Template Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">בחר תבנית</h3>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-2 rounded border ${
                selectedTemplate === template.id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Customization */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">צבעים</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label>צבע רקע</label>
            <input
              type="color"
              value={customStyle.backgroundColor}
              onChange={(e) =>
                setCustomStyle({ ...customStyle, backgroundColor: e.target.value })
              }
              className="rounded"
            />
          </div>
          <div className="flex items-center gap-3">
            <label>צבע טקסט</label>
            <input
              type="color"
              value={customStyle.textColor}
              onChange={(e) =>
                setCustomStyle({ ...customStyle, textColor: e.target.value })
              }
              className="rounded"
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">הוסף תמונה</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
            <FaImage />
            העלה תמונה
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {customImage && (
            <button
              onClick={() => setCustomImage(null)}
              className="text-red-500 hover:text-red-600"
            >
              הסר תמונה
            </button>
          )}
        </div>
      </div>

      {/* Emoji Selector */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">הוסף אימוג'ים</h3>
        <div className="flex flex-wrap gap-2">
          {commonEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmojis([...selectedEmojis, emoji])}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Message */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">התאם את הטקסט</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={customMessage.title}
            onChange={(e) =>
              setCustomMessage({ ...customMessage, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="כותרת"
          />
          <input
            type="text"
            value={customMessage.subtitle}
            onChange={(e) =>
              setCustomMessage({ ...customMessage, subtitle: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="כותרת משנה"
          />
          <input
            type="text"
            value={customMessage.footer}
            onChange={(e) =>
              setCustomMessage({ ...customMessage, footer: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="טקסט סיום"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;