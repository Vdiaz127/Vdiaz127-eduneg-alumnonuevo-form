import { connectDB } from "@/lib/mongoose";
import Student from "@/models/Student";
import { NextResponse } from "next/server";


export async function GET() {
    await connectDB();   

    const students = await Student.find();
    return NextResponse.json(students);
}

export async function POST(request) {
    await connectDB();
    
    // Parsear los datos del cuerpo de la solicitud
    const data = await request.json();

    try {
        // Crear el estudiante en la base de datos
        const student = await Student.create(data);

        return NextResponse.json({

            message: "Estudiante creado con éxito",
            student,
        });
    } catch (error) {
        console.error("Error al guardar el estudiante:", error);
        return NextResponse.json(
            { message: "Error al guardar el estudiante", error },
            { status: 500 }
        );
    }
}
