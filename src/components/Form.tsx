import React from "react";

interface FormProps {
  formTitle: string;
  buttonName: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  response?: string;
  fields: FieldConfig[];
}

interface FieldConfig {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

const Form: React.FC<FormProps> = ({
  formTitle,
  onSubmit,
  onChange,
  response,
  buttonName,
  fields,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-8 text-center">{formTitle}</h2>
        <form onSubmit={onSubmit} className="w-full max-w-sm">
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={field.name}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
          {response && <div className="text-red-500">{response}</div>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {buttonName}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
