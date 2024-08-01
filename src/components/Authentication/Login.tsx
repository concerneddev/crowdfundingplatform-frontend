import React, { useEffect, useState,  } from "react";
import { login } from "../../API/authentication";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  // handle form values
  const [formData, setFormData] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false); 
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, // copy existing properties into this new object
      [e.target.name]: e.target.value, // dynamically creates property-value pair
    });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevent default submit behavious, i.e it reloads the page
    e.preventDefault();

    // if it does, then user is already logged in
    if (loggedIn) {
      setResponse("User is already logged in!");
      return;
    }

    try {
      const res = await login(formData.username, formData.password);
      console.log("res: ", res);
      if (res == 201) {
        setResponse("User logged in successfully!");
      }
    } catch (error: any) {
      console.log("error: ", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setResponse(error.response.data.message);
      } else if (error.status == 401) {
        setResponse("Invalid credentials");
      } else {
        setResponse("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
  
    const tokenExists = sessionStorage.getItem("x-auth-token");
  
    if (tokenExists) {
      setLoggedIn(true);
      setResponse("User is already logged in!");
  
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false); 
        navigate('/myprofile'); 
      }, 3000); 
    } else {
      setLoggedIn(false);
      setResponse("Please log in.");
    }

    setIsLoading(false);
  }, []);
  
  const fields = [
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ];

  const handleRedirect = () => {
    if (!loggedIn) {
      // If not logged in, show the form
      return (
        <Form
          formTitle="Login Form"
          onSubmit={handleSubmit}
          onChange={handleChange}
          response={response}
          buttonName="Login"
          fields={fields}
        />
      );
    } else {
      // If logged in, show the spinner and redirect
      return (
        <>{!isLoading &&
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto">
          {showSpinner && <Spinner />} {/* Display spinner */}
          <p>User already logged in</p>
        </div>
        }
        </>
      );
    }
  };
  return (
    <>
    <div className="flex justify-center items-center h-screen">
    {handleRedirect()}
    </div>
    </>
  );
};

export default Login;
