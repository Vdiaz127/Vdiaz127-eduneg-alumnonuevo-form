import { useState } from "react";

export default function Input({ labelFor, type, validate, placeholderText, handleChangeInput }) {
  const [status, setStatus] = useState("empty"); // empty, valid, invalid
  const [mensajeError, setMensajeError] = useState ("")
   

  const handleChange = (e) => {
    const value = e.target.value;
    let validationResult = { status: "empty", errorMessage: "" };

    if (value == ""){
      setStatus("empty");
      setMensajeError("");
    }else{
      validationResult = validate(value) ;
      setStatus(validationResult.status);
      setMensajeError(validationResult.errorMessage);
    }

    
    
    
    
    if (handleChange) {
      handleChangeInput(labelFor, validationResult.status , value);
    }
    
  };

  const getBorderClass = () => {
    if (status === "valid") return "border-green-500";
    if (status === "invalid") return "border-red-500";
    return "border-gray-400";
  };

  function mensajeInput(){
    if (status === "empty") return; 
    if (status === "valid"){
      return (<p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Formato Correcto</span></p>);
    }else{
      return (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{mensajeError}</span></p>);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor} className="mb-1 font-medium text-gray-700">
        {labelFor}
      </label>
      <input
        name={labelFor}
        type={type}
        onChange={handleChange}
        className={`border p-2 rounded-lg ${getBorderClass()} focus:outline-none`}
        placeholder={placeholderText}
        required
      />
      {mensajeInput()}
      
    </div>
  );
}
