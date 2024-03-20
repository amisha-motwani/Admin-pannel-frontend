import { React, useState } from "react";
import { useFormik } from "formik";
import { formSchema } from "./Schema/index";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  name: "",
  color: "",
  price: "₹",
  description: "",
  file: "",
};
function Page1() {

  const [apiResponse, setApiRespone] = useState();
  const Token = localStorage.getItem("Token");
  console.log("token:", Token);
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      // useFormik is a hook provided by Formik, where we mainly pass two parameters: initialValues and onSubmit
      initialValues: initialValues,
      // validationSchema: formSchema,
      onSubmit: async (values) => {
        if (!Token) {
          console.log("Token not found.");
          // You might want to handle this case appropriately, e.g., redirecting to login page
          return;
          console.log("no token found")
        }
        try {
          const requestOptions = {
            method: "POST",
            headers: {
              "auth-token": Token,
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              title: values.name, // Make sure this is not empty and valid
              description: values.description, // Make sure this has at least 5 characters
              price: values.price, // Make sure this is valid
            }),
            
          };

          const Response = await fetch(
            `http://localhost:5000/api/notes/addnote`,
            requestOptions
          );

          if (Response.ok) {
            const data = await Response.json();
            console.log("data==>", data);
            setApiRespone(data);
            toast.success('Added Sucessfully');
          } else if (Response.status === 404) {
            console.log("404 console", Response);
          } else if (Response.status === 500) {
            console.log("500 console");
          }
        } catch (error) {
          console.log("this is error", error);
        }
      },
    });

  console.log("API response", apiResponse);
  console.log("console errors", errors);

  return (
    <>
      <Container
        fluid
        className="flex justify-center items-center h-[80vh] w-[100%] relative"
      >
        <ToastContainer /> 
        <form
          onSubmit={handleSubmit}
          //  className="w-[60%] my-auto bg-blue-50"
          className="w-[60%] ms-[20%] h-[fit-content] my-auto absolute inset-0 bg-gradient-to-r from-[#004467] to-blue-[#333340] opacity-50 rounded-[13px] shadow-2xl  perspective-1000 text-black "
        >
          <h1 className="md:text-[20px] py-3 px-auto border-b-2 border-blue-200 text-center">
            <b>Add data:</b>
          </h1>
          <div className="w-[100%] h-[fit-content] pt-4 text-black">
            <div className="w-[100%] flex md:text-[17px]  my-3">
              <div className="w-[40%]  flex justify-end">
                <label className="my-auto">Name of the product :</label>
              </div>
              <div className="w-[60%] justify-start ps-2">
                <input
                  type="text"
                  autoComplete="off"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="w-[80%] rounded-[10px]  py-2 px-3 h-[auto]"
                  placeholder="Enter the name product"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-700 ms-2">{errors.name}</p>
                ) : null}
              </div>
            </div>
            <div className="w-[100%] flex md:text-[17px] my-3">
              <div className="w-[40%] flex justify-end">
                <label className="my-auto">Description :</label>
              </div>
              <div className="w-[60%] justify-start ps-2">
                <input
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="w-[80%] rounded-[10px] border py-2 px-3"
                  placeholder="Enter the name product"
                />
                {errors.description && touched.description ? (
                  <p className="text-red-700 ms-2">{errors.description}</p>
                ) : null}
              </div>
            </div>
       
            <div className="w-[100%] flex md:text-[17px] my-3">
              <div className="w-[40%] flex justify-end pe-2">
                <label className="my-auto">Price :</label>
              </div>
              <div className="w-[60%] justify-start ps-2">
                <input
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  className="w-[80%] rounded-[10px] border py-2 px-3"
                  placeholder="Enter the name product"
                />
                {errors.price && touched.price ? (
                  <p className="text-red-700 ms-2">{errors.price}</p>
                ) : null}
              </div>
            </div>
            <div className="w-[100%] flex justify-center my-4">
              <button
                type="submit"
                className="border rounded-full px-3 py-1 text-white text-[18px] bg-[#004467] "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Page1;
