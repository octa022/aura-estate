-- Migración de Respaldo: Limpieza de imágenes en la tabla properties
-- Este script migra el contenido del campo "image" al arreglo "images",
-- asegura que existan al menos 4 imágenes (1 principal y 3 placeholders de desarrollo),
-- y finalmente elimina la columna redundante "image".

-- 1. Bloque anónimo para migrar y rellenar imágenes múltiples
DO $$
DECLARE
    r RECORD;
    placeholders text[] := ARRAY[
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80'
    ];
    new_images text[];
    idx integer;
    p_len integer;
    char_val integer;
BEGIN
    p_len := array_length(placeholders, 1);
    
    -- Recorremos cada propiedad
    FOR r IN SELECT id, image, images FROM public.properties LOOP
        -- Si images es nulo o vacío, lo inicializamos con la imagen original
        IF r.images IS NULL OR array_length(r.images, 1) = 0 THEN
            new_images := ARRAY[r.image];
        ELSE
            new_images := r.images;
            -- Si la imagen original no está en el arreglo, la agregamos al inicio
            IF NOT (new_images @> ARRAY[r.image]) THEN
                new_images := array_prepend(r.image, new_images);
            END IF;
        END IF;

        -- Determinamos un desplazamiento según el ID para variedad
        char_val := coalesce(ascii(substring(r.id from 6 for 1)), 0);
        idx := 1;
        
        -- Añadimos placeholders hermosos de Unsplash hasta completar al menos 4 imágenes
        WHILE array_length(new_images, 1) < 4 LOOP
            IF NOT (new_images @> ARRAY[placeholders[((idx + char_val) % p_len) + 1]]) THEN
                new_images := array_append(new_images, placeholders[((idx + char_val) % p_len) + 1]);
            END IF;
            idx := idx + 1;
            
            -- Salvaguarda ante bucle infinito
            IF idx > 20 THEN
                new_images := array_append(new_images, placeholders[1]);
                new_images := array_append(new_images, placeholders[2]);
                new_images := array_append(new_images, placeholders[3]);
            END IF;
        END LOOP;

        -- Actualizamos la propiedad con el nuevo arreglo de imágenes
        UPDATE public.properties SET images = new_images WHERE id = r.id;
    END LOOP;
END $$;

-- 2. Eliminación de la columna redundante "image" tras validar la migración correcta de los datos
ALTER TABLE public.properties DROP COLUMN IF EXISTS image;
