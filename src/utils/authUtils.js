// utils/authUtils.js

// ניקוי כל המידע מה-localStorage 
export const clearAllUserData = () => {
  localStorage.clear();
};

// בדיקה אם קיים טוקן
export const isTokenPresent = () => {
  const tokenData = localStorage.getItem('tokenData');
  return !!tokenData;
};

// הגדרת מידע חדש למשתמש
export const setNewUserData = (token, hostName, hostId) => {
  // קודם מנקים את כל המידע הקיים
  clearAllUserData();
  
  // שומרים את המידע החדש עם זמן הפעילות
  const tokenData = {
    token,
    hostName,
    hostId,
    loginTime: new Date().toISOString(),
    lastActivity: new Date().getTime()
  };
  
  localStorage.setItem('tokenData', JSON.stringify(tokenData));
};

// קבלת המידע של המשתמש הנוכחי
export const getCurrentUser = () => {
  const tokenData = JSON.parse(localStorage.getItem('tokenData'));
  return tokenData ? {
    token: tokenData.token,
    hostName: tokenData.hostName,
    hostId: tokenData.hostId,
    loginTime: tokenData.loginTime
  } : "";
};

// עדכון זמן הפעילות האחרונה
export const updateLastActivity = () => {
  const tokenData = JSON.parse(localStorage.getItem('tokenData'));
  if (tokenData) {
    tokenData.lastActivity = new Date().getTime();
    localStorage.setItem('tokenData', JSON.stringify(tokenData));
  }
};

// בדיקה האם הטוקן תקף
export const validateToken = () => {
  const tokenData = JSON.parse(localStorage.getItem('tokenData'));
  
  if (!tokenData || !tokenData.token) {
    return false;
  }

  const currentTime = new Date().getTime();
  const lastActivity = tokenData.lastActivity;
  const fiveMinutes = 5 * 60 * 1000; // 5 דקות במילישניות

  // בודק אם עברו יותר מ-5 דקות מאז הפעילות האחרונה
  if (currentTime - lastActivity > fiveMinutes) {
    clearAllUserData(); // מוחק את כל המידע אם פג תוקפו
    return false;
  }

  // מעדכן את זמן הפעילות האחרונה
  updateLastActivity();
  return true;
};

// מאזין לפעילות המשתמש
export const initializeActivityListener = () => {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  
  events.forEach(event => {
    document.addEventListener(event, () => {
      if (validateToken()) {
        updateLastActivity();
      }
    });
  });
};