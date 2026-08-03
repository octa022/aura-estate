import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { PropertyDetailsContent } from '../../../components/PropertyDetailsContent';
import { fetchPropertyBySlugOrId } from '../../lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await fetchPropertyBySlugOrId(slug);

  if (!property) {
    return {
      title: 'Propiedad No Encontrada | Aura Estate',
      description: 'La propiedad solicitada no está disponible.',
    };
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return {
    title: `${property.title} | ${formattedPrice} | Aura Estate`,
    description:
      property.description ||
      `Hermosa propiedad de ${property.beds} recámaras y ${property.baths} baños en ${property.location}. Descubre detalles y agenda una visita.`,
    openGraph: {
      title: `${property.title} | Aura Estate`,
      description: `${property.location} - ${formattedPrice}`,
      images: [
        {
          url: property.image,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await fetchPropertyBySlugOrId(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cloud-white text-midnight-onyx flex flex-col font-sans selection:bg-desert-gold/20">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-midnight-onyx/60">
          <Link href="/" className="hover:text-desert-gold transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="capitalize">{property.type === 'house' ? 'Casa' : property.type}</span>
          <span>/</span>
          <span className="text-midnight-onyx font-medium truncate max-w-[200px] sm:max-w-xs">
            {property.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-grow w-full">
        <PropertyDetailsContent property={property} />
      </main>

      {/* Footer */}
      <footer className="bg-frosted-pearl border-t border-midnight-onyx/10 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-midnight-onyx/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-midnight-onyx">Aura Estate</span> — Bienes Raíces de Ultra Lujo
          </div>
          <div>© {new Date().getFullYear()} Aura Estate Inc. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
