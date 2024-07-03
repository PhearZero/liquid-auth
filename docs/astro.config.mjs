import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: '/liquid-auth',
  integrations: [
    starlight({
      title: 'Liquid\nAuth',
      favicon: './public/logo.svg',
      logo: {
        src: './public/logo.svg'
      },
      social: {
        github: 'https://github.com/algorandfoundation/liquid-auth'
      },
      sidebar: [{
        label: 'Guides',
        autogenerate: {
          directory: 'guides'
        }
      }, {
        label: 'Reference',
        autogenerate: {
          directory: 'reference',
        },
      }]
    }),
    tailwind()]
});
