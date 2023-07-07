import React, { useState, useEffect } from 'react';

const Alert = ({ type, description, duration, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / (duration / 1000));
    }, 1000);

    setTimeout(() => {
      setVisible(false);
      clearInterval(timer);
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
    };
  }, [duration, onClose]);

  if (!visible) {
    return null;
  }

  const toastColor = type === 'success' ? '#32a852' : '#e53935';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#333',
        color: '#fff',
        padding: '10px',
        borderRadius: '4px',
        zIndex: 9999,
      }}
    >
      <p style={{ marginBottom: '4px', color: toastColor }}>
        {type === 'success' ? 'Success' : 'Error'}
      </p>
      <p style={{ marginBottom: '8px' }}>{description}</p>
      <div
        style={{
          width: '100%',
          height: '4px',
          background: '#ddd',
          borderRadius: '2px',
          marginTop: '6px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: toastColor,
            borderRadius: '2px',
            transition: 'width 1s linear',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Alert;
