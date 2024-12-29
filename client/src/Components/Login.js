import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Typography, Button, TextField, Stack } from '@mui/material';

function Login() {
  const [loading, setLoading] = useState(false);

  function login(values) {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };
    axios
      .post('http://localhost:4000/users/login', payload)
      .then((response) => {
        if (response.data.user) {
          toast.success('Logged In Successfully!', {
            position: 'bottom-right',
            autoClose: 1000,
            theme: 'light',
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.location.href = '/';
        } else {
          toast.error('Oops 🙁! Email or Password is incorrect!', {
            position: 'bottom-right',
            autoClose: 1000,
            theme: 'light',
          });
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error('Oops 🙁! Error occurred.', {
          position: 'bottom-right',
          autoClose: 1000,
          theme: 'light',
        });
      });
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ p: 3 }}>
      <Typography variant="h4" color="primary">
        Log In
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Welcome Back! Please fill in your details below.
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => login(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <Stack spacing={2} sx={{ width: 300 }}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" style={{ textDecoration: 'none', color: 'blue' }}>
          Sign Up
        </Link>
      </Typography>
    </Stack>
  );
}

export default Login;
