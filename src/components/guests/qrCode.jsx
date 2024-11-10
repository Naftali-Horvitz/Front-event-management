import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [idNumber, setIdNumber] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');

  const generateQRCode = () => {
    // כאן יהיה קוד המייצר את המחרוזת של קוד ה-QR בהתאם ל-idNumber
    const qrCodeData = `https://example.com/${idNumber}`;
    setQRCodeValue(qrCodeData);
  };

  return (
    <div>
      <input
        type="text"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        placeholder="הזן את מספר הת.ז שלך"
      />
      <button onClick={generateQRCode}>הפק קוד QR</button>
      {qrCodeValue && <QRCode value={qrCodeValue} />}
    </div>
  );
};

export default QRCodeGenerator;
