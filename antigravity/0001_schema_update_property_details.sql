-- Script de Migración SQL para Supabase (Aura Estate)
-- Agrega las columnas necesarias para la Pantalla de Detalle de Propiedad (Property Details Screen)

-- 1. Agregar Nuevas Columnas a la Tabla 'properties'
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS amenities TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS lat NUMERIC,
  ADD COLUMN IF NOT EXISTS lng NUMERIC,
  ADD COLUMN IF NOT EXISTS agent_name TEXT DEFAULT 'Sarah Jenkins',
  ADD COLUMN IF NOT EXISTS agent_title TEXT DEFAULT 'Top Rated Agent',
  ADD COLUMN IF NOT EXISTS agent_avatar TEXT DEFAULT 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
  ADD COLUMN IF NOT EXISTS agent_phone TEXT DEFAULT '+1 (555) 234-5678',
  ADD COLUMN IF NOT EXISTS agent_email TEXT DEFAULT 'sarah.jenkins@auraestate.com',
  ADD COLUMN IF NOT EXISTS garage INTEGER DEFAULT 2,
  ADD COLUMN IF NOT EXISTS year_built INTEGER DEFAULT 2024;

-- 2. Crear Índice para Búsqueda Rápida por Slug
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);

-- 3. Poblar Slugs y Datos de Prueba para Propiedades Existentes

-- Propiedad 1: The Glass Pavilion
UPDATE public.properties
SET 
  slug = 'the-glass-pavilion-prop-1',
  description = 'Experimente el lujo moderno en esta residencia arquitectónicamente impresionante ubicada en el corazón de Beverly Hills. Diseñada con un enfoque de integración entre interiores y exteriores, la propiedad cuenta con paredes de vidrio de piso a techo que inundan la casa de luz natural.',
  amenities = ARRAY['Sistema de Hogar Inteligente', 'Piscina Privada', 'Calefacción Central y Aire Acondicionado', 'Cargador de Vehículo Eléctrico', 'Gimnasio Privado', 'Cava de Vinos', 'Seguridad 24/7', 'Acabados en Mármol'],
  images = ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjNDU9iE4zwPuWeg-CjIrLI-87GF24_LgOggcXT0vmUYfMx2q1dJAheiqWqVN-39uiwyLKEfP18FsG1vtUyAPX902OhGEfM4clcQiDsJW7MBbc_BoMtZXtqIeFKIfkHnkIPwmFbQg8Eaan6ULV99T8AUVUuKsro0HoTMrIaxw5pp1uSuQlF8X5Dait4US1W4vmyZnVioXbFnCoaOOZ0LPorb0rVGAIQd9reWcpqq27C0oO4ltnsCTHIcjIm0xp-2qVbRJSIZzWPv0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM'
  ],
  lat = 34.0736,
  lng = -118.4004,
  garage = 3
WHERE id = 'prop-1';

-- Propiedad 2: Azure Heights Penthouse
UPDATE public.properties
SET 
  slug = 'azure-heights-penthouse-prop-2',
  description = 'Exclusivo penthouse de tres niveles con vistas panorámicas de 360 grados a la bahía y a la ciudad. Cuenta con acabados de ultra lujo, terraza privada con Jacuzzi e iluminación automatizada.',
  amenities = ARRAY['Sistema de Hogar Inteligente', 'Piscina Privada', 'Calefacción Central', 'Cava de Vinos', 'Seguridad 24/7'],
  images = ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM'
  ],
  lat = 49.2827,
  lng = -123.1207,
  garage = 2
WHERE id = 'prop-2';

-- Asignar Slugs genéricos para todas las demás propiedades si están nulos
UPDATE public.properties
SET slug = LOWER(REPLACE(REPLACE(title, ' ', '-'), '''', '')) || '-' || id
WHERE slug IS NULL;

-- Asignar imagen principal a la lista de imágenes si está vacía
UPDATE public.properties
SET images = ARRAY[image]
WHERE images IS NULL OR card_cardinality(images) = 0;
