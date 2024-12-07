// function Square({ value }) {
//     return <button className="square">{value}</button>;
//   }

import './MenuItems.css';
import HouseIcon from '@mui/icons-material/House';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


    function Profile({nombre, imgUrl}){
        return (
            <div className='flex flex-col items-center mb-11'>
              <img className='imgRedonda' src={imgUrl}></img>
              <h3 className='mt-2 text-center text-white '><b>{nombre}</b></h3>
            </div>
        )
    }

    function PanelItem({PanelName, Icon}){
      return (
          <div className='flex justify-start mb-8 menuitem max-w-fit' >
            <Icon className="icon-class text-white mr-3" />
            <h2 className="text-center text-white">{PanelName}</h2>
          </div>
      )
  }

  export default function MenuItems() {
    return (
      <div className="flex flex-col items-center containerMenu p-4 space-y-4">
        <Profile nombre="Pedro Sanchez" imgUrl="https://picsum.photos/200" />
        <PanelItem PanelName="DashBoard" Icon={HouseIcon} />
        <PanelItem PanelName="Estudiantes" Icon={SchoolIcon} />
        <PanelItem PanelName="Profesores" Icon={PeopleAltIcon} />
        <PanelItem PanelName="Asignaturas" Icon={LibraryBooksIcon} />
      </div>
    );
  }

  
