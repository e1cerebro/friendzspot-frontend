import React from 'react';
import './search-field.style.css';

const SearchField = () => {
  return (
    <div
      class='input-field col s12'
      style={{
        marginBottom: 0,
        marginTop: 0,
        padding: 0,
        backgroundColor: '#fff',
      }}>
      <input value='' id='first_name2' type='text' />
      <label class='' for='first_name2'>
        Search or start a new chat
      </label>
    </div>
  );
};

export default SearchField;
