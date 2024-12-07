'use client';

import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MenuItems from './MenuItems';

export default function Sidenav({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`relative ${className}`}>
      {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md opacity-60"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 h-screen w-60 bg-blue-700 text-white transform transition-transform duration-300 ease-in-out z-40 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0`}
      >
        <MenuItems />
      </nav>

      {/* Capa de fondo oscurecida para pantallas pequeñas */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}
