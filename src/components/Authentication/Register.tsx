import React, { useState, useEffect, useContext } from "react";
import { register } from "../../API/authentication";
import Form from "../Form";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import { useNavigate, Link } from "react-router-dom";
import LogoIcon from "../LogoIcon";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContext);

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

  useEffect(() => {
    setIsLoading(true);
    const tokenExists = sessionStorage.getItem("x-auth-token");

    if (tokenExists && !isLoggedIn) {
      setResponse("User is already logged in!");
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/myprofile");
      }, 2000);
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
        <div>
          <Form
            formTitle="Your account details"
            onSubmit={handleSubmit}
            onChange={handleChange}
            response={response}
            buttonName="Register"
            fields={fields}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto">
          <p>User already logged in</p>
        </div>
      )
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="flex flex-col items-center bg-headerBg px-[180px]">
        <div className="flex flex-col items-center py-[50px]">
          <div className=" py-[80px]">
            <Link to="/">
              <LogoIcon />
            </Link>
          </div>

          <div>
            <div className="flex flex-col items-center">
              <h3>Welcome</h3>
            </div>
            <div className="max-w-sm mx-auto text-center">
              <h2 className="text-5xl font-semibold text-primary mb-6">
                Register
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex flex-col items-center gap-[60px] bg-white px-40">
        <div className="pt-[80px]">
          <h3>Already have an account? <Link to="/login" className="underline">Login</Link> </h3>
        </div>
        <div>
          {handleRedirect()}
          </div>
      </div>
    </div>
  );
};

export default Register;
