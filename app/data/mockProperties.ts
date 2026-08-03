export interface PropertyAgent {
  name: string;
  title: string;
  avatar: string;
  phone?: string;
  email?: string;
}

export interface PropertyFeatures {
  area: number; // m²
  beds: number;
  baths: number;
  garage: number;
  yearBuilt?: number;
}

export interface Property {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number; // m²
  image: string;
  images?: string[];
  type: 'house' | 'apartment' | 'villa' | 'penthouse';
  purpose: 'sale' | 'rent';
  isExclusive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  description?: string;
  amenities?: string[];
  coordinates?: { lat: number; lng: number };
  agent?: PropertyAgent;
  features?: PropertyFeatures;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getPropertySlug(property: Property): string {
  if (property.slug) return property.slug;
  return `${slugify(property.title)}-${property.id}`;
}

const defaultAgent: PropertyAgent = {
  name: 'Sarah Jenkins',
  title: 'Top Rated Agent',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  phone: '+1 (555) 234-5678',
  email: 'sarah.jenkins@auraestate.com',
};

const defaultAmenities = [
  'Sistema de Hogar Inteligente',
  'Piscina Privada',
  'Calefacción Central y Aire Acondicionado',
  'Cargador de Vehículo Eléctrico',
  'Gimnasio Privado',
  'Cava de Vinos',
  'Seguridad 24/7',
  'Acabados en Mármol',
];

const sampleGalleryImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBjNDU9iE4zwPuWeg-CjIrLI-87GF24_LgOggcXT0vmUYfMx2q1dJAheiqWqVN-39uiwyLKEfP18FsG1vtUyAPX902OhGEfM4clcQiDsJW7MBbc_BoMtZXtqIeFKIfkHnkIPwmFbQg8Eaan6ULV99T8AUVUuKsro0HoTMrIaxw5pp1uSuQlF8X5Dait4US1W4vmyZnVioXbFnCoaOOZ0LPorb0rVGAIQd9reWcpqq27C0oO4ltnsCTHIcjIm0xp-2qVbRJSIZzWPv0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg',
];

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    slug: 'the-glass-pavilion-prop-1',
    title: 'The Glass Pavilion',
    location: 'Beverly Hills, California',
    price: 5250000,
    beds: 5,
    baths: 4.5,
    area: 4200,
    image: sampleGalleryImages[0],
    images: sampleGalleryImages,
    type: 'villa',
    purpose: 'sale',
    isExclusive: true,
    isFeatured: true,
    description:
      'Experimente el lujo moderno en esta residencia arquitectónicamente impresionante ubicada en el corazón de Beverly Hills. Diseñada con un enfoque de integración entre interiores y exteriores, la propiedad cuenta con paredes de vidrio de piso a techo que inundan la casa de luz natural.',
    amenities: defaultAmenities,
    coordinates: { lat: 34.0736, lng: -118.4004 },
    agent: defaultAgent,
    features: { area: 4200, beds: 5, baths: 4.5, garage: 3, yearBuilt: 2024 },
  },
  {
    id: 'prop-2',
    slug: 'azure-heights-penthouse-prop-2',
    title: 'Azure Heights Penthouse',
    location: 'Downtown, Vancouver',
    price: 3800000,
    beds: 3,
    baths: 3,
    area: 2100,
    image: sampleGalleryImages[1],
    images: [sampleGalleryImages[1], sampleGalleryImages[2], sampleGalleryImages[3]],
    type: 'penthouse',
    purpose: 'sale',
    isNew: true,
    description:
      'Exclusivo penthouse de tres niveles con vistas panorámicas de 360 grados a la bahía y a la ciudad. Cuenta con acabados de ultra lujo, terraza privada con Jacuzzi e iluminación automatizada.',
    amenities: defaultAmenities,
    coordinates: { lat: 49.2827, lng: -123.1207 },
    agent: defaultAgent,
    features: { area: 2100, beds: 3, baths: 3, garage: 2, yearBuilt: 2023 },
  },
  {
    id: 'prop-3',
    slug: 'modern-family-home-prop-3',
    title: 'Modern Family Home',
    location: '123 Pine St, Seattle',
    price: 850000,
    beds: 3,
    baths: 2,
    area: 120,
    image: sampleGalleryImages[2],
    images: [sampleGalleryImages[2], sampleGalleryImages[0], sampleGalleryImages[4]],
    type: 'house',
    purpose: 'sale',
    description:
      'Encantadora residencia familiar de diseño escandinavo. Espacios abiertos, cocina gourmet integrada y un amplio jardín privado ideal para convivencia.',
    amenities: defaultAmenities.slice(0, 5),
    coordinates: { lat: 47.6062, lng: -122.3321 },
    agent: defaultAgent,
    features: { area: 120, beds: 3, baths: 2, garage: 2, yearBuilt: 2022 },
  },
  {
    id: 'prop-4',
    slug: 'urban-loft-apartment-prop-4',
    title: 'Urban Loft Apartment',
    location: '456 Elm Ave, Portland',
    price: 3200,
    beds: 1,
    baths: 1,
    area: 85,
    image: sampleGalleryImages[3],
    images: [sampleGalleryImages[3], sampleGalleryImages[1]],
    type: 'apartment',
    purpose: 'rent',
    description:
      'Loft estilo industrial refinado en el distrito de arte. Techos de doble altura, vigas expuestas y ventanales de gran formato.',
    amenities: defaultAmenities.slice(0, 4),
    coordinates: { lat: 45.5152, lng: -122.6784 },
    agent: defaultAgent,
    features: { area: 85, beds: 1, baths: 1, garage: 1, yearBuilt: 2021 },
  },
  {
    id: 'prop-5',
    slug: 'highland-forest-retreat-prop-5',
    title: 'Highland Forest Retreat',
    location: '789 Mountain Rd, Bend',
    price: 620000,
    beds: 2,
    baths: 2,
    area: 98,
    image: sampleGalleryImages[4],
    images: [sampleGalleryImages[4], sampleGalleryImages[0]],
    type: 'house',
    purpose: 'sale',
    description:
      'Refugio rodeado de pino y naturaleza pura. Acabados contemporáneos en madera sostenible y chimenea central de piedra.',
    amenities: defaultAmenities.slice(2, 6),
    coordinates: { lat: 44.0582, lng: -121.3153 },
    agent: defaultAgent,
    features: { area: 98, beds: 2, baths: 2, garage: 1, yearBuilt: 2023 },
  },
  {
    id: 'prop-6',
    slug: 'sea-view-premium-penthouse-prop-6',
    title: 'Sea View Premium Penthouse',
    location: '321 Ocean Dr, Miami',
    price: 4500,
    beds: 3,
    baths: 3,
    area: 180,
    image: sampleGalleryImages[1],
    images: sampleGalleryImages,
    type: 'penthouse',
    purpose: 'rent',
    description:
      'Penthouse frente al mar en South Beach. Acceso directo a playa privada, servicio de concierge y vista ininterrumpida al océano.',
    amenities: defaultAmenities,
    coordinates: { lat: 25.7617, lng: -80.1918 },
    agent: defaultAgent,
    features: { area: 180, beds: 3, baths: 3, garage: 2, yearBuilt: 2024 },
  },
  {
    id: 'prop-7',
    slug: 'central-city-studio-prop-7',
    title: 'Central City Studio',
    location: '555 Main St, Chicago',
    price: 550000,
    beds: 1,
    baths: 1,
    area: 50,
    image: sampleGalleryImages[3],
    images: [sampleGalleryImages[3], sampleGalleryImages[2]],
    type: 'apartment',
    purpose: 'sale',
    description:
      'Estudio ejecutivo en el corazón del distrito financiero de Chicago. Excelente rentabilidad y amenidades de edificio de primera categoría.',
    amenities: defaultAmenities.slice(0, 4),
    coordinates: { lat: 41.8781, lng: -87.6298 },
    agent: defaultAgent,
    features: { area: 50, beds: 1, baths: 1, garage: 1, yearBuilt: 2020 },
  },
  {
    id: 'prop-8',
    slug: 'garden-luxury-villa-prop-8',
    title: 'Garden Luxury Villa',
    location: '999 Oak Ln, Austin',
    price: 2800,
    beds: 2,
    baths: 2,
    area: 110,
    image: sampleGalleryImages[0],
    images: [sampleGalleryImages[0], sampleGalleryImages[4]],
    type: 'villa',
    purpose: 'rent',
    description:
      'Villa de un nivel rodeada de jardines frondosos. Espacios serenos y acabados naturales para una vida relajada.',
    amenities: defaultAmenities.slice(1, 6),
    coordinates: { lat: 30.2672, lng: -97.7431 },
    agent: defaultAgent,
    features: { area: 110, beds: 2, baths: 2, garage: 2, yearBuilt: 2021 },
  },
  {
    id: 'prop-9',
    slug: 'minimalist-oasis-villa-prop-9',
    title: 'Minimalist Oasis Villa',
    location: 'Malibu, California',
    price: 7900000,
    beds: 6,
    baths: 6.5,
    area: 5800,
    image: sampleGalleryImages[0],
    images: sampleGalleryImages,
    type: 'villa',
    purpose: 'sale',
    isExclusive: true,
    isFeatured: true,
    description:
      'Obra maestra del diseño minimalista sobre acantilados de Malibu. Alberca infinity privada, helipuerto y vistas panorámicas al pacífico.',
    amenities: defaultAmenities,
    coordinates: { lat: 34.0259, lng: -118.7798 },
    agent: defaultAgent,
    features: { area: 5800, beds: 6, baths: 6.5, garage: 4, yearBuilt: 2024 },
  },
  {
    id: 'prop-10',
    slug: 'skyline-view-penthouse-prop-10',
    title: 'Skyline View Penthouse',
    location: 'Manhattan, New York',
    price: 12500,
    beds: 4,
    baths: 4,
    area: 320,
    image: sampleGalleryImages[1],
    images: sampleGalleryImages,
    type: 'penthouse',
    purpose: 'rent',
    isNew: true,
    description:
      'Penthouse señorial con vistas directas a Central Park y al horizonte neoyorquino. Altura de techos excepcional y acabados en mármol Calacatta.',
    amenities: defaultAmenities,
    coordinates: { lat: 40.7831, lng: -73.9712 },
    agent: defaultAgent,
    features: { area: 320, beds: 4, baths: 4, garage: 2, yearBuilt: 2023 },
  },
  {
    id: 'prop-11',
    slug: 'seaside-serenity-villa-prop-11',
    title: 'Seaside Serenity Villa',
    location: 'Malibu, California',
    price: 6400000,
    beds: 4,
    baths: 5,
    area: 380,
    image: sampleGalleryImages[0],
    images: sampleGalleryImages,
    type: 'villa',
    purpose: 'sale',
    isNew: true,
    description:
      'Residencia costera contemporánea con acceso directo a playa privada y terrazas voladas hacia el océano.',
    amenities: defaultAmenities,
    coordinates: { lat: 34.0381, lng: -118.6923 },
    agent: defaultAgent,
    features: { area: 380, beds: 4, baths: 5, garage: 3, yearBuilt: 2024 },
  },
  {
    id: 'prop-12',
    slug: 'oakwood-manor-prop-12',
    title: 'Oakwood Manor',
    location: 'Atlanta, Georgia',
    price: 1250000,
    beds: 5,
    baths: 4,
    area: 280,
    image: sampleGalleryImages[2],
    images: [sampleGalleryImages[2], sampleGalleryImages[0], sampleGalleryImages[1]],
    type: 'house',
    purpose: 'sale',
    description:
      'Mansión clásica de piedra y madera con amplias hectáreas de jardines maduros y estanque privado.',
    amenities: defaultAmenities,
    coordinates: { lat: 33.749, lng: -84.388 },
    agent: defaultAgent,
    features: { area: 280, beds: 5, baths: 4, garage: 3, yearBuilt: 2022 },
  },
  {
    id: 'prop-13',
    slug: 'metro-loft-apartment-prop-13',
    title: 'Metro Loft Apartment',
    location: 'Boston, Massachusetts',
    price: 3500,
    beds: 1,
    baths: 1,
    area: 75,
    image: sampleGalleryImages[3],
    images: [sampleGalleryImages[3], sampleGalleryImages[4]],
    type: 'apartment',
    purpose: 'rent',
    description:
      'Loft urbano remodelado en Back Bay. Excelente conectividad y diseño interior contemporáneo.',
    amenities: defaultAmenities.slice(0, 4),
    coordinates: { lat: 42.3601, lng: -71.0589 },
    agent: defaultAgent,
    features: { area: 75, beds: 1, baths: 1, garage: 1, yearBuilt: 2021 },
  },
  {
    id: 'prop-14',
    slug: 'the-peak-penthouse-prop-14',
    title: 'The Peak Penthouse',
    location: 'Chicago, Illinois',
    price: 9500,
    beds: 3,
    baths: 3.5,
    area: 240,
    image: sampleGalleryImages[1],
    images: sampleGalleryImages,
    type: 'penthouse',
    purpose: 'rent',
    isExclusive: true,
    isFeatured: true,
    description:
      'Espectacular penthouse en el piso 60 con vistas al lago Michigan. Ascensor directo privado y sistema domótico integral.',
    amenities: defaultAmenities,
    coordinates: { lat: 41.8986, lng: -87.6235 },
    agent: defaultAgent,
    features: { area: 240, beds: 3, baths: 3.5, garage: 2, yearBuilt: 2023 },
  },
  {
    id: 'prop-15',
    slug: 'eco-friendly-suburban-home-prop-15',
    title: 'Eco-Friendly Suburban Home',
    location: 'Austin, Texas',
    price: 780000,
    beds: 3,
    baths: 2.5,
    area: 160,
    image: sampleGalleryImages[4],
    images: [sampleGalleryImages[4], sampleGalleryImages[2]],
    type: 'house',
    purpose: 'sale',
    description:
      'Vivienda eco-eficiente con paneles solares, recolección de agua pluvial y certificación LEED Gold.',
    amenities: defaultAmenities.slice(2, 7),
    coordinates: { lat: 30.2747, lng: -97.7404 },
    agent: defaultAgent,
    features: { area: 160, beds: 3, baths: 2.5, garage: 2, yearBuilt: 2023 },
  },
  {
    id: 'prop-16',
    slug: 'chic-studio-loft-prop-16',
    title: 'Chic Studio Loft',
    location: 'San Francisco, California',
    price: 2900,
    beds: 1,
    baths: 1,
    area: 65,
    image: sampleGalleryImages[3],
    images: [sampleGalleryImages[3], sampleGalleryImages[1]],
    type: 'apartment',
    purpose: 'rent',
    description:
      'Estudio loft en SOMA con vistas hacia el Bay Bridge. Cocina italiana con barras de cuarzo.',
    amenities: defaultAmenities.slice(0, 4),
    coordinates: { lat: 37.7749, lng: -122.4194 },
    agent: defaultAgent,
    features: { area: 65, beds: 1, baths: 1, garage: 1, yearBuilt: 2022 },
  },
  {
    id: 'prop-17',
    slug: 'emerald-forest-villa-prop-17',
    title: 'Emerald Forest Villa',
    location: 'Portland, Oregon',
    price: 2200000,
    beds: 4,
    baths: 4.5,
    area: 310,
    image: sampleGalleryImages[0],
    images: sampleGalleryImages,
    type: 'villa',
    purpose: 'sale',
    description:
      'Villa de autor inmersa en bosque privado. Arquitectura de líneas puras en armonía con el entorno montañoso.',
    amenities: defaultAmenities,
    coordinates: { lat: 45.5231, lng: -122.6765 },
    agent: defaultAgent,
    features: { area: 310, beds: 4, baths: 4.5, garage: 3, yearBuilt: 2024 },
  },
  {
    id: 'prop-18',
    slug: 'grandview-heights-penthouse-prop-18',
    title: 'Grandview Heights Penthouse',
    location: 'Seattle, Washington',
    price: 4200000,
    beds: 3,
    baths: 3,
    area: 215,
    image: sampleGalleryImages[1],
    images: [sampleGalleryImages[1], sampleGalleryImages[0], sampleGalleryImages[2]],
    type: 'penthouse',
    purpose: 'sale',
    description:
      'Residencia de cúspide con vistas panorámicas al lago Washington y al Mount Rainier.',
    amenities: defaultAmenities,
    coordinates: { lat: 47.6097, lng: -122.3331 },
    agent: defaultAgent,
    features: { area: 215, beds: 3, baths: 3, garage: 2, yearBuilt: 2023 },
  },
  {
    id: 'prop-19',
    slug: 'modernist-brick-house-prop-19',
    title: 'Modernist Brick House',
    location: 'Brooklyn, New York',
    price: 2800000,
    beds: 4,
    baths: 3,
    area: 195,
    image: sampleGalleryImages[2],
    images: [sampleGalleryImages[2], sampleGalleryImages[3]],
    type: 'house',
    purpose: 'sale',
    isNew: true,
    description:
      'Townhouse industrial chic en Brooklyn. Fachada histórica de ladrillo rojo restaurada con interiores contemporáneos de lujo.',
    amenities: defaultAmenities.slice(0, 6),
    coordinates: { lat: 40.6782, lng: -73.9442 },
    agent: defaultAgent,
    features: { area: 195, beds: 4, baths: 3, garage: 1, yearBuilt: 2023 },
  },
  {
    id: 'prop-20',
    slug: 'lakefront-luxury-mansion-prop-20',
    title: 'Lakefront Luxury Mansion',
    location: 'Lake Tahoe, Nevada',
    price: 8500000,
    beds: 6,
    baths: 7,
    area: 620,
    image: sampleGalleryImages[0],
    images: sampleGalleryImages,
    type: 'villa',
    purpose: 'sale',
    isExclusive: true,
    isFeatured: true,
    description:
      'Espectacular finca frente al lago Tahoe con muelle privado, playa de arena y sauna alpino.',
    amenities: defaultAmenities,
    coordinates: { lat: 39.0968, lng: -120.0324 },
    agent: defaultAgent,
    features: { area: 620, beds: 6, baths: 7, garage: 4, yearBuilt: 2024 },
  },
];
