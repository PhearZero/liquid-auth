import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from "rehype-mermaid";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: '/liquid-auth',
  markdown: {
    rehypePlugins: [rehypeMermaid],
  },
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
      sidebar: [
        {
          label: 'Overview',
          link: '/introduction'
        },
        {
        label: 'Guides',
        autogenerate: {
          directory: 'guides'
        }

      },{
        label: 'Server',
          collapsed: true,
        autogenerate: {
          directory: 'server'
        }
      },
        {
          label: 'Clients',
          collapsed: true,
          autogenerate: {
            directory: 'clients'
          }
        },
        {
          label: 'Architecture',
          link: "/architecture"
        },
      {
        label: 'Reference',
        collapsed: true,
        autogenerate: {
          directory: 'reference',
        },
      }]
    }),
    tailwind()]
});
