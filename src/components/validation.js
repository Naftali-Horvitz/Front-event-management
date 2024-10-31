import * as Yup from 'yup';

const validation = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'שם מלא חייב להיות לפחות 3 תווים')
    .max(50, 'שם מלא לא יכול להיות יותר מ-50 תווים')
    .required('שדה זה הכרחי'),
  userId: Yup.string()
    .matches(/^\d{9}$/, 'תעודת זהות חייבת להיות 9 ספרות')
    .required('שדה זה הכרחי'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'מספר טלפון חייב להיות 10 ספרות')
    .required('שדה זה הכרחי'),
  email: Yup.string()
    .email('כתובת מייל לא חוקית')
    .required('שדה זה הכרחי'),
  password: Yup.string()
    .min(8, 'סיסמה חייבת להיות לפחות 8 תווים')
    .required('שדה זה הכרחי'),
});

export default validation;