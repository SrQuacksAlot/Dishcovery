import fs from "fs";

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import virtualHtml from 'vite-plugin-virtual-html';
import reactJsxPlugin from '@vitejs/plugin-react';

// If solved-X.js (or .jsx or .vue or .css) exists, then solved-X.js is tested, otherwise X.js
const prefix = fs.existsSync("./src/solved-utilities.js") ? "solved-" : "";



const pages = {
    // Map /react.html
    "react": {
        entry: '/src/reactjs/' + prefix + 'index.jsx',
        title: "Dishcovery",
        body: '<div id="root"></div>'
    },
};

pages.index = pages.test;

export default defineConfig(function (params) {
    const { react } = pages; // Select only active pages for build
    const pg = params.command == "build" ? { react } : pages;
    return {
        plugins: [
            reactJsxPlugin(), 
            nodePolyfills({ protocolImports: true }), 
            virtualHtml({ pages: pg }) // HTML mappings
        ],
        server: {
            host: "0.0.0.0",
            port: 8080,
        },
        build: {
            target: 'esnext', 
            chunkSizeWarningLimit: 600,
            minify: false,
            sourcemap: true,
        },
    };
});
