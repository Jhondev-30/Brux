// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site:'https://www.brux.site',
  base:'/',
  trailingSlash:'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  fonts: [{
    provider:fontProviders.local(),
    name:'brux-tittle',
    cssVariable:'--font-brux',
    fallbacks:['sans-serif'],
    options: {
      variants: [
        {
          src:['./src/assets/fonts/archivo-latin.woff2'],
          weight: '400 800',
          style: 'normal',
          unicodeRange: ['U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2212'],
        },
        {
            src: ['./src/assets/fonts/archivo-latin-ext.woff2'],
            weight: '400 800',
            style: 'normal',
            unicodeRange: ['U+0100-02BA', 'U+1E00-1E9F', 'U+20A0-20AB', 'U+A720-A7FF'],
          },

      ],
    },
  },
  ]
});
