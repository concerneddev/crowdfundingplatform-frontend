import React, { useContext, useEffect, useState } from "react";
import { login } from "../../API/authentication";
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormValues>({
    username: "",
    password: "",
  });

  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContext);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoggedIn) {
      setResponse("User is already logged in!");
      return;
    }

    try {
      const res = await login(formData.username, formData.password);
      if (res.status === 201) {
        setResponse("User logged in successfully!");
        setIsLoggedIn(true);
        localStorage.setItem("userId", res.data.userId);
        navigate("/myprofile");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setResponse(error.response.data.message);
      } else if (error.status === 401) {
        setResponse("Invalid credentials");
      } else {
        setResponse("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const tokenExists = sessionStorage.getItem("x-auth-token");

    if (tokenExists && !isLoggedIn) {
      setResponse("User is already logged in!");
      setIsLoggedIn(true);
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        navigate("/myprofile");
      }, 3000);
    } else {
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
    if (!isLoggedIn) {
      return (
        <div className="flex flex-col items-center w-full max-w-md">
          <Form
            formTitle="Login Form"
            onSubmit={handleSubmit}
            onChange={handleChange}
            response={response}
            buttonName="Login"
            fields={fields}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto">
          {showSpinner && <Spinner />}
          <p>User already logged in</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center bg-headerBg p-10">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-5xl font-semibold text-primary mb-6">Sign In</h2>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white px-40">
        {handleRedirect()}
      </div>
    </div>
  );
};

export default Login;
