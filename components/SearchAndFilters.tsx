'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Tune } from './Icons';

interface SearchAndFiltersProps {
  initialSearch: string;
  initialType: string;
}

type PropertyType = 'all' | 'house' | 'apartment' | 'villa' | 'penthouse';
type TransactionType = 'all' | 'sale' | 'rent';

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  initialSearch,
  initialType,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [prevInitialSearch, setPrevInitialSearch] = useState(initialSearch);

  if (initialSearch !== prevInitialSearch) {
    setPrevInitialSearch(initialSearch);
    setSearchQuery(initialSearch);
  }

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset pagination to page 1 when filters change
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateFilters({ search: searchQuery });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    router.push(pathname); // Clears all search params
  };

  return (
    <div className="space-y-8">
      {/* Search Bar Input */}
      <form onSubmit={handleSearchSubmit} className="relative group max-w-2xl mx-auto shadow-sm transition-all focus-within:shadow-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-midnight-onyx/55">
          <Search
            size={22}
            className="group-focus-within:text-desert-gold transition-colors"
          />
        </div>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Busca por ciudad, barrio o tipo de propiedad..."
          className="block w-full pl-12 pr-28 py-4 rounded-xl border border-midnight-onyx/10 bg-frosted-pearl/50 text-midnight-onyx shadow-inner placeholder-midnight-onyx/45 focus:outline-none focus:ring-2 focus:ring-desert-gold focus:bg-cloud-white text-lg transition-all"
        />
        <button
          type="submit"
          className="absolute inset-y-2 right-2 px-5 bg-desert-gold hover:bg-desert-gold/90 text-midnight-onyx font-medium rounded-lg transition-all flex items-center justify-center shadow-sm cursor-pointer"
        >
          Buscar
        </button>
      </form>

      {/* Category horizontal filters */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
        {(['all', 'house', 'apartment', 'villa', 'penthouse'] as PropertyType[]).map(type => (
          <button
            key={type}
            onClick={() => updateFilters({ type })}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
              initialType === type
                ? 'bg-midnight-onyx text-cloud-white shadow-md'
                : 'bg-frosted-pearl border border-midnight-onyx/5 text-midnight-onyx/70 hover:text-midnight-onyx hover:border-desert-gold'
            }`}
          >
            {type === 'all' && 'Todos'}
            {type === 'house' && 'Casas'}
            {type === 'apartment' && 'Apartamentos'}
            {type === 'villa' && 'Villas'}
            {type === 'penthouse' && 'Penthouses'}
          </button>
        ))}

        <div className="w-px h-6 bg-midnight-onyx/10 mx-2"></div>

        {/* Reset filter button */}
        <button
          onClick={handleClearFilters}
          className="whitespace-nowrap flex items-center gap-1 px-4 py-2.5 rounded-full text-midnight-onyx/70 hover:text-desert-gold font-medium text-sm transition-colors cursor-pointer"
        >
          <Tune size={16} /> Limpiar
        </button>
      </div>

    </div>
  );
};

interface NewOpportunitiesHeaderProps {
  initialPurpose: string;
}

export const NewOpportunitiesHeader: React.FC<NewOpportunitiesHeaderProps> = ({
  initialPurpose,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-light tracking-tight text-midnight-onyx">
          Nuevas Oportunidades
        </h2>
        <p className="text-midnight-onyx/60 mt-1 text-sm">
          Propiedades recién añadidas a nuestro catálogo.
        </p>
      </div>

      <div className="flex bg-frosted-pearl p-1 rounded-xl self-start sm:self-auto border border-midnight-onyx/5">
        {(['all', 'sale', 'rent'] as TransactionType[]).map(purpose => (
          <button
            key={purpose}
            onClick={() => updateFilters({ purpose })}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              initialPurpose === purpose
                ? 'bg-midnight-onyx text-cloud-white shadow-sm'
                : 'text-midnight-onyx/60 hover:text-midnight-onyx'
            }`}
          >
            {purpose === 'all' && 'Todos'}
            {purpose === 'sale' && 'Comprar'}
            {purpose === 'rent' && 'Rentar'}
          </button>
        ))}
      </div>
    </div>
  );
};
