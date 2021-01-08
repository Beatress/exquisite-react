import React from 'react';
import PropTypes from 'prop-types';
import './FinalPoem.css';

const FinalPoem = (props) => {

  const finalPoem = props.submissions.map((line, i) => {
    return(
      <li key={i}>
        {line}
      </li>
    )
  });

  return (
    <div className='FinalPoem'>
      <section className={`FinalPoem__poem ${props.isSubmitted ? 'visible' : 'hidden'}`}>
        <h3>Final Poem</h3>
        <ul className="FinalPoem__poem--ul">
          {finalPoem}
        </ul>
      </section>
      <div className={`FinalPoem__reveal-btn-container ${props.isSubmitted ? 'hidden' : 'visible'}`}>
        <input type="button" value="We are finished: Reveal the Poem" className="FinalPoem__reveal-btn" onClick={props.revealPoem} />
      </div>
    </div>
  );
}

FinalPoem.propTypes = {
  isSubmitted: PropTypes.bool.isRequired,
  submissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  revealPoem: PropTypes.func.isRequired,
};

export default FinalPoem;
