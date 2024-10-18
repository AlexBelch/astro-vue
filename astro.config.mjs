// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import react from "@astrojs/react";

import node from "@astrojs/node";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), react()],
  // site: "https://alexbelch.github.io",
  base: "/astro-vue",
  output: "server",

  adapter: netlify(),
});