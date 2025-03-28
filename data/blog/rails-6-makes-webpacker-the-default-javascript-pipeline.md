---
title: Rails 6 makes Webpacker the default JavaScript pipeline
createdAt: '2019-09-05'
excerpt: Rails 6 officially replaces the asset pipeline for JavaScript with Webpacker, enabling modern JavaScript tooling and ES6 support.
categories:
  - Rails
  - Rails 6
  - JavaScript
---

Rails 6 introduces a major shift in how JavaScript is handled by making **Webpacker** the default JavaScript compiler. This change brings modern frontend tooling to Rails by using **webpack** to bundle and serve JavaScript code.

### Before Rails 6

Prior to Rails 6, JavaScript was managed using **Sprockets**. JS files lived in `app/assets/javascripts`, and scaffold generators created CoffeeScript stubs.

Starting with Rails 5.1, Webpacker could be added manually:

```bash
rails new myapp --webpack
```

Or to integrate with an existing app:

```ruby
# Gemfile
gem 'webpacker', '~> 4.x'
```

```bash
bundle
bundle exec rails webpacker:install
```

### After Rails 6

Now, when you run `rails new`, the Webpacker gem is included by default and `webpacker:install` is automatically executed.

All JS code lives in `app/javascript`. This folder contains:

- `packs/`: Entry points for webpack (e.g. `application.js`)
- `channels/`: Action Cable setup using ES6 (not CoffeeScript)

No scaffold JS stubs are created anymore, except for Action Cable channels.

Default pack file (`application.js`) includes:

```js
require('@rails/ujs').start();
require('turbolinks').start();
require('@rails/activestorage').start();
require('channels');
```

### What is Webpacker?

**Webpacker** is a gem that integrates webpack with Rails. It makes it easy to bundle modern JS using ES6, React, Vue, or other frontend libraries. It ships with sensible defaults and provides helpers for referencing compiled assets.

### Webpacker Structure in Rails 6

```bash
app/javascript
├── channels/
│   ├── consumer.js
│   └── index.js
├── packs/
│   └── application.js
```

Only files inside the `packs/` directory are treated as webpack entry points and compiled. These packs can reference other JS modules, styles, or assets.

### Using Packs in Layouts

To include a pack in your layout:

```erb
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```

If your pack imports CSS:

```erb
<%= stylesheet_pack_tag 'application' %>
```

Best practice is to organize business logic into modules within `app/javascript` and only reference them via the pack files.

### Configuring Webpacker

Webpacker’s main config file is located at:

```bash
config/webpacker.yml
```

It lets you configure source paths, pack output paths, and dev server settings.

Webpack-specific configs live inside:

```bash
config/webpack/
├── development.js
├── production.js
├── environment.js
```

### Compilation

In **development**, webpack compiles JS on the fly with each request.

In **production**, assets are compiled using:

```bash
rails assets:precompile
```

This internally calls:

```bash
rails webpacker:compile
```

Webpacker also supports hot module replacement (HMR) and live reloading with its provided binstubs.

### Links

- [PR #33079 - Adds Webpacker the default JavaScript compiler for Rails](https://github.com/rails/rails/pull/33079)
- [Rails Webpacker GitHub Repo](https://github.com/rails/webpacker)
- [Rails Documentation for Webpacker](https://edgeguides.rubyonrails.org/webpacker.html)

### Summary

By making Webpacker the default, Rails 6 embraces modern JavaScript practices while staying full-stack friendly. With ES6 modules, easy pack organization, and webpack’s flexibility, Rails developers now have first-class support for building modern frontends alongside their backend.
