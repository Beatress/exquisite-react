import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  // Function to pull the base state of words from the fields prop 
  const generateWordObject = () => {
    let wordsObject = {};
    props.fields.forEach(word => {
      if (typeof word === 'object') {
        wordsObject[word.key] = '';
      }
    })

    return wordsObject;
  };

  // We have to define these before the inputElements makes the textboxes
  const [words, setWords] = useState(generateWordObject);

  const onInputChange = (event) => {
    const newWords = {...words};

    newWords[event.target.name] = event.target.value;
    setWords(newWords);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    // Send words to game
    props.sendSubmission(words);

    // Clear words
    setWords(generateWordObject);
  }

  const inputElements = props.fields.map((field, i) => {
    if (typeof field === 'string') {
      return(
        <div key={i}>
          {field}
        </div>
        ); // Return just the hardcoded word
    } else { // Else it's an object
      return(
      <div key={i}>
        <input name={field.key} type="text" placeholder={field.placeholder} 
        value={words[field.key]} onChange={onInputChange} 
        className={(words[field.key].length === 0) ? 'pink' : 'wiggle'}/>
      </div>
      )
    }
  });

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{props.index}</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onFormSubmit}>

        <div className="PlayerSubmissionForm__poem-inputs">

          {inputElements}

        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
