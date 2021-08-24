import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Form from './ContactFormStyled';

const initialState = {
  name: '',
  number: '',
};

const ContactForm = ({ addContact }) => {
  const [state, setState] = useState({ ...initialState });

  const onHandelChange = e => {
    const name = e.target.name;
    setState(prevState => ({ ...prevState, [name]: e.target.value }));
  };

  const onHandelSubmit = e => {
    e.preventDefault();
    const user = {
      id: uuidv4(),
      name: state.name,
      number: state.number,
    };

    addContact(user);
    if (state.name && state.number) {
      setState({ name: '', number: '' });
    }
  };

  return (
    <Form onSubmit={onHandelSubmit}>
      <label className="form_fild">
        <span className="form_text">Name: </span>
        <input
          className="form_input"
          placeholder="Enter name..."
          type="text"
          name="name"
          value={state.name}
          onChange={onHandelChange}
        ></input>
      </label>
      <label className="form_fild">
        <span className="form_text">Number: </span>
        <input
          className="form_input"
          placeholder="+38(067)-111-11-11"
          type="tel"
          name="number"
          value={state.number}
          onChange={onHandelChange}
        ></input>
      </label>
      <button className="form_btn" type="submit">
        Add contact
      </button>
    </Form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};