
import React from 'react';
import './Result.css';

const ResultScreen = ({ submissionResult }) => {
  const ranges = {
    Good: [0.00, 1.00],
    Moderate: [1.01, 1.53],
    severe: [1.54, 4.00],
  };
  
  const determineRange = (result) => {
    const numericResult = parseFloat(result);

    for (const range in ranges) {
      const [min, max] = ranges[range];
      if (numericResult >= min && numericResult <= max) {
        return { range, color: getColorForRange(range) };
      }
    }
    return { range: 'Unknown', color: '#ccc' };
  };

  const getColorForRange = (range) => {
    switch (range.toLowerCase()) {
      case 'good':
        return 'green';
      case 'moderate':
        return '#ffa500'; // Light Orange
      case 'severe':
        return 'red';
      default:
        return '#ccc'; // Grey for Unknown
    }
  };

  const result = determineRange(submissionResult);
  const resultRange = result.range;
  const rangeColor = result.color;

  const getMessage = (range) => {
    switch (range.toLowerCase()) {
      case 'good':
        return 'Congratulations! Your mental health status is good.';
      case 'moderate':
        return 'You need to consult a therapist soon.';
      case 'severe':
        return 'You need immediate attention. Please consult a professional.';
      default:
        return '';
    }
  };

  const thankYouMessage = 'Thank you for taking the test.';
  const specificMessage = getMessage(resultRange);

  const handleReset = () => {
    window.location.reload();
  };

  const handleSearch = () => {
    const searchQuery = 'therapist near me';
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="result-container">
      <div className="result">
        <h1>RESULT</h1>
        <p className="thank-you-message">{thankYouMessage}</p>
        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>
          Your result falls into{' '}
          <span style={{ color: rangeColor }}>{resultRange}</span> range.
        </p>
        <div className="range-box">
          <span className={`box ${resultRange.toLowerCase()}`}>
            {resultRange}
          </span>
        </div>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }} className={resultRange.toLowerCase()}>
          {specificMessage}
        </p>

      </div>
      <p className="note">
        Note: We don't display the exact value, only the range it falls into.
      </p>
      <button onClick={handleReset}>Take New Test</button>
      <button onClick={handleSearch} className="action-button search-button">
        Find Therapist Near Me
      </button>
    </div>
  );
};

export default ResultScreen;