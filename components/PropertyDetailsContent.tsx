'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Property } from '../app/data/mockProperties';
import { PropertyGallery } from './PropertyGallery';
import { PropertyMap } from './PropertyMap';
import { MortgageCalculatorModal } from './MortgageCalculatorModal';
import { Bed, Bath, Ruler, Pin } from './Icons';

interface PropertyDetailsContentProps {
  property: Property;
}

export const PropertyDetailsContent: React.FC<PropertyDetailsContentProps> = ({ property }) => {
  const [isMortgageModalOpen, setIsMortgageModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const galleryImages = property.images && property.images.length > 0 ? property.images : [property.image];
  const agent = property.agent || {
    name: 'Sarah Jenkins',
    title: 'Top Rated Agent',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  };

  const features = property.features || {
    area: property.area,
    beds: property.beds,
    baths: property.baths,
    garage: 2,
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-midnight-onyx text-cloud-white px-6 py-4 rounded-2xl shadow-2xl border border-desert-gold/40 flex items-center gap-3 animate-bounce">
          <span className="text-desert-gold text-xl">✓</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Gallery & Primary Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery */}
          <PropertyGallery
            images={galleryImages}
            title={property.title}
            isExclusive={property.isExclusive}
            isNew={property.isNew}
          />

          {/* Property Features Grid */}
          <div className="bg-frosted-pearl p-6 sm:p-8 rounded-2xl border border-midnight-onyx/5 shadow-sm">
            <h2 className="text-lg font-semibold text-midnight-onyx mb-6">Características Principales</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col items-center justify-center p-4 bg-cloud-white/80 rounded-xl border border-midnight-onyx/5 shadow-2xs">
                <Ruler size={26} className="text-desert-gold mb-2" />
                <span className="text-xl font-bold text-midnight-onyx">{features.area}</span>
                <span className="text-xs uppercase tracking-wider text-midnight-onyx/50 font-medium">
                  Metros²
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cloud-white/80 rounded-xl border border-midnight-onyx/5 shadow-2xs">
                <Bed size={26} className="text-desert-gold mb-2" />
                <span className="text-xl font-bold text-midnight-onyx">{features.beds}</span>
                <span className="text-xs uppercase tracking-wider text-midnight-onyx/50 font-medium">
                  Recámaras
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cloud-white/80 rounded-xl border border-midnight-onyx/5 shadow-2xs">
                <Bath size={26} className="text-desert-gold mb-2" />
                <span className="text-xl font-bold text-midnight-onyx">{features.baths}</span>
                <span className="text-xs uppercase tracking-wider text-midnight-onyx/50 font-medium">
                  Baños
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cloud-white/80 rounded-xl border border-midnight-onyx/5 shadow-2xs">
                <svg className="w-6 h-6 text-desert-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                <span className="text-xl font-bold text-midnight-onyx">{features.garage}</span>
                <span className="text-xs uppercase tracking-wider text-midnight-onyx/50 font-medium">
                  Estacionamientos
                </span>
              </div>
            </div>
          </div>

          {/* About this home */}
          <div className="bg-frosted-pearl p-6 sm:p-8 rounded-2xl border border-midnight-onyx/5 shadow-sm">
            <h2 className="text-lg font-semibold text-midnight-onyx mb-4">Sobre esta propiedad</h2>
            <div
              className={`prose prose-slate max-w-none text-midnight-onyx/80 leading-relaxed text-sm sm:text-base ${
                !isDescriptionExpanded ? 'line-clamp-3' : ''
              }`}>
              <p>{property.description || 'Hermosa residencia de lujo con acabados de alta gama y diseño arquitectónico contemporáneo.'}</p>
              {isDescriptionExpanded && (
                <p className="mt-4">
                  Diseñada con un enfoque de integración entre interiores y exteriores, la residencia ofrece espacios abiertos con ventilación cruzada y luz natural constante durante todo el día.
                </p>
              )}
            </div>
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-4 text-desert-gold font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              <span>{isDescriptionExpanded ? 'Leer menos' : 'Leer más'}</span>
              <span>{isDescriptionExpanded ? '↑' : '→'}</span>
            </button>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-frosted-pearl p-6 sm:p-8 rounded-2xl border border-midnight-onyx/5 shadow-sm">
              <h2 className="text-lg font-semibold text-midnight-onyx mb-6">Amenidades e Instalaciones</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-midnight-onyx/80 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-desert-gold/20 text-desert-gold text-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mortgage Banner */}
          <div className="bg-gradient-to-r from-frosted-pearl to-cloud-white p-6 rounded-2xl border border-desert-gold/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-desert-gold/15 rounded-full text-desert-gold shadow-sm">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-midnight-onyx">Calculadora de Hipoteca</h3>
                <p className="text-xs text-midnight-onyx/60">
                  Estimación desde <strong className="text-desert-gold font-bold">$5,430/mes</strong> con 20% de enganche
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMortgageModalOpen(true)}
              className="whitespace-nowrap px-5 py-2.5 bg-cloud-white border border-midnight-onyx/15 hover:border-desert-gold rounded-xl text-xs sm:text-sm font-semibold hover:bg-desert-gold hover:text-midnight-onyx transition-all shadow-sm">
              Calcular Hipoteca
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar (Pricing, Agent & Leaflet Map) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-28 space-y-6">
            {/* Price & Contact Card */}
            <div className="bg-frosted-pearl p-6 rounded-2xl shadow-sm border border-midnight-onyx/10">
              <div className="mb-4">
                <h1 className="text-4xl font-light text-midnight-onyx tracking-tight mb-2">
                  {formattedPrice}
                  {property.purpose === 'rent' && (
                    <span className="text-sm font-normal text-midnight-onyx/60">/mes</span>
                  )}
                </h1>
                <p className="text-midnight-onyx/60 text-sm font-medium flex items-center gap-1">
                  <Pin size={16} className="text-desert-gold" />
                  {property.location}
                </p>
              </div>

              <div className="h-px bg-midnight-onyx/10 my-6"></div>

              {/* Agent Card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cloud-white shadow-sm flex-shrink-0">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight-onyx">{agent.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-desert-gold font-medium">
                    <span>★</span>
                    <span>{agent.title}</span>
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => showToast(`Iniciando chat con ${agent.name}...`)}
                    title="Enviar Mensaje"
                    className="p-2.5 rounded-full bg-desert-gold/15 text-midnight-onyx hover:bg-desert-gold hover:text-midnight-onyx transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => showToast(`Llamando a ${agent.name}: ${agent.phone || '+1 (555) 234-5678'}`)}
                    title="Llamar Agente"
                    className="p-2.5 rounded-full bg-desert-gold/15 text-midnight-onyx hover:bg-desert-gold hover:text-midnight-onyx transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => showToast('¡Solicitud de visita registrada! Un agente se pondrá en contacto.')}
                  className="w-full bg-desert-gold hover:bg-desert-gold/90 text-midnight-onyx py-4 px-6 rounded-xl font-bold transition-all shadow-md shadow-desert-gold/20 flex items-center justify-center gap-2 group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar Visita
                </button>
                <button
                  onClick={() => showToast('Formulario de contacto enviado al agente.')}
                  className="w-full bg-transparent border border-midnight-onyx/20 hover:border-desert-gold text-midnight-onyx py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contactar Agente
                </button>
              </div>
            </div>

            {/* Leaflet Map Widget */}
            <div className="bg-frosted-pearl p-3 rounded-2xl shadow-sm border border-midnight-onyx/10">
              <h3 className="text-xs font-semibold text-midnight-onyx/70 uppercase tracking-wider mb-2 px-1">
                Ubicación en Mapa
              </h3>
              <PropertyMap location={property.location} coordinates={property.coordinates} />
            </div>
          </div>
        </div>
      </div>

      {/* Mortgage Modal */}
      <MortgageCalculatorModal
        propertyPrice={property.price}
        isOpen={isMortgageModalOpen}
        onClose={() => setIsMortgageModalOpen(false)}
      />
    </div>
  );
};
