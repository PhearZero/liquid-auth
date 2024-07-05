import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from "rehype-mermaid";
import tailwind from "@astrojs/tailwind";
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'

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
      plugins: [
        starlightOpenAPI([
          {
            base: 'server/api',
            label: 'Reference',
            schema: 'https://liquid-auth.onrender.com/docs-json',
          },
        ]),
        ],
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
          items: [
            {
              label: 'Introduction',
              link: '/server/introduction'
            },
            {
              label: 'Running locally',
              link: '/server/running-locally'
            },
            {
              "label": "Configuration",
              "link": "/server/environment-variables"
            },
            {
              label: 'Integrations',
              link: '/server/integrations'
            },
            ...openAPISidebarGroups
          ]
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
