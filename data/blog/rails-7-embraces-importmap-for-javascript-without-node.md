---
title: Rails 7 embraces importmap for JavaScript without Node.js
createdAt: '2021-12-26'
excerpt: Rails 7 drops Webpacker in favor of importmaps and Hotwire for a simpler, modern default JavaScript experience.
categories:
  - Rails
  - Rails 7
---

Rails has always had a mixed relationship with JavaScript. But like it or not, modern web development needs JavaScript—and Rails 7 embraces it with a new approach.

### Before: Webpacker

Since Rails 5.2, JavaScript in Rails apps was handled through [Webpacker](https://github.com/rails/webpacker/), which bundled JS using Webpack. It worked well for its time, but had some drawbacks:

- Required Node, Yarn, and a JS toolchain
- Compilation delays
- Digest-based filenames (e.g., `main-a6d26cef.js`) made caching tricky

As browsers matured and JavaScript standards evolved, the need for bundling and transpilation decreased.

### After: Importmaps + Hotwire

Rails 7 replaces Webpacker with **importmapped Hotwire** as the default JavaScript setup. No Node, no Webpack, no bundling.

#### Why this matters

- **ES6 is now widely supported**, so there's no need to transpile code for modern browsers
- **HTTP/2 removes the penalty for loading many small files**, reducing the need for giant bundles
- **Importmaps allow referencing JS modules by name**, avoiding fingerprinted filenames and recompile cycles

This results in faster boot times, leaner apps, and less infrastructure complexity.

### New Options with `rails new`

Rails 7 introduces a few new options when scaffolding an app:

- `rails new myapp`  
  Installs `importmap-rails`, `turbo-rails`, and `stimulus-rails`. No Node, Yarn, or package.json.

- `rails new myapp --skip-hotwire`  
  Includes `importmap-rails` only, without Turbo or Stimulus.

- `rails new myapp --skip-javascript`  
  No JavaScript setup at all.

- `rails new myapp --webpack`  
  Brings back the Webpack setup from Rails 6. Includes Hotwire by default.

- `rails new myapp --webpack --skip-hotwire`  
  Classic Webpack setup without Hotwire.

### References

- [PR #42999 – Adds importmaps](https://github.com/rails/rails/pull/42999)
- [Modern web apps without JavaScript bundling or transpiling](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755)

### Summary

With importmaps and Hotwire, Rails 7 streamlines the JavaScript setup for modern apps. You get a full-featured experience without the overhead of Node or bundlers—Rails stays true to its roots of convention over configuration, while still staying modern.
