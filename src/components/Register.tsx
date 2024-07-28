import React, { useState } from "react";
import authAPI from "../API";

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
  const [response, setResponse] = useState<string | null>(null);

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

    try {
      const res = await authAPI.register(formData.username, formData.password);
      console.log("res: ", res);
      setResponse(res.data.message);
    } catch (error: any) {
      console.log("error: ",error);
      setResponse(error.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
          </div>
          {response && <div className="text-red-500">{response}</div>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
