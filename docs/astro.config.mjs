import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeMermaid from "rehype-mermaid";
import tailwind from "@astrojs/tailwind";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";
// import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
// https://astro.build/config
export default defineConfig({
  base: "/liquid-auth",
  markdown: {
    rehypePlugins: [rehypeMermaid]
  },
  integrations: [starlight({
    title: "Liquid\nAuth",
    favicon: "./public/logo.svg",
    logo: {
      src: "./public/logo.svg"
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
        badge: {
          text: "WIP",
          variant: "caution"
        }
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
          badge: {
            text: "WIP",
            variant: "caution"
          }
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
            badge: {
              text: "WIP",
              variant: "caution"
            }
          },
          {
            label: "Registration",
            link: "/clients/android/registration",
            badge: {
              text: "WIP",
              variant: "caution"
            },
          },
          {
            label: "Authentication",
            link: "/clients/android/authentication",
            badge: {
              text: "TODO",
              variant: "danger"
            },
          },
          {
            label: "Peer Offer",
            link: "/clients/android/offer",
            badge: {
              text: "TODO",
              variant: "danger"
            },
          },
          {
            label: "Peer Answer",
            link: "/clients/android/answer",
            badge: {
              text: "TODO",
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
          badge: {
            text: "WIP",
            variant: "caution"
          }
        },
          {
          label: "Registration",
          link: "/clients/browser/registration",
          badge: {
            text: "WIP",
            variant: "caution"
          },
        },
          {
          label: "Authentication",
          link: "/clients/browser/authentication",
          badge: {
            text: "WIP",
            variant: "caution"
          },
        },
          {
          label: "Peer Offer",
          link: "/clients/browser/offer",
          badge: {
            text: "WIP",
            variant: "caution"
          },
        },
          {
          label: "Peer Answer",
          link: "/clients/browser/answer",
          badge: {
            text: "WIP",
            variant: "caution"
          },
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
