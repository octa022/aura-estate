import { Property } from '../data/mockProperties';

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

export async function fetchProperties(params: FetchPropertiesParams): Promise<FetchPropertiesResult> {
  const { page = 1, limit = 8, type = 'all', purpose = 'all', search = '' } = params;
  const offset = (page - 1) * limit;

  const url = new URL(`${SUPABASE_URL}/rest/v1/properties`);
  const queryParams = new URLSearchParams();
  
  // We only fetch non-exclusive properties for the standard grid
  queryParams.set('is_exclusive', 'eq.false');
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
    next: { revalidate: 30 } // Cache results for 30 seconds
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

  const properties = data.map((item: any) => ({
    id: item.id,
    title: item.title,
    location: item.location,
    price: parseFloat(item.price),
    beds: item.beds,
    baths: parseFloat(item.baths),
    area: parseFloat(item.area),
    image: item.image,
    type: item.type,
    purpose: item.purpose,
    isExclusive: item.is_exclusive,
    isNew: item.is_new,
  }));

  return { properties, totalCount };
}

export async function fetchFeaturedProperties(): Promise<Property[]> {
  const url = `${SUPABASE_URL}/rest/v1/properties?is_exclusive=eq.true&limit=2`;
  
  const headers: HeadersInit = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { revalidate: 60 } // Cache featured properties for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch featured properties: ${response.statusText}`);
  }

  const data = await response.json();
  
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    location: item.location,
    price: parseFloat(item.price),
    beds: item.beds,
    baths: parseFloat(item.baths),
    area: parseFloat(item.area),
    image: item.image,
    type: item.type,
    purpose: item.purpose,
    isExclusive: item.is_exclusive,
    isNew: item.is_new,
  }));
}
