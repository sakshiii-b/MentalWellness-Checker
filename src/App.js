import React, { useState, useEffect } from 'react';
import './App.css';
import Disclaimer from './Disclaimer';
import ResultScreen from './ResultScreen';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://192.168.123.244:5000/fetch_questions');
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const data = await response.json();
        console.log('Fetched Questions:', data);
        const initialSelectedOptions = data.questions.reduce((acc, question, index) => {
          acc[index] = null;
          return acc;
        }, {});
        setSelectedOptions(initialSelectedOptions);
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleContinue = () => {
    const valuesArray = Array.from(Object.values(selectedOptions));
    const jsonString = JSON.stringify(valuesArray);
    console.log(jsonString);
    if (!selectedOptions[currentQuestionIndex]) {
      alert('Please select an option to continue.');
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  
  const handleSubmission = async () => {
    try {
      const selectedOptionsArray = Object.values(selectedOptions)
      .filter(option => option !== null && option !== undefined)
      .map(option => [option]);
      const valuesArray = Array.from(Object.values(selectedOptions));
      const jsonString = JSON.stringify(valuesArray); 
      console.log(jsonString);

      const response = await fetch('http://192.168.123.244:5000/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesArray),
      });

      const result = await response.json(); // Parse the response JSON
      setSubmissionResult(result.result); 

      // const result = 13;
      // setSubmissionResult(response);

      console.log('Submission result:', response);
      console.log('Selected Options:', selectedOptionsArray);
    } catch (error) {
      console.error('Error submitting options:', error);
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  if (submissionResult !== null) {
    return <ResultScreen submissionResult={submissionResult} />;
  }

  const handleAcceptDisclaimer = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAcceptedDisclaimer(true);
      setTimeout(() => {
        setShowDisclaimer(false);
        setIsTransitioning(false);
      }, 500);
    }, 500); 
  };

  if (showDisclaimer && !acceptedDisclaimer) {
    return <Disclaimer handleAccept={handleAcceptDisclaimer} />;
  }

  const footerData = {
    createdBy: 'Created by team MentalWellness Checker',
  };

  if (questions.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    
    <div className={`app-container ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="main-content">
      
        <h1>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</h1>
        <ul>
          {currentQuestion.options.filter(option => option !== null && option.trim() !== '').map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleOptionSelect(option)}
                className={selectedOptions[currentQuestionIndex] === option ? 'selected' : ''}
                disabled={selectedOptions[currentQuestionIndex] && selectedOptions[currentQuestionIndex] !== option}>
                {option}
              </button>
            </li>
          ))}
        </ul>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleContinue} className="continue-button"> Continue </button>
        ) : (
          <button onClick={handleSubmission} className="submit-button"> Submit </button>
        )}
        <button onClick={handleReset} className="reset-button"> Reset </button>
      </div>
      <footer className="footer"> <p> {footerData.createdBy} </p> </footer>
    </div>
  );
};
export default App;
