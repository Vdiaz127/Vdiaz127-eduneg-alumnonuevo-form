"use client"
import { useState } from "react";
import { useEffect } from "react";

const sedes = ["Puerto Ordaz", "Santa Elena", "El Callao", "Guasipati"];
const carreras = ["Informática", "Administración", "Gerencia", "Contabilidad"];
const sexos = ["Hombre", "Mujer"];
const EstadoCivil = ["Soltero /a", "Casado /a", "Divorciado /a", "Viudo /a"];

function SectionForm({ title, children }) {
  return (
    <div className="p-4 m-4 border-2">
      <h1 className="text-xl mb-3"><b>{title}</b></h1>
      <div className="grid grid-cols-4">{children}</div>
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
    <div className="flex flex-col mb-2 mx-2">
      <label htmlFor={labelFor} className=""><b>{labelFor}</b></label>
      <input
        required
        type={type}
        pattern={type === "tel" ? "[0-9]{0,13}" : undefined}
        name={labelFor}
        value={value}
        onChange={handleChange}
        className={`border p-1 ${getBorderClass()}`}
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
    
        // Usar useEffect para llamar a handleValidate cuando el estado cambie
        useEffect(() => {
          handleValidate(labelFor, status === "valid");
        }, [status]); // Solo se ejecuta cuando status cambia
    
        return (
          <div className="flex flex-col mb-2 mx-2">
            <label htmlFor={labelFor}><b>{labelFor}</b></label>
            <select
              name={labelFor}
              value={value}
              onChange={handleChange}
              className="border p-2"
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
        console.log(validFields);
      alert("Por favor, corrija los campos marcados en rojo.");
    } else {
      alert("Formulario enviado con éxito!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <h1 className="my-6 ml-6 text-3xl">Agregar nuevo alumno</h1>

        <SectionForm title={"Datos Académicos"}>
          <SelectInput labelFor="Sede" options={sedes} handleValidate={handleValidate} />
          <SelectInput labelFor="Carrera" options={carreras} handleValidate={handleValidate} />
        </SectionForm>

        <SectionForm title={"Datos Personales"}>
          <Input labelFor="Nombres" type="text" handleValidate={handleValidate} />
          <Input labelFor="Correo" type="email" handleValidate={handleValidate} />
          <Input labelFor="Apellidos" type="text" handleValidate={handleValidate} />
          <Input labelFor="Telefono" type="tel" handleValidate={handleValidate} />
          <Input labelFor="Cedula" type="tel" handleValidate={handleValidate} />
        </SectionForm>

        <SectionForm title={"Datos de Nacimiento"}>
          <Input labelFor="Fecha De Nacimiento" type="date" handleValidate={handleValidate} />
          <Input labelFor="Estado" type="text" handleValidate={handleValidate} />
          <Input labelFor="Pais" type="text" handleValidate={handleValidate} />
          <SelectInput labelFor="Sexo" options={sexos} handleValidate={handleValidate} />
          <Input labelFor="Ciudad" type="text" handleValidate={handleValidate} />
          <SelectInput labelFor="Estado Civil" options={EstadoCivil} handleValidate={handleValidate} />
        </SectionForm>
      </div>
      <button type="submit" className="flex p-3 mx-auto text-white rounded-md bg-sky-950">
        Agregar Estudiante
      </button>
    </form>
  );
}
