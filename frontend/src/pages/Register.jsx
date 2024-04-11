import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';


export function Register() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: '',
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (name, value) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/signup`,
        { ...inputValue },
        { withCredentials: true }
      );
      
      const { msg } = data;
      console.log("Message from Server:", msg);

      if (msg === 'User created successfully') {
        handleSuccess(msg);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (msg === 'Username or Email already exists') {
        handleError(msg);
      } else {
        // Handle other cases if needed
        handleError('An unknown error occurred');
      }
    } 
    catch (error) {
      console.log(error);
      handleError('An error occurred');
    }
    setInputValue({ email: '', password: '', username: '' });
  };

  function handleSuccess(msg){ 
    toast.success(msg)
  }
  const handleError = (err) => toast.error(err);

  

  return (
    <div className="">
      <div className="flex justify-center h-screen m-8 items-center">
        <Card
          className="bg-white opacity-90 border border-gray-700 p-10"
          color="transparent"
          shadow={false}
        >
          <Typography variant="h4" color="blue-gray">
            Register
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to Register.
          </Typography>
          <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="Username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                autoComplete="on"
                value={username}
                onChange={(e) => handleOnChange('username', e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                autoComplete="on"
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
            <Button type="submit" className="mt-6" fullWidth>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <button
                className="text-blue-700"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log In
              </button>
            </Typography>
          </form>
        </Card>
        <ToastContainer 
        position='top-center' 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme='light' />
      </div>
      
    </div>
  );
}
