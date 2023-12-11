import React from 'react';
import './Result.css'; // Import your CSS file for styling

const ResultScreen = ({ submissionResult }) => {
  // const [searchResult, setSearchResult] = useState('');
  // Define the ranges
  const ranges = {
    Good: [0.47, 1.00],
    Moderate: [1.01, 1.53],
    severe: [1.54, 4.00],
  };
  
  const handleSearch = () => {
    const searchQuery = 'psychiatrist near me';
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(searchUrl, '_blank');
  };



  // Function to determine the range based on the submission result
  const determineRange = (result) => {
    for (const range in ranges) {
      const [min, max] = ranges[range];
      if (result >= min && result <= max) {
        return range;
      }
    }
    return 'Unknown'; // If the value doesn't fall into any defined range
  };

  // Get the range based on the submission result
  const resultRange = determineRange(submissionResult);

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="result-container">
      <h2>Result</h2>
      <div className="result">
        <p>Your result falls in the:</p>
        {/* <p>{submissionResult}</p> */}
        <p className={resultRange.toLowerCase()}>{resultRange}</p>
      </div>
      <p className="note">Note: We don't display the exact value, only the range it falls into.</p>
      <button onClick={handleReset} >Take New Test</button>
      <button onClick={handleSearch} className="action-button search-button" >Find Psychiatrist Near Me</button>
    </div>
  );
};

export default ResultScreen;
