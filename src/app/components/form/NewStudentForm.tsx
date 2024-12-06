
"use client"
import { ChakraComponent } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";


interface FormValues {
  firstName: string
  lastName: string
}


const Demo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data)  => console.log(data))

  return (
   
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field
          label="First name"
          invalid={!!errors.firstName}
          errorText={errors.firstName?.message}
        >
          <Input
            {...register("firstName", { required: "First name is required" })}
          />
        </Field>
        <Field
          label="Last name"
          invalid={!!errors.lastName}
          errorText={errors.lastName?.message}
        >
          <Input
            {...register("lastName", { required: "Last name is required" })}
          />
        </Field>
      </Stack>
    
  )
}


const sedes = ["Puerto Ordaz", "Santa Elena", "El Callao", "Guasipati"];
const carreras = ["Informática", "Administración", "Gerencia", "Contabilidad"];
const sexos = ["Hombre", "Mujer"];
const EstadoCivil = ["Soltero /a", "Casado /a", "Divorciado /a", "Viudo /a"];

type SectionFormProps = {
  title: string;
  children: React.ReactNode; // Para admitir cualquier tipo de contenido React
};

function SectionForm({ title, children }: SectionFormProps) {
  return (
    <div className="p-4 m-4 border-2 rounded-lg bg-gray-50">
      <h1 className="text-xl mb-4 font-bold text-gray-800">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
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

  const handleValidate = (field: string, isValid: boolean) => {
    setValidFields((prev) => ({ ...prev, [field]: isValid }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allValid = Object.values(validFields).every((status) => status);
    if (!allValid) {
      alert("Por favor, corrija los campos marcados en rojo.");
    } else {
      alert("Formulario enviado con éxito!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold text-center">Agregar Nuevo Alumno</h1>

        <SectionForm title="Datos Académicos">
          a
          {/* <SelectInput labelFor="Sede" options={sedes} handleValidate={handleValidate} />
          <SelectInput labelFor="Carrera" options={carreras} handleValidate={handleValidate} /> */}
          <Demo></Demo>
        </SectionForm>
        
        <SectionForm title="Datos Personales">
          a
          {/* <Input labelFor="Nombres" type="text" handleValidate={handleValidate} />
          <Input labelFor="Correo" type="email" handleValidate={handleValidate} />
          <Input labelFor="Apellidos" type="text" handleValidate={handleValidate} />
          <Input labelFor="Telefono" type="tel" handleValidate={handleValidate} />
          <Input labelFor="Cedula" type="tel" handleValidate={handleValidate} /> */}

         


        </SectionForm>

        <SectionForm title="Datos de Nacimiento">
          <a href="">a</a>
          {/* <Input labelFor="Fecha De Nacimiento" type="date" handleValidate={handleValidate} />
          <Input labelFor="Estado" type="text" handleValidate={handleValidate} />
          <Input labelFor="Pais" type="text" handleValidate={handleValidate} />
          { <SelectInput labelFor="Sexo" options={sexos} handleValidate={handleValidate} /> }
          <Input labelFor="Ciudad" type="text" handleValidate={handleValidate} />
          <SelectInput labelFor="Estado Civil" options={EstadoCivil} handleValidate={handleValidate} /> */}
        </SectionForm>

        

        <button
          type="submit"
          className="block mx-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Agregar Estudiante
        </button>
      </form>
    </>
    
  );
}
