// utils/validation.js
export const validationRules = {
  fullName: {
    required: true,
    minLength: 2,
    pattern: /^[\u0590-\u05FF\s]{2,}$/u,
    messages: {
      required: 'שדה חובה',
      minLength: 'שם חייב להכיל לפחות 2 תווים',
      pattern: 'נא להזין שם בעברית בלבד'
    }
  },
  phone: {
    required: true,
    pattern: /^05\d{8}$/,
    messages: {
      required: 'שדה חובה',
      pattern: 'מספר טלפון לא תקין (יש להזין 10 ספרות המתחילות ב-05)'
    }
  },
  userId: {
    required: true,
    pattern: /^\d{9}$/,
    messages: {
      required: 'שדה חובה',
      pattern: 'תעודת זהות חייבת להכיל 9 ספרות בדיוק'
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'שדה חובה',
      pattern: 'כתובת אימייל לא תקינה'
    }
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    messages: {
      required: 'שדה חובה',
      minLength: 'סיסמה חייבת להכיל לפחות 8 תווים',
    }
  }
};

export const validateField = (name, value) => {
  const rules = validationRules[name];
  if (!rules) return '';

  if (rules.required && !value) {
    return rules.messages.required;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return rules.messages.minLength;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.messages.pattern;
  }

  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  Object.keys(formData).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};





// utils/validation.js

export const loginValidationRules = {
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messages: {
      required: 'שדה חובה',
      pattern: 'כתובת אימייל לא תקינה'
    }
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    messages: {
      required: 'שדה חובה',
      minLength: 'סיסמה חייבת להכיל לפחות 8 תווים',
    }
  }
};

export const validateLoginField = (name, value) => {
  const rules = loginValidationRules[name];
  if (!rules) return '';

  if (rules.required && !value) {
    return rules.messages.required;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return rules.messages.minLength;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.messages.pattern;
  }

  return '';
};

export const validateLoginForm = (formData) => {
  const errors = {};
  let isValid = true;

  Object.keys(formData).forEach(fieldName => {
    const error = validateLoginField(fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};