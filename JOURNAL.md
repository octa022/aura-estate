# Bitácora de Desarrollo — Aura Estate

Este archivo registra el progreso, las decisiones de diseño, los cambios relevantes y las tareas pendientes del desarrollo de **Aura Estate**. Los registros se organizan de manera cronológica descendente (lo más nuevo al inicio).

---

## [2026-07-23] — Remoción del Modo Oscuro

- **Autor**: Antigravity (AI Coding Assistant)
- **Estado del Proyecto**: Modo oscuro removido por completo de la aplicación para mantener un diseño consistente y simplificado.

### Cambios Realizados:

- **Estilos Globales**: Removida la regla `@media (prefers-color-scheme: dark)` de [app/globals.css](file:///c:/Users/Octavio/OneDrive/Documentos/Repositorios/OCTA/aura-estate/app/globals.css) para evitar que se inviertan las variables del tema de forma automática por el sistema.
- **Componentes**: Eliminadas todas las variantes de clase `dark:` en:
  - [components/Navbar.tsx](file:///c:/Users/Octavio/OneDrive/Documentos/Repositorios/OCTA/aura-estate/components/Navbar.tsx)
  - [components/PropertyCard.tsx](file:///c:/Users/Octavio/OneDrive/Documentos/Repositorios/OCTA/aura-estate/components/PropertyCard.tsx)
  - [app/page.tsx](file:///c:/Users/Octavio/OneDrive/Documentos/Repositorios/OCTA/aura-estate/app/page.tsx)

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
