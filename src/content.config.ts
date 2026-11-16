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
      /** Vídeo testimonio opcional, vertical. Ruta en public/ sin extensión:
       *  "/videos/work/angie-pichardo" busca .mp4 y -poster.webp. */
      video: z.string().startsWith("/").optional(),
      /** Frase de la cita que se resalta (tiene que estar escrita igual que en quote). */
      highlight: z.string().optional(),
      /** Foto opcional del speaker en escenario, al lado de la tarjeta (si no hay vídeo). */
      stagePhoto: image().optional(),
      /** Texto alternativo de stagePhoto. */
      stagePhotoAlt: z.string().optional(),
      /** Orden en la sección: el 1 sale primero. */
      order: z.number().int().default(100),
      /** false para ocultarlo sin borrar el archivo. */
      published: z.boolean().default(true),
    }),
});

/**
 * Artículos del blog. Un archivo .md por artículo en src/content/blog/; el nombre del archivo es la URL:
 * why-calls-for-speakers-dont-lead-to-paid-stages.md → /blog/why-calls-for-speakers-dont-lead-to-paid-stages/
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      /** Título del artículo (h1 y <title>). */
      title: z.string().max(80),
      /** Meta description: 150-160 caracteres. */
      description: z.string().max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string(),
      /** LinkedIn del autor. */
      authorUrl: z.url().optional(),
      /** Portada 16:9, en src/assets/blog/. También es la imagen al compartir. */
      cover: image(),
      coverAlt: z.string(),
      /** Si se publicó antes en la newsletter de LinkedIn, el enlace al original. */
      linkedinUrl: z.url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { testimonials, blog };
