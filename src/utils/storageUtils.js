// utils/storageUtils.js

// שמירת נתוני המשתמש
export const setUserData = (hostName, hostId) => {
    localStorage.setItem('hostName', hostName);
    localStorage.setItem('hostId', hostId);
  };
  
  // קבלת נתוני המשתמש
  export const getUserData = () => {
    return {
      hostName: localStorage.getItem('hostName'),
      hostId: localStorage.getItem('hostId')
    };
  };
  
  // ניקוי נתוני המשתמש
  export const clearUserData = () => {
    localStorage.removeItem('hostName');
    localStorage.removeItem('hostId');
  };
  
  // בדיקה אם יש נתוני משתמש
  export const hasUserData = () => {
    return !!(localStorage.getItem('hostName') && localStorage.getItem('hostId'));
  };