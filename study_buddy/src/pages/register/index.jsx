import React from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import RegistrationForm from './components/RegistrationForm';

const Register = () => {
  return (
    <AuthenticationLayout>
      <RegistrationForm />
    </AuthenticationLayout>
  );
};

export default Register;