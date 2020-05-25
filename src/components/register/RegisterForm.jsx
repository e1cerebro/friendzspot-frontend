import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../../shared/custom-button/CustomButton';
import Icon from '../../shared/icon/Icon';
import { registerAction } from '../../redux/actions/user.actions';

const RegisterForm = ({ registerAction }) => {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const handleSubmit = event => {
    event.preventDefault();
    registerAction(inputs);
  };

  const handleInputChange = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <input
            placeholder='Enter your firstname'
            id='firstname'
            onChange={handleInputChange}
            type='text'
            value={inputs.firstname}
            className='validate firstname'
          />
          <label htmlFor='firstname'></label>
        </div>{' '}
        <div className='input-field'>
          <input
            placeholder='Enter your lastname'
            id='lastname'
            onChange={handleInputChange}
            type='text'
            value={inputs.lastname}
            className='validate lastname'
          />
          <label htmlFor='lastname'></label>
        </div>
        <div className='input-field'>
          <input
            placeholder='Enter your email'
            id='email'
            onChange={handleInputChange}
            type='email'
            value={inputs.email}
            className='validate email'
          />
          <label htmlFor='email'></label>
        </div>
        <div className='input-field'>
          <input
            placeholder='Enter your password'
            id='password'
            onChange={handleInputChange}
            type='password'
            value={inputs.password}
            className='validate password'
          />
          <label htmlFor='password'></label>
        </div>
        <div className='input-field'>
          <input
            placeholder='Enter your confirm password'
            id='confirmpassword'
            onChange={handleInputChange}
            type='password'
            value={inputs.confirmpassword}
            className='validate confirmpassword'
          />
          <label htmlFor='confirmpassword'></label>
        </div>
        <CustomButton
          className='waves-effect red darken-4'
          type='submit'
          name='login'>
          Register Account <Icon icon='create' color='#fff' />
        </CustomButton>
      </form>
    </div>
  );
};

export default connect(null, { registerAction })(RegisterForm);
