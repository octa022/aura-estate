import { Property, mockProperties, getPropertySlug } from '../data/mockProperties';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export interface FetchPropertiesParams {
  page?: number;
  limit?: number;
  type?: string;
  purpose?: string;
  search?: string;
}

export interface FetchPropertiesResult {
  properties: Property[];
  totalCount: number;
}

export interface SupabaseProperty {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: string | number;
  beds: number;
  baths: string | number;
  area: string | number;
  images: string[];
  type: 'house' | 'apartment' | 'villa' | 'penthouse';
  purpose: 'sale' | 'rent';
  is_exclusive: boolean;
  is_featured: boolean;
  is_new: boolean;
  description?: string;
  amenities?: string[];
  lat?: number | string;
  lng?: number | string;
  agent_name?: string;
  agent_title?: string;
  agent_avatar?: string;
  agent_phone?: string;
  agent_email?: string;
  garage?: number;
  year_built?: number;
}

export function mapSupabaseItemToProperty(item: SupabaseProperty): Property {
  const mainImage = item.images && item.images.length > 0 ? item.images[0] : '';
  const prop: Property = {
    id: item.id,
    slug: item.slug || getPropertySlug({
      id: item.id,
      title: item.title,
      location: item.location,
      price: Number(item.price),
      beds: item.beds,
      baths: Number(item.baths),
      area: Number(item.area),
      image: mainImage,
      type: item.type,
      purpose: item.purpose,
    }),
    title: item.title,
    location: item.location,
    price: parseFloat(String(item.price)),
    beds: item.beds,
    baths: parseFloat(String(item.baths)),
    area: parseFloat(String(item.area)),
    image: mainImage,
    images: item.images && item.images.length > 0 ? item.images : [mainImage],
    type: item.type,
    purpose: item.purpose,
    isExclusive: item.is_exclusive,
    isFeatured: item.is_featured,
    isNew: item.is_new,
    description: item.description,
    amenities: item.amenities,
    coordinates: item.lat && item.lng ? { lat: Number(item.lat), lng: Number(item.lng) } : undefined,
    agent: item.agent_name
      ? {
          name: item.agent_name,
          title: item.agent_title || 'Agente Inmobiliario',
          avatar: item.agent_avatar || mainImage,
          phone: item.agent_phone,
          email: item.agent_email,
        }
      : undefined,
    features: {
      area: parseFloat(String(item.area)),
      beds: item.beds,
      baths: parseFloat(String(item.baths)),
      garage: item.garage || 2,
      yearBuilt: item.year_built || 2024,
    },
  };

  const mockMatch = mockProperties.find(m => m.id === item.id);
  if (mockMatch) {
    prop.images = prop.images && prop.images.length > 1 ? prop.images : mockMatch.images;
    prop.description = prop.description || mockMatch.description;
    prop.amenities = prop.amenities && prop.amenities.length > 0 ? prop.amenities : mockMatch.amenities;
    prop.coordinates = prop.coordinates || mockMatch.coordinates;
    prop.agent = prop.agent || mockMatch.agent;
  }

  return prop;
}

export async function fetchProperties(params: FetchPropertiesParams): Promise<FetchPropertiesResult> {
  const { page = 1, limit = 8, type = 'all', purpose = 'all', search = '' } = params;
  const offset = (page - 1) * limit;

  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase credentials missing');
    }

    const url = new URL(`${SUPABASE_URL}/rest/v1/properties`);
    const queryParams = new URLSearchParams();
    
    queryParams.set('is_featured', 'eq.false');
    queryParams.set('order', 'created_at.desc');
    
    if (type && type !== 'all') {
      queryParams.set('type', `eq.${type}`);
    }
    
    if (purpose && purpose !== 'all') {
      queryParams.set('purpose', `eq.${purpose}`);
    }
    
    if (search && search.trim() !== '') {
      const cleanSearch = search.trim();
      queryParams.set('or', `(title.ilike.*${cleanSearch}*,location.ilike.*${cleanSearch}*,type.ilike.*${cleanSearch}*)`);
    }
    
    queryParams.set('limit', limit.toString());
    queryParams.set('offset', offset.toString());

    const fetchUrl = `${url.toString()}?${queryParams.toString()}`;

    const headers: HeadersInit = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'count=exact'
    };

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers,
      next: { revalidate: 30 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.statusText}`);
    }

    const data = await response.json();
    const contentRange = response.headers.get('content-range');
    let totalCount = 0;
    if (contentRange) {
      const parts = contentRange.split('/');
      if (parts.length > 1) {
        totalCount = parseInt(parts[1], 10);
      }
    } else {
      totalCount = data.length;
    }

    const properties = data.map((item: SupabaseProperty) => mapSupabaseItemToProperty(item));

    return { properties, totalCount };
  } catch (error) {
    console.warn('Using mockProperties fallback:', error);
    const nonFeatured = mockProperties.filter(p => !p.isFeatured);
    return {
      properties: nonFeatured.slice(offset, offset + limit),
      totalCount: nonFeatured.length
    };
  }
}

export async function fetchFeaturedProperties(): Promise<Property[]> {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase credentials missing');
    }

    const url = `${SUPABASE_URL}/rest/v1/properties?is_featured=eq.true&limit=2`;
    
    const headers: HeadersInit = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch featured properties: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((item: SupabaseProperty) => mapSupabaseItemToProperty(item));
  } catch (error) {
    console.warn('Using featured mockProperties fallback:', error);
    return mockProperties.filter(p => p.isFeatured).slice(0, 2);
  }
}

export async function fetchPropertyBySlugOrId(slugOrId: string): Promise<Property | null> {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase credentials missing');
    }

    // Try fetching by slug first or id
    const isId = slugOrId.startsWith('prop-');
    const filterQuery = isId ? `id=eq.${slugOrId}` : `slug=eq.${slugOrId}`;
    const url = `${SUPABASE_URL}/rest/v1/properties?${filterQuery}&limit=1`;

    const headers: HeadersInit = {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    };

    const res = await fetch(url, { headers, next: { revalidate: 30 } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return mapSupabaseItemToProperty(data[0]);
      }
    }
  } catch (error) {
    console.warn('Supabase fetchPropertyBySlugOrId error:', error);
  }

  // Fallback to local mock search
  const mockMatch = mockProperties.find(
    p => p.id === slugOrId || getPropertySlug(p) === slugOrId || p.slug === slugOrId
  );

  return mockMatch || null;
}
