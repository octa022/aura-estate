# Bitácora de Desarrollo — Aura Estate

Este archivo registra el progreso, las decisiones de diseño, los cambios relevantes y las tareas pendientes del desarrollo de **Aura Estate**. Los registros se organizan de manera cronológica descendente (lo más nuevo al inicio).

---

## [2026-07-31] — Implementación de la Pantalla de Detalle de Propiedad (Property Details Screen), Leaflet y Migración Supabase via MCP

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Base de datos de Supabase actualizada via MCP con columnas de slugs, imágenes múltiples, coordenadas y amenidades. Vistas de detalle en Next.js App Router integradas con la BD.

### Cambios Realizados:

- **Base de Datos (Supabase MCP)**:
  - Conectado el servidor MCP de Supabase y aplicada la migración DDL [antigravity/schema_update_property_details.sql](antigravity/schema_update_property_details.sql) (`add_property_details_columns_and_slugs`).
  - Creadas las columnas `slug`, `images`, `description`, `amenities`, `lat`, `lng`, `agent_*`, `garage`, `year_built` e índice `idx_properties_slug` en la tabla `properties`.
- **Rutas y Servidor (Next.js App Router)**:
  - Creada la ruta dinámica [app/propiedades/[slug]/page.tsx](app/propiedades/[slug]/page.tsx) con `generateMetadata` dinámico para Open Graph (redes sociales y WhatsApp).
- **Modelo de Datos y Mapeo**:
  - Actualizado [app/lib/supabase.ts](app/lib/supabase.ts) para mapear dinámicamente todas las nuevas columnas de la base de datos de Supabase (`slug`, `images`, `amenities`, `coordinates`, `agent`, etc.).
- **Componentes de UI y Navegación**:
  - Creado [components/PropertyGallery.tsx](components/PropertyGallery.tsx) con visor principal, tira de miniaturas activas y modal Lightbox de pantalla completa.
  - Creado [components/PropertyMap.tsx](components/PropertyMap.tsx) integrando el mapa interactivo de Leaflet con pin personalizado en colores de marca (`Desert Gold` / `Midnight Onyx`).
  - Creado [components/MortgageCalculatorModal.tsx](components/MortgageCalculatorModal.tsx) para estimar cuotas mensuales de hipoteca según enganche, plazo y tasa.
  - Creado [components/PropertyDetailsContent.tsx](components/PropertyDetailsContent.tsx) organizando la información en columna principal y barra lateral pegajosa (*Sticky Sidebar*) matching exacto con la pantalla de Stitch.
  - Actualizado [components/Navbar.tsx](components/Navbar.tsx) para envolver el isotipo de la marca en `<Link href="/">` y retornar al inicio.
  - Actualizado [components/PropertyCard.tsx](components/PropertyCard.tsx) redirigiendo a la URL amigable `/propiedades/[slug]`.
- **Verificación**:
  - TypeScript compilado sin errores (`npx tsc --noEmit`).
  - ESLint ejecutado limpiamente (`npx eslint .`).

---

## [2026-07-31] — Creación y Condensación de la Guía de Buenas Prácticas Inmobiliarias en Next.js

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Documento de buenas prácticas en formato condensado de bullet points integrado en la carpeta `antigravity/`.

### Cambios Realizados:

- **Documentación de Proyecto**:
  - Creado y estructurado el archivo [antigravity/best-practices.md](antigravity/best-practices.md) con bullet points directos y condensados por ejes clave: Rendimiento App Router, SEO e imagen pública, UX/UI Inmobiliario, Supabase/PostGIS, Captura de Leads e Ideas Clave para Aura Estate.

---

## [2026-07-25] — Alineación del Diseño del Home con Stitch: Tarjetas Destacadas y Reubicación de Nuevas Oportunidades

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Componentes del frontend reestructurados para alinearse al orden y estilo visual del Home Discover Screen de Stitch.

### Cambios Realizados:

