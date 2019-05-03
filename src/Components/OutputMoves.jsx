import React from 'react';
import PropTypes from 'prop-types';
import '../scss/outputMoves.scss';

// outputs data, recieved from props(Array)
const OutputMoves = ({ data }) => (
  <div className="wrapper">
    <h2>Possible moves:</h2>
    <div className="results">
      {data.map((move, i) => <p key={i}>{move}</p>)}
    </div>
  </div>
);

OutputMoves.propTypes = {
  data: PropTypes.array,
};

export default OutputMoves;
