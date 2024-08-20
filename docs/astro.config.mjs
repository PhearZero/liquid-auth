import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeMermaid from "rehype-mermaid";
import tailwind from "@astrojs/tailwind";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
// import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  site: 'https://liquidauth.com',
  markdown: {
    rehypePlugins: [rehypeMermaid]
  },
  integrations: [starlight({
    title: "Liquid Auth",
    favicon: "./public/logo.svg",
    customCss: [
      './src/styles/mermaid.css',
    ],
    logo: {
      src: "./public/logo.svg"
    },
    head:[
      {
        tag: 'script',
        attrs: {
          // Tweaks to the script URL or attributes can be made here.
          src: 'https://unpkg.com/htmx.org@1.9.6',
          integrity: "sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni",
          crossorigin: "anonymous",
        },
      },
    ],
    editLink: {
      baseUrl: 'https://github.com/algorandfoundation/liquid-auth/edit/develop/docs/',
    },
    plugins: [
      // starlightTypeDoc({
      //   entryPoints: ["../docs/clients/liquid-auth-js/src/index.ts"],
      //   tsconfig: "../docs/clients/liquid-auth-js/tsconfig.json",
      //   output: "clients/browser/api",
      //   sidebar: {
      //     label: "Reference",
      //     collapsed: true
      //   }
      // }),
      starlightOpenAPI([{
        base: "server/api",
        label: "Reference",
        schema: "https://liquid-auth.onrender.com/docs-json"
      }])
    ],
    social: {
      github: "https://github.com/algorandfoundation/liquid-auth"
    },
    sidebar: [{
      label: "Overview",
      link: "/introduction"
    }, {
      label: "Guides",
      autogenerate: {
        directory: "guides"
      }
    }, {
      label: "Server",
      collapsed: true,
      items: [{
        label: "Introduction",
        link: "/server/introduction",
      },
        {
        label: "Running locally",
        link: "/server/running-locally"
      },
        {
        "label": "Configuration",
        "link": "/server/environment-variables"
      },
        {
        label: "Integrations",
        link: "/server/integrations",
      },
        ...openAPISidebarGroups,
      ]
    }, {
      label: "Clients",
      collapsed: true,
      items: [{
        label: "Android",
        collapsed: true,
        items: [
          {
            label: "Introduction",
            link: "/clients/android/introduction",
          },
          {
            label: "Registration",
            link: "/clients/android/registration",
          },
          {
            label: "Authentication",
            link: "/clients/android/authentication",
          },
          {
            label: "Peer Offer",
            link: "/clients/android/offer",
          },
          {
            label: "Peer Answer",
            link: "/clients/android/answer",
          },
          {
            label: "Provider Service",
            collapsed: true,
            items: [
              {
                label: "Introduction",
                link: "/clients/android/provider-service/introduction",
              },
              {
                label: "Create Passkey",
                link: "/clients/android/provider-service/create-passkey",
                badge: {
                  text: "TODO",
                  variant: "danger"
                },
              },
              {
                label: "Get Passkey",
                link: "/clients/android/provider-service/get-passkey",
                badge: {
                  text: "TODO",
                  variant: "danger"
                },
              }
            ],
              badge: {
              text: "^14",
              variant: "danger"
            },
          },
          {
            label: "Reference",
            // link: "/clients/browser/api",
            badge: {
              text: "TODO",
              variant: "danger"
            },
            items:[]
          },
        ]
      },
        {
        label: "Browser",
        collapsed: true,
        items: [{
          label: "Introduction",
          link: "/clients/browser/introduction",
        },
          {
          label: "Registration",
          link: "/clients/browser/registration",
        },
          {
          label: "Authentication",
          link: "/clients/browser/authentication",
        },
          {
          label: "Peer Offer",
          link: "/clients/browser/offer",
        },
          {
          label: "Peer Answer",
          link: "/clients/browser/answer",
        },
          {
            label: "Full Example",
            link: "/clients/browser/example",
          },
          {
            label: "Reference",
            // link: "/clients/browser/api",
            badge: {
              text: "TODO",
              variant: "danger"
            },
            items:[]
          },
          // typeDocSidebarGroup
        ]
      }]
    }, {
      label: "Architecture",
      link: "/architecture"
    }]
  }), tailwind(), react(), mdx()]
});
