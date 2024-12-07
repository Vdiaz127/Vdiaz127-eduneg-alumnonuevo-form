"use client";

import { useState } from "react";

export default function SelectInput({
  labelFor,
  options = [],
  handleChangeInput = () => {},
  disabled = false,
}) {
  const [status, setStatus] = useState("empty"); // empty, valid, invalid
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // Determinar estado (empty si no hay selección, valid si hay valor)
    const validationResult = value
      ? { status: "valid", errorMessage: "" }
      : { status: "invalid", errorMessage: `Debe seleccionar una opción para ${labelFor}.` };

    setStatus(validationResult.status);
    setMensajeError(validationResult.errorMessage);

    // Notificar al padre del cambio
    if (handleChange) {
      handleChangeInput(labelFor, validationResult.status, value);
    }
  };

  const getBorderClass = () => {
    if (status === "valid") return "border-green-500 ";
    if (status === "invalid") return "border-red-500";
    return "border-gray-400";
  };

  const mensajeSelect = () => {
    if (status === "empty") return null;
    if (status === "invalid") {
      return (
        <span className="text-red-500 text-sm mt-1">
          {mensajeError}
        </span>
      );
    }
    return (
      <span className="text-green-600 text-sm mt-1">
        
      </span>
    );
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor} className="mb-1 font-medium text-gray-700">
        {labelFor}
      </label>
      <select
        name={labelFor}
        onChange={handleChange}
        disabled={disabled}
        defaultValue=""
        required
        className={`border p-2 rounded-lg focus:outline-none ${getBorderClass()} ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
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
      {mensajeSelect()}
    </div>
  );
}
