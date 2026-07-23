import React from 'react';
import { Navbar } from '../components/Navbar';
import { PropertyCard } from '../components/PropertyCard';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { Pagination } from '../components/Pagination';
import { fetchProperties, fetchFeaturedProperties } from './lib/supabase';
import { ArrowRight } from '../components/Icons';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';
  const type = typeof resolvedParams.type === 'string' ? resolvedParams.type : 'all';
  const purpose = typeof resolvedParams.purpose === 'string' ? resolvedParams.purpose : 'all';

  const limit = 8; // Number of standard properties per page

  // Fetch standard properties and featured properties in parallel
  const [featuredProperties, standardResult] = await Promise.all([
    fetchFeaturedProperties(),
    fetchProperties({ page, limit, type, purpose, search }),
  ]);

  const { properties: standardProperties, totalCount } = standardResult;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="flex flex-col min-h-screen bg-cloud-white text-midnight-onyx transition-colors duration-300">
      <Navbar />

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

            {/* Client Component containing search bar and filters */}
            <SearchAndFilters
              initialSearch={search}
              initialType={type}
              initialPurpose={purpose}
            />
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        {featuredProperties.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light tracking-tight text-midnight-onyx">
                  Colecciones Exclusivas
                </h2>
                <p className="text-midnight-onyx/60 mt-1 text-sm">
                  Propiedades seleccionadas para el ojo exigente.
                </p>
              </div>
              <a
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-desert-gold hover:opacity-75 transition-opacity"
                href="#"
              >
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
          {standardProperties.length === 0 ? (
            <div className="text-center py-16 bg-frosted-pearl rounded-2xl border border-dashed border-midnight-onyx/10">
              <p className="text-lg text-midnight-onyx/60">
                No encontramos propiedades que coincidan con tu búsqueda.
              </p>
              <a
                href="/"
                className="mt-4 inline-block px-6 py-2 bg-desert-gold text-midnight-onyx rounded-lg font-medium shadow-sm transition-all hover:bg-desert-gold/90"
              >
                Limpiar Filtros
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {standardProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Server-side Pagination Component */}
              <Pagination currentPage={page} totalPages={totalPages} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
