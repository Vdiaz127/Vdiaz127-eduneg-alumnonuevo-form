"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function VistaEstudiantes() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/students`);
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Estudiantes</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-medium text-gray-600">Cargando datos...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Nombre</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Apellidos</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Correo</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Teléfono</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Cédula</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Fecha de Nacimiento</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">País</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Estado</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Ciudad</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Estado Civil</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Sexo</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Sede</th>
                <th className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">Carrera</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Nombre}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Apellidos}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Correo}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Telefono}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Cedula}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">
                    {new Date(student["Fecha De Nacimiento"]).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Pais}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Estado}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Ciudad}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student["Estado Civil"]}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Sexo}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Sede}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs md:px-4 md:py-2">{student.Carrera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Link href="/">
          <button
            tabIndex={-1}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Volver al formulario
          </button>
        </Link>
      </div>
    </div>
  );
}
