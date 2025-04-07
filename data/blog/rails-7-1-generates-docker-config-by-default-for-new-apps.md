---
title: Rails 7.1 generates Docker config by default for new apps
createdAt: '2023-10-10'
excerpt: Rails 7.1 now includes Docker configuration out of the box when you generate a new app, making it easier than ever to containerize and deploy Rails apps.
categories:
  - Rails
  - Rails 7.1
---

Rails 7.1 now ships with **default Docker configuration** for every new app, making containerization and deployment to production easier, faster, and consistent across environments.

### What’s included?

When you run:

```bash
rails new myapp
```

Rails will generate:

- `Dockerfile`
- `.dockerignore`
- `bin/docker-entrypoint`

These files serve as a **production-ready Docker setup** to help you ship your Rails app with confidence.

⚠️ Note: These files are optimized for deployment, **not local development**.

### Run your app with Docker

Here’s how you can containerize and run your new app using the generated config:

```bash
docker build -t blog-app .
docker volume create app-storage
docker run --rm -it -v app-storage:/rails/storage -p 3000:3000 --env RAILS_MASTER_KEY=<your-master-key> blog-app
```

Want to start a Rails console?

```bash
docker run --rm -it -v app-storage:/rails/storage --env RAILS_MASTER_KEY=<your-master-key> blog-app console
```

### Building Multi-platform Images

Deploying to Apple Silicon, Intel, or ARM? Rails makes it easy to prepare your app for any architecture:

```bash
docker login -u <your-docker-username>
docker buildx create --use
docker buildx build --push --platform=linux/amd64,linux/arm64 -t <your-user/image-name> .
```

### Bonus: Docked CLI for local dev

If you want to bootstrap a Rails app without worrying about system dependencies, try `docked`. It uses a pre-built Docker image for a smooth Rails experience:

```bash
docker volume create ruby-bundle-cache
alias docked='docker run --rm -it -v ${PWD}:/rails -v ruby-bundle-cache:/bundle -p 3000:3000 ghcr.io/rails/cli'

docked rails new blog-app
cd blog-app
docked rails generate scaffold post title:string body:text
docked rails db:migrate
docked rails server
```

No local Ruby or Node setup needed — just Docker.

### Links

- [PR #46762 – Adds Dockerfile generation](https://github.com/rails/rails/pull/46762)
- [Rails 7.1 release notes](https://guides.rubyonrails.org/7_1_release_notes.html#generate-dockerfiles-for-new-rails-applications)

### Summary

Rails 7.1 adds first-class Docker support for new apps. You get ready-to-use Dockerfiles, production-ready entrypoints, and a cleaner path to building and deploying containerized Rails apps. Whether you're targeting Fly.io, Render, Railway, or your own VPS, you're ready to ship on day one.
