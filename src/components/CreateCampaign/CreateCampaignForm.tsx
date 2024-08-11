import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormProps {
  formTitle: string;
  buttonName: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  response: string;
  fields: FieldConfig[];
}

interface FieldConfig {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  isFileInput?: boolean;
}

const CreateCampaignForm: React.FC<FormProps> = ({
  formTitle,
  onSubmit,
  onChange,
  response,
  buttonName,
  fields,
}) => {
  const [inputValues, setInputValues] = useState<Record<string, any>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? (files ? files[0] : null) : value,
    }));
    onChange(e);
  };

  return (
    <div className="flex flex-col ">
      <h2 className="text mb-5">{formTitle}</h2>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        {fields.map((field, index) => (
          <div key={index} className="relative mb-6">
            {field.isFileInput ? (
              <input
                type="file"
                id={field.name}
                name={field.name}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-400 text-gray-800 leading-tight focus:outline-none focus:ring-1"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={inputValues[field.name] || ""}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-400 text-black leading-tight focus:outline-none focus:ring-1"
                placeholder={field.placeholder || ""}
                required={field.required}
              />
            )}
          </div>
        ))}
        {response && <div className="text-red-500 mb-4">{response}</div>}
        <button
          type="submit"
          className="bg-buttonBg text-white border border-transparent px-3 py-2 text-sm cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 active:bg-blue-700"
        >
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaignForm;
