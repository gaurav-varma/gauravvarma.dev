---
title: Rails 8 replaces Sprockets with Propshaft for asset pipeline
createdAt: '2024-12-24'
excerpt: Sprockets is out, Propshaft is in. Rails 8 makes Propshaft the default asset pipeline—modern, fast, and designed for today’s frontend tools.
categories:
  - Rails
  - Rails 8
---

Rails 8 introduces **Propshaft** as the new default asset pipeline, moving away from the long-standing **Sprockets** system. The goal? A leaner, faster, and more modern way to manage and serve static assets.

### Why Propshaft?

Sprockets had a good run, but it carried a lot of legacy baggage:

- Complex preprocessing layers
- Dynamic runtime compilation
- Heavy memory usage on large apps

Propshaft is a fresh start. It strips away unnecessary features and focuses on what matters today:

- Simpler configuration
- Faster builds
- Better CDN integration
- Seamless support for modern tools like Importmap, esbuild, and Tailwind CLI

### Key Features of Propshaft

- **Digest-based Caching**: Assets are fingerprinted at build time (e.g., `application-abc123.css`), ensuring cache busting without runtime overhead.
- **No Middleware**: Assets are served as static files—no dynamic pipeline in production.
- **Manifest-driven**: A YAML-based manifest maps logical filenames to their digested counterparts.
- **Logical Paths**: You reference files by name, and Propshaft handles the digested paths.
- **Multiple Asset Paths**: Organize assets across directories like `app/assets`, `vendor/assets`, or custom folders.
- **Zero Preprocessing**: Propshaft doesn't compile SCSS, CoffeeScript, or ERB—use external tools for that.

### Benefits Over Sprockets

```code
| Feature                | Sprockets              | Propshaft                  |
| -----------------------| ---------------------- | ---------------------------|
| Preprocessing          | Built-in               | External tools (ex.esbuild)|
| Fingerprinting         | Digest + runtime logic | Static digesting           |
| Middleware(production) | Yes                    | No                         |
| CDN-friendly           | Somewhat               | Fully                      |
| Performance            | Slower in large apps   | Fast and minimal           |
```

### Example: Migrating to Propshaft

For existing apps, switch to Propshaft with:

```bash
bundle remove sprockets-rails
bundle add propshaft
rails propshaft:install
```

Update `config/application.rb`:

```ruby
config.assets.pipeline = :propshaft
```

Then use:

```erb
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
<%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>
```

### Developer Experience

Propshaft is Rails-y by nature:

- No Webpack needed
- Pairs great with Importmap, esbuild, or Tailwind CLI
- Easy to debug and reason about

It’s optimized for how Rails apps are built today—where JavaScript tooling is modular and asset delivery should be fast and reliable.

### When to Stick with Sprockets?

If your app heavily depends on Sprockets features like:

- SCSS/ERB preprocessing
- Directive-based requires (`//= require`)
- Inline asset compilation in views

...then consider keeping Sprockets or migrating gradually. But for new Rails 8 apps, **Propshaft is the way to go**.

### Summary

Propshaft is Rails 8’s modern answer to a cleaner, faster, and more maintainable asset pipeline. It offloads preprocessing, streamlines serving, and embraces the current frontend landscape—no magic, just files.

### Resources

- [Propshaft on GitHub](https://github.com/rails/propshaft)
- [Upgrading from Sprockets to Propshaft](https://github.com/rails/propshaft/blob/main/UPGRADING.md)
