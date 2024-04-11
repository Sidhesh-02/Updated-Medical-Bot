/* eslint-disable react/prop-types */
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";


export function Login({setToken}) {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;
  const handleOnChange = (name, value) => {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [name]: value,
      }));
    };
  
  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => {toast.success(msg)};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(inputValue);
      const { access_token, msg } = data;
      if (access_token) {
        localStorage.setItem('token', access_token);
        navigate("/interface");
        setToken(access_token);
        handleSuccess(msg);
      } else {
        handleError(msg);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
      <div>
          <div className="flex justify-center h-screen items-center">
              <Card onSubmit={handleSubmit} className="bg-white border border-gray-700 p-10" color="transparent" shadow={false}>
                  <Typography variant="h4" color="blue-gray">
                      Log In
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                      Welcome! Enter your details to Log In.
                  </Typography>
                  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="mb-1 flex flex-col gap-6">
                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Your Email
                      </Typography>
                      <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      autoComplete="on"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }}
                      value={email}
                      onChange={(e) => handleOnChange('email', e.target.value)}
                      />
                      <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Password
                      </Typography>
                      <Input
                      type="password"
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      autoComplete="on"
                      labelProps={{
                          className: "before:content-none after:content-none",
                      }}
                      value={password}
                      onChange={(e) => handleOnChange('password', e.target.value)}
                      />
                  </div>
              
                  <Button className="mt-6" type="submit" fullWidth>
                      Log In
                  </Button>
                  <Typography color="gray" className="mt-4 text-center font-normal">
                      New Here?{" "}
                      <button className="text-blue-700" onClick={()=>{navigate("/register")}}>
                          Register
                      </button>
                  </Typography>
                  </form>
              </Card>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
      </div>
  );
}