- **Componentes de Frontend**:
  - Modificado [components/PropertyCard.tsx](components/PropertyCard.tsx) para eliminar el layout horizontal de las tarjetas destacadas (`featured`).
  - Añadido un gradiente oscuro absoluto (`bg-gradient-to-t`) en la base de la imagen para mejorar el contraste visual y la estética del título sobre la tarjeta.
  - Reubicado el precio al encabezado superior derecho del cuerpo de la tarjeta destacado, logrando fidelidad visual al diseño de Stitch.
  - Quitado el col-span interno permitiendo que las tarjetas se ubiquen limpiamente lado a lado en la cuadrícula de 2 columnas de `app/page.tsx`.
  - Dividido el componente `SearchAndFilters` en [components/SearchAndFilters.tsx](components/SearchAndFilters.tsx) para separar la cabecera e interactividad de la sección "Nuevas Oportunidades" (`NewOpportunitiesHeader`).
  - Modificado [app/page.tsx](app/page.tsx) para quitar `initialPurpose` del buscador superior y renderizar `<NewOpportunitiesHeader />` exactamente debajo de la sección de Colecciones Exclusivas y antes del grid secundario de propiedades estándar, corrigiendo la jerarquía visual de la página.
- **Verificación**:
  - Verificada la compilación exitosa con TypeScript (`tsc --noEmit`).
  - Linter ejecutado correctamente.



## [2026-07-23] — Incorporación de bandera 'Featured' para Colecciones Exclusivas

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Base de datos de Supabase y cliente de frontend modificados para filtrar/mapear por la bandera `is_featured`. Linter y Typescript completamente limpios.

### Cambios Realizados:

- **Base de Datos (Supabase)**:
  - Creada la columna `is_featured` en la tabla `properties` y marcados los registros destacados iniciales (`prop-1`, `prop-9`, `prop-14`, `prop-20`) con `true`.
- **Modelos y Frontend**:
  - Actualizado `Property` en [app/data/mockProperties.ts](app/data/mockProperties.ts) para incluir `isFeatured?: boolean` y marcadas las correspondientes propiedades simuladas.
  - Modificado [app/lib/supabase.ts](app/lib/supabase.ts) para mapear `is_featured` a `isFeatured` y actualizar filtros de obtención (`fetchProperties` excluye destacadas, `fetchFeaturedProperties` obtiene solo destacadas).
  - Creada interfaz `SupabaseProperty` en `app/lib/supabase.ts` para eliminar todos los tipos `any` inseguros.
- **Calidad de Código**:
  - Corregido error de redirección Next.js en [app/page.tsx](app/page.tsx) reemplazando `<a>` con `<Link>`.
  - Corregido warning de hooks de React en [components/SearchAndFilters.tsx](components/SearchAndFilters.tsx) al cambiar la sincronización basada en `useEffect` por sincronización directa en renderizado.
  - Verificada la compilación exitosa y el linter sin alertas.

---

## [2026-07-23] — Conexión con Supabase y Paginación en Servidor

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Base de datos de Supabase en producción y HomeScreen migrado por completo a Server-Side Pagination en Next.js 16.

### Cambios Realizados:

- **Supabase & DDL**:
  - Ejecutada migración para crear la tabla `properties` en el esquema público de Supabase y configuradas políticas de seguridad RLS de solo lectura.
  - Sembrado el set completo de 20 propiedades.
- **Conectividad REST**:
  - Creado un cliente nativo optimizado en [app/lib/supabase.ts](app/lib/supabase.ts) que consume la API REST de Supabase mediante `fetch` nativo sin necesidad de dependencias npm extras.
- **HomeScreen & Componentes**:
  - Refactorizado [app/page.tsx](app/page.tsx) a un Server Component asíncrono para gestionar la carga de datos del lado del servidor.
  - Creados los componentes de control de búsqueda/filtrado ([components/SearchAndFilters.tsx](components/SearchAndFilters.tsx)) y paginación ([components/Pagination.tsx](components/Pagination.tsx)) para sincronizar los estados con la barra de navegación y la URL.
  - Optimizado [components/Navbar.tsx](components/Navbar.tsx) para resolver compatibilidad con Server Components.

---

## [2026-07-23] — Inclusión de 10 Nuevas Propiedades Mock

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Base de datos de prueba ampliada a un total de 20 propiedades.
- **Cambios Realizados**:
  - Se añadieron 10 nuevas propiedades en [app/data/mockProperties.ts](app/data/mockProperties.ts) (IDs `prop-11` a `prop-20`) cubriendo diferentes categorías (villas, apartamentos, casas y penthouses) tanto en venta como en renta en distintas localizaciones reales de EE. UU. (Malibu, Seattle, Chicago, Austin, etc.).

