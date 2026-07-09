'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { PropertyCard } from '../components/PropertyCard';
import { mockProperties } from './data/mockProperties';
import { Search, Tune, ArrowRight } from '../components/Icons';

type PropertyType = 'all' | 'house' | 'apartment' | 'villa' | 'penthouse';
type TransactionType = 'all' | 'sale' | 'rent';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>('all');
  const [visibleCount, setVisibleCount] = useState(4);

  // Focus utility for the search input
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter properties based on type, transaction purpose, and search text
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesType = selectedType === 'all' || property.type === selectedType;
      const matchesTransaction =
        selectedTransaction === 'all' || property.purpose === selectedTransaction;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query);

      return matchesType && matchesTransaction && matchesSearch;
    });
  }, [searchQuery, selectedType, selectedTransaction]);

  // Split into exclusive (featured) and standard properties
  const featuredProperties = useMemo(() => {
    return filteredProperties.filter(p => p.isExclusive).slice(0, 2);
  }, [filteredProperties]);

  const standardProperties = useMemo(() => {
    // Exclude featured ones from the secondary grid so they aren't repeated
    const featuredIds = new Set(featuredProperties.map(p => p.id));
    return filteredProperties.filter(p => !featuredIds.has(p.id));
  }, [filteredProperties, featuredProperties]);

  const displayedStandardProperties = useMemo(() => {
    return standardProperties.slice(0, visibleCount);
  }, [standardProperties, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cloud-white text-midnight-onyx dark:bg-midnight-onyx dark:text-cloud-white transition-colors duration-300">
      <Navbar onSearchClick={handleFocusSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full flex-grow">
        {/* HERO SECTION */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              Encuentra tu{' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium">santuario</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-sage-whisper/30 -rotate-1 z-0"></span>
              </span>
              .
            </h1>

            {/* Search Bar Input */}
            <div className="relative group max-w-2xl mx-auto shadow-sm transition-all focus-within:shadow-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-midnight-onyx/50 dark:text-cloud-white/50">
                <Search
                  size={22}
                  className="group-focus-within:text-desert-gold transition-colors"
                />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Busca por ciudad, barrio o tipo de propiedad..."
                className="block w-full pl-12 pr-28 py-4 rounded-xl border border-midnight-onyx/10 bg-frosted-pearl/50 text-midnight-onyx shadow-inner placeholder-midnight-onyx/40 focus:outline-none focus:ring-2 focus:ring-desert-gold focus:bg-cloud-white dark:bg-white/5 dark:text-cloud-white dark:border-cloud-white/10 dark:placeholder-cloud-white/40 dark:focus:bg-midnight-onyx/50 text-lg transition-all"
              />
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute inset-y-2 right-2 px-5 bg-desert-gold hover:bg-desert-gold/90 text-midnight-onyx font-medium rounded-lg transition-all flex items-center justify-center shadow-sm cursor-pointer ${
                  searchQuery ? 'opacity-100' : 'opacity-80'
                }`}>
                Buscar
              </button>
            </div>

            {/* Category horizontal filters */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
              <button
                onClick={() => setSelectedType('all')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-midnight-onyx text-cloud-white shadow-md dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/70 hover:text-midnight-onyx hover:border-desert-gold dark:bg-white/5 dark:border-cloud-white/5 dark:text-cloud-white/70 dark:hover:text-cloud-white'
                }`}>
                Todos
              </button>
              <button
                onClick={() => setSelectedType('house')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === 'house'
                    ? 'bg-midnight-onyx text-cloud-white shadow-md dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/70 hover:text-midnight-onyx hover:border-desert-gold dark:bg-white/5 dark:border-cloud-white/5 dark:text-cloud-white/70 dark:hover:text-cloud-white'
                }`}>
                Casas
              </button>
              <button
                onClick={() => setSelectedType('apartment')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === 'apartment'
                    ? 'bg-midnight-onyx text-cloud-white shadow-md dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/70 hover:text-midnight-onyx hover:border-desert-gold dark:bg-white/5 dark:border-cloud-white/5 dark:text-cloud-white/70 dark:hover:text-cloud-white'
                }`}>
                Apartamentos
              </button>
              <button
                onClick={() => setSelectedType('villa')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === 'villa'
                    ? 'bg-midnight-onyx text-cloud-white shadow-md dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/70 hover:text-midnight-onyx hover:border-desert-gold dark:bg-white/5 dark:border-cloud-white/5 dark:text-cloud-white/70 dark:hover:text-cloud-white'
                }`}>
                Villas
              </button>
              <button
                onClick={() => setSelectedType('penthouse')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedType === 'penthouse'
                    ? 'bg-midnight-onyx text-cloud-white shadow-md dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/70 hover:text-midnight-onyx hover:border-desert-gold dark:bg-white/5 dark:border-cloud-white/5 dark:text-cloud-white/70 dark:hover:text-cloud-white'
                }`}>
                Penthouses
              </button>

              <div className="w-px h-6 bg-midnight-onyx/10 dark:bg-cloud-white/10 mx-2"></div>

              {/* Reset filter button */}
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedTransaction('all');
                  setSearchQuery('');
                }}
                className="whitespace-nowrap flex items-center gap-1 px-4 py-2.5 rounded-full text-midnight-onyx/70 hover:text-desert-gold dark:text-cloud-white/70 dark:hover:text-desert-gold font-medium text-sm transition-colors">
                <Tune size={16} /> Limpiar
              </button>
            </div>
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        {featuredProperties.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light tracking-tight text-midnight-onyx dark:text-cloud-white">
                  Colecciones Exclusivas
                </h2>
                <p className="text-midnight-onyx/60 dark:text-cloud-white/60 mt-1 text-sm">
                  Propiedades seleccionadas para el ojo exigente.
                </p>
              </div>
              <a
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-desert-gold hover:opacity-75 transition-opacity"
                href="#">
                Ver todas <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* SECONDARY GRID - NEW IN MARKET */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-midnight-onyx dark:text-cloud-white">
                Nuevas Oportunidades
              </h2>
              <p className="text-midnight-onyx/60 dark:text-cloud-white/60 mt-1 text-sm">
                Propiedades recién añadidas a nuestro catálogo.
              </p>
            </div>

            {/* Buy / Rent Filter Selector */}
            <div className="flex bg-frosted-pearl dark:bg-white/5 p-1 rounded-xl self-start sm:self-auto border border-midnight-onyx/5 dark:border-cloud-white/5">
              <button
                onClick={() => setSelectedTransaction('all')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedTransaction === 'all'
                    ? 'bg-midnight-onyx text-cloud-white shadow-sm dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'text-midnight-onyx/60 dark:text-cloud-white/60 hover:text-midnight-onyx dark:hover:text-cloud-white'
                }`}>
                Todos
              </button>
              <button
                onClick={() => setSelectedTransaction('sale')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedTransaction === 'sale'
                    ? 'bg-midnight-onyx text-cloud-white shadow-sm dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'text-midnight-onyx/60 dark:text-cloud-white/60 hover:text-midnight-onyx dark:hover:text-cloud-white'
                }`}>
                Comprar
              </button>
              <button
                onClick={() => setSelectedTransaction('rent')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedTransaction === 'rent'
                    ? 'bg-midnight-onyx text-cloud-white shadow-sm dark:bg-cloud-white dark:text-midnight-onyx'
                    : 'text-midnight-onyx/60 dark:text-cloud-white/60 hover:text-midnight-onyx dark:hover:text-cloud-white'
                }`}>
                Rentar
              </button>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 bg-frosted-pearl dark:bg-white/5 rounded-2xl border border-dashed border-midnight-onyx/10 dark:border-cloud-white/10">
              <p className="text-lg text-midnight-onyx/60 dark:text-cloud-white/60">
                No encontramos propiedades que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedTransaction('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-desert-gold text-midnight-onyx rounded-lg font-medium shadow-sm transition-all hover:bg-desert-gold/90">
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedStandardProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Load More Button */}
              {standardProperties.length > visibleCount && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-frosted-pearl hover:bg-frosted-pearl/80 border border-midnight-onyx/10 text-midnight-onyx font-medium rounded-xl transition-all hover:shadow-md dark:bg-white/5 dark:border-cloud-white/10 dark:text-cloud-white dark:hover:bg-white/10">
                    Cargar más propiedades
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
