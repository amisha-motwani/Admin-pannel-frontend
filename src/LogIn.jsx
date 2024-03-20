import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { Formik } = formik;
  const navigate = useNavigate(); 
  const handleFormSubmit = async (values) => {
        try {
          const response = await fetch(' https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              
                // "email": "john@mail.com",
                // "password": "changeme"
              
            }),
          });
          const data = await response.json();
          // Assuming the response contains some data indicating success or failure
          if (response.status === 201) {
            console.log(data, "DATA>>>>>>>")
         
            navigate('/dashboard');
          } else {
            // Handle unsuccessful login
            console.error('Login failed:', data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <>
      <container fluid>
        <div className='bg-blue-200' style={{height:"100vh", display:"flex", justifyContent:"center"}}>
          <div className='bg-white mt-32' style={{height:"400px", width:"50%"}}>
          
            <Formik
              validationSchema={schema}
             
            
 onSubmit={(values)=>{handleFormSubmit(values)}}
              initialValues={{
                email: '',
                password: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3 justify-content-center mt-16">
                <div> <h1 className='bg-blue-600 mb-8 text-2xl'>Welcome to login</h1></div>
                                   <Form.Group as={Col} md="6" controlId="validationFormik01">
                      <Form.Label>Email address</Form.Label>
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

                  <Row className="mb-3 justify-content-center">
                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                      <Form.Label>Password</Form.Label>
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

                  <Button type="submit" className='text-black mt-6 style={{border:"blue"}}'    >Login</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </container>
    </>
  );
}

export default LogIn;
