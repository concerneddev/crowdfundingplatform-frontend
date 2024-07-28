import React, { useState } from "react";
import { register } from "../../API/authentication";
import Form from "../Form";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  username: string;
  password: string;
}

const Register = () => {
  // handle form values
  const [formData, setFormData] = useState<RegisterFormValues>({
    username: "",
    password: "",
  });
  // handle response
  const [response, setResponse] = useState<string>("");

  // setup navigate
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

    // check if the token exists in sessionStorage
    const tokenExists = sessionStorage.getItem("x-auth-token") !== null;

    // if it does, then user is already logged in
    if (tokenExists) {
      setResponse("User is already logged in!");
      return;
    }

    try {
      const res = await register(formData.username, formData.password);
      console.log("res: ", res);
      if (res.status == 201) {
        setResponse(res.data.message + " Please log in! ");

        // delay navigation by 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error: any) {
      console.log("error: ", error);
      setResponse(error.data.message);
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
        formTitle="Registration Form"
        onSubmit={handleSubmit}
        onChange={handleChange}
        response={response}
        buttonName="Register"
        fields={fields}
      />
    </>
  );
};

export default Register;
