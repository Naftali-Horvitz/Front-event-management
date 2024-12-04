import { jwtDecode } from "jwt-decode";

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
  const fiveMinutes = 5 * 60 * 1000;

  if (currentTime - lastActivity > fiveMinutes) {
    clearAllUserData();
    return false;
  }

  try {
    // בדיקת תוקף הטוקן JWT עצמו
    const decoded = jwtDecode(tokenData.token);
    if (decoded.exp * 1000 < currentTime) {
      clearAllUserData();
      return false;
    }
  } catch (error) {
    return false;
  }

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