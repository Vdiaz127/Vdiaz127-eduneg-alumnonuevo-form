"use client";

import { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";
import Location from "./Location";
import {ValidacionesNombreApellido} from "./validaciones";

const sedes = [
  { label: "Puerto Ordaz", value: "Puerto Ordaz" },
  { label: "Santa Elena", value: "Santa Elena" },
  { label: "El Callao", value: "El Callao" },
  { label: "Guasipati", value: "Guasipati" },
];

const carreras = [
  { label: "Informática", value: "Informática" },
  { label: "Administración", value: "Administración" },
  { label: "Gerencia", value: "Gerencia" },
  { label: "Contabilidad", value: "Contabilidad" },
];

const sexos = [
  { label: "Hombre", value: "Hombre" },
  { label: "Mujer", value: "Mujer" },
];

const EstadoCivil = [
  { label: "Soltero /a", value: "Soltero /a" },
  { label: "Casado /a", value: "Casado /a" },
  { label: "Divorciado /a", value: "Divorciado /a" },
  { label: "Viudo /a", value: "Viudo /a" },
];

function SectionForm({ title, children }) {
  return (
    <div className="p-4 m-4 border-2 rounded-lg bg-gray-50">
      <h1 className="text-xl mb-4 font-bold text-gray-800">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}


const handleValidate = (fieldName, isValid) => {
  console.log(`Validación para ${fieldName}: ${isValid}`);
};


export default function NewStudentForm() {

  const [inputsStatus, setInputsStatus] = useState({});

  const handleInputChange = (name, status, value) => {
    setInputsStatus((prev) => ({
      ...prev,
      [name]: { status, value },
    }));

    //const validos = verificarInputsValidos(inputsStatus);
    console.log("Campos con estado 'valid':",inputsStatus);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // 'e.target' es el formulario
    const formValues = Object.fromEntries(formData.entries()); // Convierte el FormData a un objeto
  
    console.log("Datos del formulario:", formValues);
    return formValues;
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl mb-6 font-bold text-center">Agregar Nuevo Alumno</h1>

      <SectionForm title="Datos Académicos">
        <SelectInput
          labelFor="Sede"
          options={sedes}
        />
        <SelectInput
          labelFor="Carrera"
          options={carreras}
        />
      </SectionForm>

      <SectionForm title="Datos Personales">
        <Input
          labelFor="Nombre"
          type="text"
          validate={ValidacionesNombreApellido}
          placeholderText="Ingresa tu nombre"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Correo"
          type="email"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Apellidos"
          type="text"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Telefono"
          type="tel"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Cedula"
          type="tel"
          handleChangeInput={handleInputChange}
        />
      </SectionForm>

      <SectionForm title="Datos de Nacimiento">
        <Input
          labelFor="Fecha De Nacimiento"
          type="date"
          handleChangeInput={handleInputChange}
          
        />

        <Location />

        <SelectInput
          labelFor="Estado Civil"
          options={EstadoCivil}
          
        />
        <SelectInput
          labelFor="Sexo"
          options={sexos}
          
        />
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
