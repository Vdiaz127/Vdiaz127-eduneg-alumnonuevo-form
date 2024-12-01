

function SectionForm ({title, children}){
    return (
        <div className="border">
            <h1><b>{title}</b></h1>
            {children}
        </div>
    )
}


export default function NewStudentForm() {
    return (
        <div className="flex flex-col">
            <h1 className="">Agregar nuevo alumno</h1>

            <SectionForm title={"Datos Academicos"}>
                <label htmlFor="Sede">Sede</label>
                <select name="Sede" className="border">
                    <option defaultChecked disabled>Seleccione una opcion</option>
                    <option value="">Puerto Ordaz</option>
                    <option value="">Santa Elena</option>
                    <option value="">El callao</option>
                    <option value="">Guasipati</option>
                </select>

                <label htmlFor="Carrera">Carrera</label>
                <select name="Carrera" className="border">
                    <option defaultChecked disabled>Seleccione una opcion</option>
                    <option value="">Informatica </option>
                    <option value="">Administracion</option>
                    <option value="">Gerencia</option>
                    <option value="">Contabilidad</option>
                </select>
            </SectionForm>



            <SectionForm title={"Datos Personales"}>
                <label htmlFor="Nombres">Nombres</label>
                <input type="text" name="Nombres" className="border" />

                <label htmlFor="Correo">Correo Electronico</label>
                <input type="email" name="Correo" className="border"/>

                <label htmlFor="Apellidos">Apellidos</label>
                <input type="text" name="Apellidos" className="border"/>

                <label htmlFor="Telefono">Telefono</label>
                <input type="tel" name="Telefono" className="border" />

                <label htmlFor="Cedula">Cedula</label>
                <input type="number" name="Cedula" className="border" />

            </SectionForm>


            <SectionForm title={"Datos De nacimiento"}>
                <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" name="FechaNacimiento" className="border"/>

                <label htmlFor="Estado">Estado</label>
                <input type="text" name="Estado" className="border"/>

                <label htmlFor="Pais">Pais</label>
                <input type="text" name="Pais" className="border"/>

                <label htmlFor="Sexo">Sexo</label>
                <select name="Sexo" className="border">
                    <option defaultChecked disabled>Seleccione una opcion</option>
                    <option value="">Hombre </option>
                    <option value="">Mujer</option>
                </select>

                <label htmlFor="Ciudad">Ciudad</label>
                <input type="text" name="Ciudad" className="border"/>

                <label htmlFor="EstadoCivil">EstadoCivil</label>
                <select name="EstadoCivil" className="border">
                    <option defaultChecked disabled>Seleccione una opcion</option>
                    <option value="">Soltero /a</option>
                    <option value="">Casado /a</option>
                    <option value="">Divorciado /a</option>
                    <option value="">Viudo /a</option>
                </select>
            </SectionForm>
        </div>
    )
}