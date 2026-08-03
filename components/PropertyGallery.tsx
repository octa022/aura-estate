'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  isExclusive?: boolean;
  isNew?: boolean;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  title,
  isExclusive = false,
  isNew = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryList = images && images.length > 0 ? images : ['/placeholder.jpg'];
  const activeImage = galleryList[selectedIndex] || galleryList[0];

  const handleNext = () => {
    setSelectedIndex(prev => (prev + 1) % galleryList.length);
  };

  const handlePrev = () => {
    setSelectedIndex(prev => (prev - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-frosted-pearl shadow-sm group">
        <Image
          src={activeImage}
          alt={`${title} - Foto ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {isExclusive && (
            <span className="bg-midnight-onyx/90 text-cloud-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm">
              Exclusivo
            </span>
          )}
          {isNew && (
            <span className="bg-sage-whisper text-midnight-onyx text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm">
              Nuevo
            </span>
          )}
        </div>

        {/* View All Photos Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-cloud-white/90 hover:bg-cloud-white text-midnight-onyx px-4 py-2 rounded-xl text-sm font-medium shadow-lg backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95 z-10">
          <svg className="w-5 h-5 text-desert-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Ver todas las fotos ({galleryList.length})</span>
        </button>
      </div>

      {/* Thumbnails Bar */}
      {galleryList.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
          {galleryList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-none w-36 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all relative snap-start ${
                idx === selectedIndex
                  ? 'ring-2 ring-desert-gold ring-offset-2 ring-offset-cloud-white opacity-100 scale-[1.02]'
                  : 'opacity-60 hover:opacity-100'
              }`}>
              <Image
                src={img}
                alt={`${title} miniatura ${idx + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-midnight-onyx/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Header Bar */}
          <div className="flex justify-between items-center text-cloud-white">
            <span className="text-sm font-medium tracking-wide">
              {title} — Foto {selectedIndex + 1} de {galleryList.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Cerrar modal"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-cloud-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Image in Lightbox */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh] max-w-5xl">
              <Image
                src={galleryList[selectedIndex]}
                alt={`${title} - Foto ampliada ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Prev Arrow */}
            {galleryList.length > 1 && (
              <button
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-4 p-3 rounded-full bg-midnight-onyx/70 hover:bg-desert-gold text-cloud-white transition-all shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {galleryList.length > 1 && (
              <button
                onClick={handleNext}
                aria-label="Foto siguiente"
                className="absolute right-4 p-3 rounded-full bg-midnight-onyx/70 hover:bg-desert-gold text-cloud-white transition-all shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex gap-2 overflow-x-auto justify-center py-2">
            {galleryList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all flex-shrink-0 ${
                  idx === selectedIndex ? 'ring-2 ring-desert-gold opacity-100' : 'opacity-40 hover:opacity-80'
                }`}>
                <Image src={img} alt={`thumb-${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
