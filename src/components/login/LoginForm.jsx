import React, { useState } from 'react';
import FormInput from '../../shared/form-input/FormInput';
import './login-form.style.css';
import CustomButton from '../../shared/custom-button/CustomButton';
import Icon from '../../shared/icon/Icon';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(inputs);
  };

  const handleInputChange = event => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
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

        <CustomButton
          className='waves-effect red darken-4'
          type='submit'
          name='login'>
          Login <Icon icon='send' color='#fff' />
        </CustomButton>
      </form>
    </div>
  );
};

export default LoginForm;
