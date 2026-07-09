'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Apartment, Search, Notification } from './Icons';

interface NavbarProps {
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-midnight-onyx/10 bg-cloud-white/90 backdrop-blur-md dark:border-cloud-white/10 dark:bg-midnight-onyx/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand/Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-midnight-onyx text-cloud-white transition-all group-hover:bg-desert-gold dark:bg-cloud-white dark:text-midnight-onyx dark:group-hover:bg-desert-gold">
              <Apartment size={20} />
            </div>
            <span className="text-xl font-semibold tracking-tight text-midnight-onyx transition-colors group-hover:text-desert-gold dark:text-cloud-white">
              Aura Estate
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              className="border-b-2 border-desert-gold px-1 py-1 text-sm font-medium text-midnight-onyx dark:text-cloud-white"
              href="#">
              Comprar
            </a>
            <a
              className="border-b-2 border-transparent px-1 py-1 text-sm font-medium text-midnight-onyx/75 transition-all hover:border-midnight-onyx/30 hover:text-midnight-onyx dark:text-cloud-white/75 dark:hover:border-cloud-white/30 dark:hover:text-cloud-white"
              href="#">
              Rentar
            </a>
            <a
              className="border-b-2 border-transparent px-1 py-1 text-sm font-medium text-midnight-onyx/75 transition-all hover:border-midnight-onyx/30 hover:text-midnight-onyx dark:text-cloud-white/75 dark:hover:border-cloud-white/30 dark:hover:text-cloud-white"
              href="#">
              Vender
            </a>
            <a
              className="border-b-2 border-transparent px-1 py-1 text-sm font-medium text-midnight-onyx/75 transition-all hover:border-midnight-onyx/30 hover:text-midnight-onyx dark:text-cloud-white/75 dark:hover:border-cloud-white/30 dark:hover:text-cloud-white"
              href="#">
              Favoritos
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={onSearchClick}
              className="text-midnight-onyx hover:text-desert-gold transition-colors dark:text-cloud-white dark:hover:text-desert-gold"
              aria-label="Buscar">
              <Search size={22} />
            </button>

            <button
              className="relative text-midnight-onyx hover:text-desert-gold transition-colors dark:text-cloud-white dark:hover:text-desert-gold"
              aria-label="Notificaciones">
              <Notification size={22} />
              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-desert-gold border border-cloud-white dark:border-midnight-onyx"></span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-midnight-onyx/10 dark:border-cloud-white/10 ml-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-desert-gold cursor-pointer">
                <Image
                  alt="Profile"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA"
                  width={36}
                  height={36}
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-midnight-onyx hover:text-desert-gold focus:outline-none dark:text-cloud-white"
              aria-label="Menú principal">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-midnight-onyx/5 bg-cloud-white py-2 px-4 space-y-1 dark:border-cloud-white/5 dark:bg-midnight-onyx">
          <a
            className="block rounded-lg bg-desert-gold/10 px-3 py-2 text-base font-medium text-desert-gold dark:bg-desert-gold/20"
            href="#">
            Comprar
          </a>
          <a
            className="block rounded-lg px-3 py-2 text-base font-medium text-midnight-onyx hover:bg-midnight-onyx/5 dark:text-cloud-white dark:hover:bg-cloud-white/5"
            href="#">
            Rentar
          </a>
          <a
            className="block rounded-lg px-3 py-2 text-base font-medium text-midnight-onyx hover:bg-midnight-onyx/5 dark:text-cloud-white dark:hover:bg-cloud-white/5"
            href="#">
            Vender
          </a>
          <a
            className="block rounded-lg px-3 py-2 text-base font-medium text-midnight-onyx hover:bg-midnight-onyx/5 dark:text-cloud-white dark:hover:bg-cloud-white/5"
            href="#">
            Favoritos
          </a>
        </div>
      )}
    </nav>
  );
};
