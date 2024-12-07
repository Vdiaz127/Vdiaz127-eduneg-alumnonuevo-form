"use client";

import { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";
import LocationSelector from "./Location";
import { 
  validarTelefono, 
  validarNombreApellido, 
  validarCorreo, 
  validarFechaNacimiento, 
  validarCedula 
} from "./validaciones";

import { useRouter } from 'next/navigation'


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





export default function NewStudentForm() {

  const [inputsStatus, setInputsStatus] = useState({});
  const router = useRouter();

  const handleInputChange = (name, status, value) => {
    setInputsStatus((prev) => ({
      ...prev,
      [name]: { status, value },
    }));

    //console.log("Campos con estado 'valid':",inputsStatus);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar que todos los campos estén en estado "valid"
    const camposInvalidos = Object.entries(inputsStatus).filter(
      ([_, { status }]) => status !== "valid"
    );
  
    if (camposInvalidos.length > 0) {
      alert(`Existen campos incompletos o inválidos: ${camposInvalidos.map(([name]) => name).join(", ")}`);
      return;
    }
  
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),

      });
  
      if (response.ok) {
        alert("Estudiante creado con éxito");
        
        
        router.push("/api/students"); 
      } 
      
  
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };
  
  
  
  

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl mb-6 font-bold text-center">Agregar Nuevo Alumno</h1>

      <SectionForm title="Datos Académicos">
        <SelectInput
          labelFor="Sede"
          options={sedes}
          handleChangeInput={handleInputChange}
        />
        <SelectInput
          labelFor="Carrera"
          options={carreras}
          handleChangeInput={handleInputChange}
        />
      </SectionForm>

      <SectionForm title="Datos Personales">
        <Input
          labelFor="Nombre"
          type="text"
          validate={validarNombreApellido}
          placeholderText="Ingresa tu nombre"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Apellidos"
          type="text"
          validate={validarNombreApellido}
          placeholderText="Ingresa tu Apellido"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Correo"
          type="email"
          placeholderText="persona@gmail.com"
          validate={validarCorreo}
          handleChangeInput={handleInputChange}
        />
        
        <Input
          labelFor="Telefono"
          type="tel"
          validate={validarTelefono}
          placeholderText="Ej. 041233311144"
          handleChangeInput={handleInputChange}
        />
        <Input
          labelFor="Cedula"
          type="tel"
          validate={validarCedula}
          placeholderText="Ej. 10011011"
          handleChangeInput={handleInputChange}
        />
      </SectionForm>

      <SectionForm title="Datos de Nacimiento">
        <Input
          labelFor="Fecha De Nacimiento"
          type="date"
          validate={validarFechaNacimiento}
          handleChangeInput={handleInputChange}
        />

        <LocationSelector handleChangeInput={handleInputChange} />


        <SelectInput
          labelFor="Estado Civil"
          options={EstadoCivil}
          handleChangeInput={handleInputChange}
        />
        <SelectInput
          labelFor="Sexo"
          options={sexos}
          handleChangeInput={handleInputChange}
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
