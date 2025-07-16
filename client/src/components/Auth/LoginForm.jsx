import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../store/authSlice';

const LoginForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(loginUserThunk(values));
    navigate('/');
  };
  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
      {() => (
        <Form>
          {error && <p>{error}</p>}
          <h2>Sign in:</h2>
          <Field name="email" type="email" placeholder="email" />
          <ErrorMessage name="email" />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="email" />
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
