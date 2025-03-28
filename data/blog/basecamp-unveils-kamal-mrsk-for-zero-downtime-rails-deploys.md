---
title: Basecamp unveils Kamal (MRSK) for zero-downtime Rails deploys
createdAt: '2023-03-05'
excerpt: Basecamp released Kamal (formerly MRSK), a zero-downtime deployment tool for Rails and Dockerized apps, offering a modern alternative to Capistrano and cloud lock-in.
categories:
  - Rails
  - DevOps
  - Kamal
---

In Feb 2023, Basecamp released **Kamal** (formerly MRSK) — a deployment tool designed to make **zero-downtime deploys** simple, fast, and infrastructure-independent.

Kamal is opinionated, Docker-based, and avoids cloud-specific lock-in by relying on SSH and Docker Compose. It’s a modern replacement for tools like Capistrano and Heroku pipelines for self-hosted Rails apps.

### What is Kamal?

Kamal is an open-source deployment tool created by [@dhh](https://twitter.com/dhh), inspired by the simplicity of Heroku but designed for **self-hosted environments**. It focuses on:

- Zero-downtime deployments
- Simple configuration
- Docker-first approach
- No vendor lock-in
- Fast rollback

Kamal deploys your Rails app as a set of containers across one or more remote servers using SSH, Docker, and Docker Compose.

### How does Kamal work?

Here’s the basic flow:

1. You define your app and servers in a `deploy.yml` file.
2. Kamal builds a Docker image locally or remotely.
3. It pushes the image to your servers.
4. Kamal performs a rolling update using Docker containers.
5. Nginx or Traefik handles traffic routing with zero downtime.

```bash
kamal init
# Creates config/deploy.yml

kamal deploy
# Deploys your app across all defined servers
```

You can also rollback instantly:

```bash
kamal rollback
```

### Key Features

- ✅ **Zero-downtime deploys** with rolling restarts
- ✅ **Docker-native** with simple container orchestration
- ✅ **Configurable load balancing** (Nginx, Traefik, HAProxy)
- ✅ **Integrated asset building**
- ✅ **Built-in health checks**
- ✅ **Environment parity with production**

### Why Kamal?

For years, Capistrano and cloud PaaS platforms (Heroku, Render) have dominated Rails deployments. Kamal offers:

- More **control** than Heroku
- Less **complexity** than Kubernetes
- Better **developer experience** than Capistrano
- Complete **Docker parity** with local and prod

It’s great for teams who want to:

- Host Rails apps on their own servers
- Avoid cloud lock-in
- Deploy in edge or hybrid environments

### Real-World Setup Example

Your `deploy.yml` might look like this:

```yaml
service: myapp
image: myregistry.com/myapp
servers:
  web:
    hosts:
      - 192.168.0.2
      - 192.168.0.3
env:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
```

Kamal handles the build, push, and deployment process for you — all without touching AWS CLI, Terraform, or Kubernetes.

### Links

- [Kamal GitHub repo](https://github.com/basecamp/kamal)
- [Kamal documentation](https://kamal-deploy.org)
- [Announcement blog post by DHH](https://world.hey.com/dhh/introducing-kamal-9330a267)

### Summary

Kamal is a bold step forward in Rails deployment simplicity. If you’ve ever wanted Heroku-like ease without the vendor lock-in — or you're tired of fiddling with Capistrano — Kamal is worth exploring. It makes Dockerized Rails deploys predictable, fast, and production-ready with minimal overhead.
