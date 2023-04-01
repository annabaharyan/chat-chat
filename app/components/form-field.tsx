import { useState, useEffect } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  placeholder: string;
  onChange?: (...args: any) => any;
  error?: string;
}

export default function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  placeholder,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errTxt, setErrTxt] = useState(error);
  useEffect(() => {
    setErrTxt(error);
  }, [error]);
  return (
    <div className="w-full  ">
      <label
        htmlFor={htmlFor}
        className="text-1xl font-bold text-sky-700 lowercase"
      >
        {label}
      </label>
      <input
        type={type}
        name={htmlFor}
        id={htmlFor}
        className="w-full p-2 rounded-xl my-2 outline-sky-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          setErrTxt("");
        }}
      />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errTxt || ""}
      </div>
    </div>
  );
}
