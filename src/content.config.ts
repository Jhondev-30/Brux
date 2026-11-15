import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Testimonios de clientes.
 * Un archivo .md por testimonio en src/content/testimonials/.
 * Los archivos que empiezan por "_" (como _plantilla.md) no se publican.
 */
const testimonials = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/testimonials" }),
  schema: ({ image }) =>
    z.object({
      /** La frase del cliente, tal cual la dijo. */
      quote: z.string().min(20).max(600),
      /** Nombre completo del speaker. */
      name: z.string(),
      /** Qué hace: «Keynote speaker on leadership», «TEDx speaker»… */
      role: z.string(),
      /** Foto opcional, cuadrada, en src/assets/testimonials/. */
      photo: image().optional(),
      /** Resultado concreto opcional: «3 paid keynotes in 4 months». */
      result: z.string().max(80).optional(),
      /** Enlace opcional a su web o LinkedIn. */
      link: z.url().optional(),
      /** Orden en el carrusel: el 1 sale primero. */
      order: z.number().int().default(100),
      /** false para ocultarlo sin borrar el archivo. */
      published: z.boolean().default(true),
    }),
});

export const collections = { testimonials };
