import React from 'react';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/register/RegisterForm';

const AuthPage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s6'>
          <h3>Login</h3>
          <hr />
          <LoginForm />
        </div>
        <div className='col s6'>
          <h3>Register</h3>
          <hr />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
