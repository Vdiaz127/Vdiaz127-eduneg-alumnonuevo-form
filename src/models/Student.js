import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Correo: { type: String, required: true },
  Telefono: { type: String },
  Cedula: { type: String },
  "Fecha De Nacimiento": { type: Date },
  Pais: { type: String },
  Estado: { type: String },
  Ciudad: { type: String },
  "Estado Civil": { type: String },
  Sexo: { type: String },
  Sede: { type: String },
  Carrera: { type: String },
  
});

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
