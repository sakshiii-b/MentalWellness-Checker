import React from 'react';

const Disclaimer = ({ handleAccept }) => {
  const disclaimerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    display: 'block',
    margin: '0 auto',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={disclaimerStyle} className="disclaimer">
      <h2 style={headerStyle}>Disclaimer</h2>
      <p style={paragraphStyle}>
        This application is designed for screening purposes to assess habits and behaviors based on the information provided by the user. The output provided, categorized into 'Low, Moderate, and Severe' factors, is generated solely from the data entered by the user and may not be entirely accurate or comprehensive. It is essential to note that this assessment does not substitute professional medical advice or diagnosis. Users are encouraged to consult with a qualified healthcare professional or a doctor for a thorough evaluation or if further guidance is needed based on the results obtained from this application.
      </p>
      <button
        style={buttonStyle}
        onClick={handleAccept}
        onMouseOver={(e) => (e.target.style = { ...buttonStyle, ...buttonHoverStyle })}
        onMouseOut={(e) => (e.target.style = buttonStyle)}
      >
        I Accept
      </button>
    </div>
  );
};

export default Disclaimer;
