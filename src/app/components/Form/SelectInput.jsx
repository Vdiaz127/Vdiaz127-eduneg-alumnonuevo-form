"use client";

import { useState, useEffect } from "react";

export default function SelectInput({
  labelFor,
  options = [],
  handleValidate = () => {},
  handleChangeInput = () => {},
  disabled = false,
}) {
  const [status, setStatus] = useState("empty");
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setStatus(val ? "valid" : "invalid");
    handleChangeInput(labelFor, status, e.target.value);
  };

  useEffect(() => {
    handleValidate(labelFor, status === "valid");
  }, [status]);

  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor} className="mb-1 font-medium text-gray-700">
        {labelFor}
      </label>
      <select
        name={labelFor}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`border p-2 rounded-lg focus:outline-none ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"
        }`}
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label} 
          </option>
        ))}
      </select>
      {status === "invalid" && (
        <span className="text-red-500 text-sm mt-1">
          Debe seleccionar una opción para {labelFor}.
        </span>
      )}
    </div>
  );
}
