import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  // Temporarily store the words list before putting them in state object
  // This solves an infinite re-render loop issue with setState
  // let wordsList = [];

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

  const inputElements = props.fields.map((field, i) => {
    if (typeof field === 'string') {
      return(
        <div key={i}>
          {field}
        </div>
        ); // Return just the hardcoded word
    } else { // Else it's an object
      // We want to add the key to the words array
      // wordsList = [...wordsList, field.key];
      // const newWords = {...words};
      // console.log(newWords);
      // newWords[field.key] = '';
      // console.log(newWords);
      // setWords(newWords);

      return(
      <div key={i}>
        <input name={field.key} type="text" placeholder={field.placeholder} value={words.key} onChange={onInputChange} />
      </div>
      )
    }
  });

  // Convert the wordsList array into a words object that we can store in state
  // const wordsObject = wordsList.reduce((acc, curr) => (acc[curr] = '', acc), {});
  // setWords(wordsObject);

  console.log(words);

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{props.index}</h3>

      <form className="PlayerSubmissionForm__form" >

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
