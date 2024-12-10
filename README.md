#Formulario para el registro de alumos - Nextjs

´<p>
	Para la realizacion del formulario primero analice las partes del formulario realizado en figma que se podian componetizar en formas apartes,  cuales de estos componentes ocupan una "jerarquia" mayor a la otra , y cuales componentes tenian una misma jerarquia , es decir , compartir el mismo padre. 
	Separando en :
	- Sidenav (que debia replicarse en todas las vistas, para la facil navegacion y "visualizacion" de perfil)
	- Fomulario (hacerlo un componente aparte de cualquier otro elemento, para que si se tiene que agregar informacion extra a una pagina no se vea muy cargada esta pagina)
	- Inputs (tipo select y inputs donde se tenga que escribir/digitar)
*No deje que la estetica (espaciados , colores, etc ) estuviera sujeta a props en los componentes de x tipo para que todos compartieran el mismo sistema , en caso de querer ajustar algo mejor seria desde el mismo componente para que se replicara en todos los componentes iguales y se viera uniforme el formulario en ese aspecto.*
</p>

##Para el Sidenav:
<p>
Se realizo como componente aparte, pero su composicion tambien se dividio en otros componentes , a mi parecer para mas facil manejo de caracteristicas individuales:

**MenuItems.jsx **   que maneja componentes como:
- Profile (Props: nombre de la persona y Url de la imagen de la persona)
- PanelItem: son los elementos que componen la navegacion de navbar (Props: Nombre del panel (nombre de la pagina), Icono para representacion visual del panel, Direccion para la redireccio , funcion para cerrar el nav una vez clickeado un item (vista telefono))
- Por ultimo se exporta **MenuItems:** que retorna la aglomeracion de el **Profile** y los items de que se definan 

En **Sidenav.jsx**: utilizo el componente que retorna **MenuItems**, pero ademas defino la estetica que rodea a los elementos, y su comportamiento responsive y el uso de Hook de useState para abrir y cerrar el nav en vistas pequeñas.

``
const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => setIsOpen(!isOpen);
``

Que lo que hace basicamente es alternar un valor de "isOpen" (booleano) y de alli determinar si abrir o cerrar el nav , mediante los estilos de Tailwind

</p>

##Para el formulario 
<p> El componente **SectionForm** organiza las secciones del formulario,  Recibe un título y los elementos hijos como props. </p>

###Función handleInputChange
<p> Cada campo del formulario tiene un estado independiente que indica si su contenido es válido o no. La función `handleInputChange` gestiona estos estados y actualiza el componente principal en tiempo real. </p>

###Sometimiento del Formulario
<p> Al enviar el formulario, se verifica que todos los campos estén en estado "válido" ("valid"). Si hay errores, se alerta al usuario sobre los campos que necesitan ser corregidos. En caso de éxito, se envían los datos al servidor a través de una petición `POST`. </p>

###Validaciones
<p> Se implementaron validaciones personalizadas para cada campo utilizando funciones específicas que verifican el formato de los datos (nombre, correo, teléfono, etc.). Estas funciones están centralizadas en un archivo de utilidades (`validaciones.js`) para facilitar su mantenimiento y reutilización. </p>

##Para los inputs 
<p> Para el formulario fue necesario implementar varios tipos de inputs, cada uno diseñado como un componente aparte para garantizar flexibilidad y reutilización en diferentes contextos. Los tipos principales incluyen: **inputs de texto**, **selects** y **ubicación/location** (un input combinado de país, estado y ciudad). Todos estos inputs comparten un enfoque centrado en validación y retroalimentación visual usando Tailwind CSS para mantener una estética uniforme. </p>

###Input de Texto o escritura
<p> El componente `Input.jsx` se encarga de manejar los campos de texto (como nombre, correo, teléfono, etc.). Incluye validación personalizada a través de funciones pasadas como `props`, permitiendo mostrar mensajes de error específicos para cada caso. </p>

Características principales:

Cambia el borde según el **estado** del input (empty, valid, invalid).
Muestra mensajes de error o confirmación según la** validación**.
Controla el** estado** del input de manera local con useState.

Props:
- **labelFor**: Etiqueta del input.
- **type**: Tipo de input (ej. text, email, tel, etc.).
- **validate**: Función de validación personalizada.
- **placeholderText**: Texto de marcador de posición.
- **handleChangeInput**: Función para notificar al componente padre sobre los cambios.
</p>

###Input Select
<p> El componente **SelectInput.jsx** maneja inputs de tipo select (desplegables), usados para opciones predefinidas como sexo, estado civil, carrera, etc. Implementa una validación simple basada en la selección o ausencia de un valor. </p>

Características principales:
Cambia el borde y muestra mensajes según el estado (empty, valid, invalid).

Props:
- **labelFor**: Etiqueta del select.
- **options**: Opciones disponibles en el desplegable.
- **handleChangeInput**: Función para notificar al componente padre.
- **disabled**: Deshabilita el input según condiciones externas.
</p>

###Input de Ubicación
<p> El componente **LocationSelector.jsx** es un input especial que combina tres selectores (país, estado y ciudad), conectados a una API externa para cargar las opciones de manera dinámica. </p>

Flujo de funcionamiento:
- País: Al seleccionar un país, se cargan sus estados, (se utiliza el** hook de UseEffect** para hacer el fetch hacia la api)
- Estado: Al seleccionar un estado, se cargan sus ciudades.
- Ciudad: Permite seleccionar la ciudad dentro del estado elegido.

Características principales:
Usa fetch para obtener datos de la API Country State City.
Almacena los valores seleccionados en useState para actualizaciones dinámicas.

Props:
- **handleChangeInput:** Notifica al componente padre con los valores seleccionados.
- Validaciones integradas que garantizan la selección en cada paso.
</p>
