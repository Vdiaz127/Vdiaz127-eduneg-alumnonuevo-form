"use client";

import { useState, useEffect } from "react";

const sedes = ["Puerto Ordaz", "Santa Elena", "El Callao", "Guasipati"];
const carreras = ["Informática", "Administración", "Gerencia", "Contabilidad"];
const sexos = ["Hombre", "Mujer"];
const EstadoCivil = ["Soltero /a", "Casado /a", "Divorciado /a", "Viudo /a"];

function SectionForm({ title, children }) {
  return (
    <div className="p-4 m-4 border-2 rounded-lg bg-gray-50">
      <h1 className="text-xl mb-4 font-bold text-gray-800">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
    </div>
  );
}

function Input({ labelFor, type, handleValidate }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("empty"); // empty, valid, invalid

  const validate = (val) => {
    val = val.trim();

    if (val === "") {
      setValue("");
      return "empty";
    }

    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) ? "valid" : "invalid";
    }

    if (type === "tel" && labelFor === "Telefono") {
      const phoneRegex = /^\d{11}$/;
      return phoneRegex.test(val) ? "valid" : "invalid";
    }

    if (type === "tel" && labelFor === "Cedula") {
      const cedulaRegex = /^\d{8}$/;
      return cedulaRegex.test(val) ? "valid" : "invalid";
    }

    if (type === "date") {
      const selectedDate = new Date(val);
      if (selectedDate >= new Date()) {
        return "invalid";
      }
    }

    return "valid";
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    const validationStatus = validate(val);
    setStatus(validationStatus);
    handleValidate(labelFor, validationStatus === "valid");
  };

  const getBorderClass = () => {
    if (status === "empty") return "border-gray-400";
    if (status === "valid") return "border-green-500";
    if (status === "invalid") return "border-red-500";
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor} className="mb-1 font-medium text-gray-700">{labelFor}</label>
      <input
        required
        type={type}
        name={labelFor}
        value={value}
        onChange={handleChange}
        className={`border p-2 rounded-lg ${getBorderClass()} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
}

function SelectInput({ labelFor, options, handleValidate }) {
  const [status, setStatus] = useState("empty");
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);

    if (val === "") {
      setStatus("invalid");
    } else {
      setStatus("valid");
    }
  };

  useEffect(() => {
    handleValidate(labelFor, status === "valid");
  }, [status]);

  return (
    <div className="flex flex-col">
      <label htmlFor={labelFor} className="mb-1 font-medium text-gray-700">{labelFor}</label>
      <select
        name={labelFor}
        value={value}
        onChange={handleChange}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {value === "" && (
        <span className="text-red-500 text-sm mt-1">
          Debe seleccionar una opción para {labelFor}.
        </span>
      )}
    </div>
  );
}

export default function NewStudentForm() {
  const [validFields, setValidFields] = useState({
    Nombres: false,
    Correo: false,
    Apellidos: false,
    Telefono: false,
    Cedula: false,
    "Fecha De Nacimiento": false,
    Estado: false,
    Pais: false,
    Ciudad: false,
    Sexo: false,
    "Estado Civil": false,
    Sede: false,
    Carrera: false,
  });

  const handleValidate = (field, isValid) => {
    setValidFields((prev) => ({ ...prev, [field]: isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allValid = Object.values(validFields).every((status) => status);
    if (!allValid) {
      alert("Por favor, corrija los campos marcados en rojo.");
    } else {
      alert("Formulario enviado con éxito!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl mb-6 font-bold text-center">Agregar Nuevo Alumno</h1>

      <SectionForm title="Datos Académicos">
        <SelectInput labelFor="Sede" options={sedes} handleValidate={handleValidate} />
        <SelectInput labelFor="Carrera" options={carreras} handleValidate={handleValidate} />
      </SectionForm>

      <SectionForm title="Datos Personales">
        <Input labelFor="Nombres" type="text" handleValidate={handleValidate} />
        <Input labelFor="Correo" type="email" handleValidate={handleValidate} />
        <Input labelFor="Apellidos" type="text" handleValidate={handleValidate} />
        <Input labelFor="Telefono" type="tel" handleValidate={handleValidate} />
        <Input labelFor="Cedula" type="tel" handleValidate={handleValidate} />
      </SectionForm>

      <SectionForm title="Datos de Nacimiento">
        <Input labelFor="Fecha De Nacimiento" type="date" handleValidate={handleValidate} />
        <Input labelFor="Estado" type="text" handleValidate={handleValidate} />
        <Input labelFor="Pais" type="text" handleValidate={handleValidate} />
        <SelectInput labelFor="Sexo" options={sexos} handleValidate={handleValidate} />
        <Input labelFor="Ciudad" type="text" handleValidate={handleValidate} />
        <SelectInput labelFor="Estado Civil" options={EstadoCivil} handleValidate={handleValidate} />
      </SectionForm>

      <button
        type="submit"
        className="block mx-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Agregar Estudiante
      </button>
    </form>
  );
}
