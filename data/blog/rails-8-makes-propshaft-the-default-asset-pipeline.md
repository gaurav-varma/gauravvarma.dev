---
title: Rails 8 makes Propshaft the default asset pipeline (replacing Sprockets)
createdAt: '2025-03-15'
excerpt: Rails 8 replaces Sprockets with Propshaft as the default asset pipeline, simplifying asset management and improving compatibility with modern JavaScript tooling.
categories:
  - Rails
  - Rails 8
  - Assets
---

Rails 8 introduces **Propshaft** as the new default asset pipeline, replacing the long-standing **Sprockets** system that powered asset management in Rails for more than a decade.

Sprockets served Rails well, but modern frontend workflows increasingly rely on tools like **ESBuild, Bun, Rollup, and Vite** for bundling JavaScript and CSS. Propshaft embraces this shift by providing a **much simpler asset pipeline** that focuses on serving and digesting assets rather than compiling them.

This change reflects Rails’ evolving philosophy: **let dedicated tools handle bundling while Rails focuses on serving assets efficiently.**

---

### What is Propshaft?

Propshaft is a lightweight asset pipeline that focuses on two main responsibilities:

- Serving static assets
- Generating digested filenames for cache busting

Unlike Sprockets, Propshaft **does not attempt to bundle or transpile assets**. Instead, it assumes developers will use modern build tools for that job.

This results in a much simpler pipeline.

---

### Why replace Sprockets?

Sprockets historically handled many responsibilities:

- concatenation
- minification
- preprocessing
- asset dependency graphs

Modern JavaScript ecosystems already solve these problems with specialized tooling.

Propshaft removes this duplication and allows Rails apps to integrate cleanly with modern frontend tools. Modern Rails applications also benefit from new database-backed infrastructure like [Solid Cache](../rails-8-adds-solid-cache-for-built-in-html-fragment-caching) for caching and [Solid Queue](../rails-8-adds-solid-queue-for-built-in-background-jobs) for background jobs.

Benefits include:

- simpler configuration
- faster asset compilation
- better compatibility with modern bundlers
- easier debugging

---

### Basic asset structure

With Propshaft, assets typically live in:

```bash
app/assets
```

Example structure:

```bash
app/assets
├── stylesheets
│   └── application.css
├── images
└── builds
```

Files in this directory are served directly and fingerprinted for caching.

---

### Referencing assets in views

Propshaft still provides the familiar Rails helpers:

```erb
<%= stylesheet_link_tag "application" %>
<%= javascript_include_tag "application" %>
```

Rails automatically adds fingerprinted versions of the files in production.

---

### Using modern bundlers

Propshaft works well with modern build tools.

For example, you might bundle JavaScript using **ESBuild**:

```bash
npm install esbuild
```

Then output compiled files into:

```bash
app/assets/builds
```

Propshaft simply serves the generated assets.

---

### Real-world use cases

Propshaft is ideal for Rails applications using modern frontend setups:

- ESBuild or Bun bundling
- Tailwind CSS builds
- Vite-powered frontend apps
- minimal JavaScript apps

By separating bundling from asset serving, Rails keeps the pipeline simple and flexible.

---

### Links

- [Rails 8.0 Release Notes](https://guides.rubyonrails.org/8_0_release_notes.html)
- [rails/propshaft on GitHub](https://github.com/rails/propshaft)
- [Propshaft default asset pipeline PR](https://github.com/rails/rails/pull/51799)

---

### Summary

Propshaft modernizes Rails asset management by simplifying the asset pipeline and embracing modern JavaScript tooling. By replacing Sprockets with a lighter system, Rails 8 makes frontend integration faster, simpler, and easier to maintain.