---

## [2026-07-23] — Remoción del Modo Oscuro

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Modo oscuro removido por completo de la aplicación para mantener un diseño consistente y simplificado.

### Cambios Realizados:

- **Estilos Globales**: Removida la regla `@media (prefers-color-scheme: dark)` de [app/globals.css](app/globals.css) para evitar que se inviertan las variables del tema de forma automática por el sistema.
- **Componentes**: Eliminadas todas las variantes de clase `dark:` en:
  - [components/Navbar.tsx](components/Navbar.tsx)
  - [components/PropertyCard.tsx](components/PropertyCard.tsx)
  - [app/page.tsx](app/page.tsx)

---

## [2026-07-09] — Creación del HomeScreen con Propiedades Mock

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: HomeScreen completamente funcional con filtrado en tiempo real, catálogo de propiedades mock y diseño premium adaptado al sistema de diseño.

### Cambios Realizados:

- **Estilos y Tipografía**: Configurados los colores premium oficiales y la tipografía `Inter` en `app/globals.css` y `app/layout.tsx`.
- **Datos Mock**: Creado `app/data/mockProperties.ts` con 10 propiedades detalladas con imágenes reales de alta calidad.
- **Componentes Modulares**:
  - `components/Icons.tsx`: Iconos SVG locales.
  - `components/Navbar.tsx`: Barra de navegación responsiva y sticky.
  - `components/PropertyCard.tsx`: Tarjetas de propiedades con zoom hover y botón interactivo de favorito.
- **Lógica de HomeScreen**: Implementado el buscador reactivo, filtros por categoría (Casas, Apartamentos, Villas, Penthouses), selector compra/renta, y paginación en `app/page.tsx`.
- **Optimización de Imágenes**: Integración de `<Image>` de Next.js configurando los patrones remotos en `next.config.ts`.
- **Verificación**: Compilación e inspección de ESLint exitosas sin errores.

---

## [2026-07-09] — Instalación y Configuración de Prettier

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Configurado con Prettier para formateo automático de código.

### Cambios Realizados:

- **Dependencias**: Instalación de `prettier` como dependencia de desarrollo.
- **Archivos de Configuración**: Creación de `.prettierrc.json` (estilo idéntico a `kaisoft-restaurante`) y `.prettierignore`.
- **Scripts**: Añadido script `"format"` a `package.json` para ejecutar Prettier.
- **Configuración del IDE**: Creación de `.vscode/settings.json` para habilitar el formateo automático con Prettier al guardar archivos.
- **Formateo**: Ejecución de `npm run format` sobre todo el proyecto para alinear el estilo de los archivos existentes.

---

## [2026-07-08] — Configuración Inicial y Pautas de Agente

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Inicializado (Next.js 16.2.10 + Tailwind CSS), ejecutándose localmente en `http://localhost:3000`.

### Cambios Realizados:

- **Estructuración de Pautas**: Se actualizó y tradujo [AGENTS.md](AGENTS.md) al español para guiar a cualquier agente de IA a seguir las pautas y el sistema de diseño del proyecto.
- **Refactorización de Documentación**: Se mejoró el formato y la redacción de los archivos [antigravity/instructions.md](antigravity/instructions.md) y [antigravity/guidelines.md](antigravity/guidelines.md) para mayor legibilidad y claridad de la paleta de colores.
- **Enlaces Relativos**: Se cambiaron los enlaces absolutos en `AGENTS.md` por enlaces relativos al repositorio, garantizando portabilidad.
- **Creación de esta Bitácora**: Inicialización de este archivo `JOURNAL.md` para documentar la evolución del proyecto.

### Próximos Pasos:

- [ ] Analizar el diseño de referencia en [antigravity/resources/home_discover_screen/code.html](antigravity/resources/home_discover_screen/code.html) y [screen.png](antigravity/resources/home_discover_screen/screen.png).
- [ ] Definir los componentes reutilizables iniciales (botones, tarjetas, barra de navegación) utilizando la paleta de colores premium.
