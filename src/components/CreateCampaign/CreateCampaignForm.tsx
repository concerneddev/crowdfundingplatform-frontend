import React, { ChangeEvent, FormEvent, useState } from "react";

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
  tags?: string[]; // Property for tag options
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
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files && files.length > 0) {
        setInputValues((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Call onChange for handling tag changes if necessary
    onChange(e);
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedTags = new Set(selectedTags);
    
    if (checked) {
      updatedTags.add(value);
    } else {
      updatedTags.delete(value);
    }
    
    setSelectedTags(updatedTags);
    // Call onChange with the updated tag values as a comma-separated string
    onChange({ 
      target: { 
        name: 'tags', 
        value: Array.from(updatedTags).join(', ') 
      } 
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text mb-5">{formTitle}</h2>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        {fields.map((field, index) => (
          <div key={index} className="relative mb-6">
            {field.isFileInput ? (
              <input
                type="file"
                id={field.name}
                name={field.name}
                onChange={handleInputChange}
                className="block w-full py-2 px-3 border border-gray-400 text-gray-800 leading-tight focus:outline-none focus:ring-1"
                required={field.required}
              />
            ) : field.tags ? (
              <div>
                <label className="block mb-2 text-gray-700">{field.label}</label>
                <div className="overflow-y-auto max-h-40 border border-gray-300 rounded p-2">
                  {field.tags.map((tag, idx) => (
                    <div key={idx} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={tag}
                        value={tag}
                        checked={selectedTags.has(tag)}
                        onChange={handleTagChange}
                        className="mr-2"
                      />
                      <label htmlFor={tag} className="text-gray-700">
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor={field.name} className="block mb-2 text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={inputValues[field.name] || ""}
                  onChange={handleInputChange}
                  className="block w-full py-2 px-3 border border-gray-400 text-black leading-tight focus:outline-none focus:ring-1"
                  placeholder={field.placeholder || ""}
                  required={field.required}
                />
              </div>
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
