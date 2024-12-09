"use client";
import './MenuItems.css';
import HouseIcon from '@mui/icons-material/House';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Link from "next/link";

function Profile({ nombre, imgUrl }) {
  return (
    <div className="flex flex-col items-center mb-11">
      <img className="imgRedonda" src={imgUrl} alt="profile" />
      <h3 className="mt-2 text-center text-white ">
        <b>{nombre}</b>
      </h3>
    </div>
  );
}

function PanelItem({ PanelName, Icon, href, onClick }) {
  return (
    <Link href={href}>
      <div
        onClick={onClick} // Llamar al método que cierra el menú
        className="flex justify-start mb-2 menuitem max-w-fit cursor-pointer"
      >
        <Icon className="icon-class text-white mr-3" />
        <h2 className="text-center text-white">{PanelName}</h2>
      </div>
    </Link>
  );
}

export default function MenuItems({ onItemSelected }) {
  return (
    <div className="flex flex-col items-center containerMenu p-4 space-y-4">
      <Profile nombre="Pedro Sanchez" imgUrl="https://picsum.photos/200" />
      <PanelItem PanelName="DashBoard" Icon={HouseIcon} href="/" onClick={onItemSelected} />
      <PanelItem PanelName="Estudiantes" Icon={SchoolIcon} href="/students" onClick={onItemSelected} />
      <PanelItem PanelName="Profesores" Icon={PeopleAltIcon} href="/" onClick={onItemSelected} />
      <PanelItem PanelName="Asignaturas" Icon={LibraryBooksIcon} href="/" onClick={onItemSelected} />
    </div>
  );
}
