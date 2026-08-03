'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property, getPropertySlug } from '../app/data/mockProperties';
import { Bed, Bath, Ruler, Heart, HeartFilled, Pin } from './Icons';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const propertySlug = getPropertySlug(property);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-frosted-pearl transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] w-full">
        <Link href={`/propiedades/${propertySlug}`} className="block h-full w-full">
          <Image
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={property.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />
        </Link>

        {featured && (
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none z-10" />
        )}

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {property.isExclusive && (
            <span className="rounded-full bg-midnight-onyx/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cloud-white backdrop-blur-sm">
              Exclusivo
            </span>
          )}
          {property.isNew && (
            <span className="rounded-full bg-sage-whisper/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-midnight-onyx backdrop-blur-sm">
              Nuevo
            </span>
          )}
          <span className="rounded-full bg-desert-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight-onyx shadow-sm">
            {property.purpose === 'sale' ? 'Venta' : 'Renta'}
          </span>
        </div>

        {/* Favorite Toggle Button */}
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-cloud-white/90 text-midnight-onyx backdrop-blur-sm transition-all hover:bg-desert-gold hover:text-midnight-onyx z-20"
          aria-label="Agregar a favoritos">
          {isFavorite ? (
            <HeartFilled size={20} className="text-red-500 scale-110 transition-transform" />
          ) : (
            <Heart size={20} className="transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Property Details */}
      <Link href={`/propiedades/${propertySlug}`} className="p-6 flex flex-col flex-grow justify-between group/link">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-medium text-midnight-onyx transition-colors group-hover/link:text-desert-gold">
                {property.title}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-midnight-onyx/60">
                <Pin size={16} className="text-sage-whisper" />
                {property.location}
              </p>
            </div>
            {featured && (
              <span className="text-xl font-semibold text-desert-gold whitespace-nowrap ml-4">
                {formattedPrice}
                {property.purpose === 'rent' && (
                  <span className="text-xs font-normal text-midnight-onyx/60">
                    /mes
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Price & Specs */}
        <div className="mt-6 pt-6 border-t border-midnight-onyx/5">
          {!featured && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-semibold text-desert-gold">
                {formattedPrice}
                {property.purpose === 'rent' && (
                  <span className="text-sm font-normal text-midnight-onyx/60">
                    /mes
                  </span>
                )}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-sm text-midnight-onyx/70">
              <Bed size={18} className="text-sage-whisper" />
              <span>
                {property.beds} {property.beds === 1 ? 'Hab' : 'Habs'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-midnight-onyx/70">
              <Bath size={18} className="text-sage-whisper" />
              <span>
                {property.baths} {property.baths === 1 ? 'Baño' : 'Baños'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-midnight-onyx/70">
              <Ruler size={18} className="text-sage-whisper" />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};
