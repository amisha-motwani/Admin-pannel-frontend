import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
function Login() {
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { Formik } = formik;
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
   
      // const data = await response.json();
      if (response.status === 200) {
        const data = await response.json();  
        console.log("Data=>", data);
        console.log("Token=>", data?.authToken);
        localStorage.setItem('Token', data?.authToken);
        toast.success('Login Successful');
       setTimeout(()=> {
        navigate('/Page1');
       },800)
      } else if (response.status === 400) {
        toast.error('You are not registered');
        navigate('/Register');
      } else {
        toast.error('Login Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <container fluid>
        <div className='bg-[#e5f0fe] h-[100vh] flex justify-center'>
        <ToastContainer /> 
          <div className='bg-white mt-32 w-[40%] h-[fit-content] rounded-[15px]'>
          <div className='bg-[#004467] rounded-t-[15px]'> <h1 className=' text-white py-4 text-2xl text-center '>Welcome to login</h1></div>

            <Formik
              validationSchema={schema}


              onSubmit={(values) => { handleLogin(values) }}
              initialValues={{
                email: '',
                password: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3 justify-content-center mt-4">
                    <Form.Group as={Col} md="10" controlId="validationFormik01">
                      
                      <Form.Label>Email address:</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="justify-content-center">
                    <Form.Group as={Col} md="10" controlId="validationFormik02">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='flex justify-center text-center my-2 text-blue-800'><h1>Don't have account</h1></Row>

                  <Button type="submit" className='text-white bg-[#004467] ms-[45%] my-4'>Login</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </container>
    </>
  );
}

export default Login;

