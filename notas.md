Vamos a crear el HomeScreen con propiedades mock.

Sigue @guidelines.md y @instructions.md para crear el HomeScreen.

- Crea un set de datos mock para mostrar las propiedades que eventualmente vendrán desde una base de datos.

- El HomeScreen debe lucir igual al código usado en @code.html.

supabase > aura-state

======

# Base de datos y paginación

Vamos a crear la base de datos en Supabase. Usa el MCP de Supabase que ya está conectado.

Vamos a crear las propiedades en base de datos, y también necesito que en el HomeScreen tengamos una paginación de las propiedades.

La paginación debe ser del lado del servidor usando funciones de Next.js.

======

# Colecciones Exclusivas

Vamos a crear las "Colecciones Exclusivas" de propiedades. Necesito que tengamos una bandera en la DB que me permita asignar una propiedad como "Featured".

======

Necesito que crees un archivo llamado `best-practices.md` en la carpeta de antigravity.

Ese archivo contendrá las buenas prácticas que debes buscar en aplicaciones de Next.js que se dediquen a la venta de bienes raíces. Necesito bullet points, buenas prácticas, recomendaciones e ideas.

Necesito esto condensado y más bullet points de los temas principales a seguir.

======

# Pantalla de Detalle de Propiedad

Vamos a trabajar en la pantalla de detalle de propiedad individual (Property Details Screen) que podemos ver usando StitchMCP.

Necesito que sigas las buenas prácticas de @best-practices.md.

Otras tareas para lograrlo son:

- Crear un slug en las propiedades para poder hacer URLs amigables.
- Adicionalmente, cada propiedad puede tener de una a N imágenes.
- Hacer la navegación a esas pantallas y poder regresar al home con el icono o logo de la empresa que está en el navbar.
- Para la parte de mapas, usaremos Leaflet.
- Seguir el diseño proporcionado en Property Details Screen de StitchMCP.

======

Actualmente en la base de datos tenemos los campos "images" e "image". Necesito que solo usemos el campo "images", es decir, el arreglo de imágenes, para evitar duplicidad.

- Necesito que cada propiedad tenga al menos 3 imágenes adicionales. Las imágenes pueden ser placeholders o cualquier otra imagen de internet para fines de desarrollo.

- Crea un archivo de migración como respaldo en el sistema que migre los datos del campo "image" al arreglo "images" y elimine el campo "image" una vez validado que no hay pérdida de información.
