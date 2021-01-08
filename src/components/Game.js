import React, { useState } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

const Game = () => {
  const [poem, setPoem] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const exampleFormat = FIELDS.map((field) => {
    if (field.key) {
      return field.placeholder;
    } else {
      return field;
    }
  }).join(' ');

  const enterLineToPoem = (words) => {
    // Use words object to fill in fields and join into string
    let newLine = FIELDS.map((field, i) => {
      if (typeof field === 'string') {
        return field;
      } else {
        return words[field.key];
      }
    }).join(' ');

    const newPoem = [...poem, newLine];

    setPoem(newPoem);

    // Advance current player count
    setCurrentPlayer(currentPlayer + 1);
  };

  // Function to check if recent submission should be shown
  const showRecentSubmission = () => {
    if (poem.length > 0 && !isSubmitted) {
      return true
    } else {
      return false
    }
  };

  // Function to end game and reveal poem + hide non-relevant elements
  const revealPoem = () => {
    setIsSubmitted(true);
  };

  // TODO remove
  console.log(isSubmitted);

  return (
    <div className="Game">
      <h2>Game</h2>

      <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

      <p>Please follow the following format for your poetry submission:</p>

      <p className="Game__format-example">
        { exampleFormat }
      </p>

      <div className={showRecentSubmission() ? 'visible' : 'hidden'}>
        <RecentSubmission submission={poem[poem.length-1]}/>
      </div>

      <div className={isSubmitted ? 'hidden' : 'visible'}>
        <PlayerSubmissionForm index={currentPlayer} fields={FIELDS} sendSubmission={enterLineToPoem} />
      </div>

      <FinalPoem submissions={poem} isSubmitted={isSubmitted} revealPoem={revealPoem}/>
    </div>
  );
}


const FIELDS = [
  'The',
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  'the',
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  {
    key: 'adv2',
    placeholder: 'adverb',
  }
];

export default Game;
