import React from 'react';
import PropTypes from 'prop-types';
import '../scss/form.scss';

// recieves initial coords , submits values
const Form = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input type="text" placeholder="enter your move" />
    <button type="submit">move</button>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Form;
