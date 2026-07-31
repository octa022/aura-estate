# Buenas Prácticas Inmobiliarias en Next.js — Aura Estate

Lista condensada de directrices, patrones de arquitectura e ideas de UX a seguir durante el desarrollo.

---

## ⚡ 1. Arquitectura y Rendimiento (Next.js App Router)
- **RSC por defecto**: Usar Server Components para catálogos y fichas de propiedades (SSR/ISR).
- **Client Components aislados**: Usar `'use client'` solo en hojas interactivas (filtros, modales, mapas, galerías).
- **Imágenes optimizadas**: Usar `<Image />` con `sizes`, formatos `AVIF`/`WebP` y `priority` en imágenes de cabecera.
- **Evitar CLS**: Implementar `placeholder="blur"` o Blur Data URLs para carga de fotos.
- **Filtros en URL**: Reflejar filtros en `searchParams` (`/propiedades?precio=...&recamaras=...`) para URLs compartibles y Server-Side Pagination.

---

## 🔍 2. SEO y Metadatos Inmobiliarios
- **Open Graph dinámico**: Usar `generateMetadata` para vistas previas con imagen, precio y ubicación en redes sociales/WhatsApp.
- **Schema.org Rich Snippets**: Inyectar JSON-LD (`RealEstateListing`, `SingleFamilyResidence`, `Place`).
- **URLs Semánticas**: Emplear slugs legibles (`/propiedades/casa-lujo-lomas-123`) en lugar de IDs expuestos.
- **Sitemap dinámico**: Mantener `sitemap.ts` sincronizado con las propiedades activas.

---

## 🎨 3. UX/UI y Conversión
- **CTAs flotantes (Sticky)**: Botones persistentes en móvil para "Contactar por WhatsApp" y "Agendar Visita".
- **Galería multimedia completa**: Mosaico con contador, modal lightbox, soporte táctil (swipe) y pestañas (Fotos/360°/Planos).
- **Mapas e infraestructura**: Integración de mapa interactivo con puntos de interés cercanos (escuelas, hospitales, transporte).
- **Feedback visual**: Carga con esqueletos (*Skeletons*) adaptados a la paleta oficial (Frosted Pearl / Midnight Onyx) en lugar de spinners.

---

## 🗄️ 4. Base de Datos y Supabase
- **Búsqueda espacial (PostGIS)**: Coordenadas lat/lng para filtrado geoespacial y por radio de distancia.
- **Índices clave**: Indexar en Postgres `price`, `status`, `city`, `bedrooms`, `bathrooms`, `is_featured` y `created_at`.
- **Estados de propiedad**: Control mediante enum (`active`, `reserved`, `sold`, `draft`).
- **Seguridad RLS**: Políticas de Row Level Security para proteger datos personales de clientes.
- **Invalidador de caché**: Invocación de `revalidatePath` o `revalidateTag` al actualizar o vender inmuebles.

---

## 🛡️ 5. Captura de Leads y Formularios
- **Server Actions con Zod**: Validación estricta en servidor de todas las solicitudes de información.
- **Antispam sin fricción**: Implementación de Cloudflare Turnstile o reCAPTCHA v3 invisible.
- **Notificaciones Toast**: Confirmación visual inmediata al enviar formularios o guardar favoritos.

---

## 💡 6. Funcionalidades e Ideas Clave para Aura Estate
- **Colecciones Exclusivas**: Sección destacada en Home filtrada por la bandera `is_featured = true`.
- **Calculadora Hipotecaria**: Estimador de cuota mensual según enganche, plazo e interés.
- **Comparador de propiedades**: Vista en tabla lado a lado para comparar hasta 4 inmuebles.
- **Alternador de vistas**: Conmutador rápido entre vistas de *Cuadrícula (`Grid`)*, *Lista (`List`)* y *Mapa Dividido*.
- **Alertas de búsqueda**: Guardado de filtros con notificaciones al haber cambios de precio o nuevos inmuebles.

---

## 🔗 Referencias Rápidas
- [Instrucciones Principales](instructions.md)
- [Sistema de Diseño (Colores y Tipografía)](guidelines.md)
