import React, { useState } from "react";
import { login } from "../../API/authentication";
import Form from "../Form";

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

  // handle response
  const [response, setResponse] = useState<string>("");

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

    // check if the token exists in sessionStorage
    const tokenExists = sessionStorage.getItem("x-auth-token") !== null;

    // if it does, then user is already logged in
    if (tokenExists) {
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
  return (
    <>
      <Form
        formTitle="Login Form"
        onSubmit={handleSubmit}
        onChange={handleChange}
        response={response}
        buttonName="Login"
        fields={fields}
      />
    </>
  );
};

export default Login;
