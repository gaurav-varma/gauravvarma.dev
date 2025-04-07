---
title: Kamal 1.0 released – a containerized deployment tool for Rails
createdAt: '2023-09-22'
excerpt: Kamal 1.0 is out, bringing production-ready, Docker-based zero-downtime deploys to self-hosted Rails apps. Built by Basecamp, it's the simplest path to full-cycle deployment.
categories:
  - Rails
  - DevOps
  - Kamal
---

Basecamp has officially released **Kamal 1.0** (previously MRSK), solidifying it as a powerful and stable deployment tool for Ruby on Rails and other Dockerized web apps.

This 1.0 milestone marks Kamal as a **production-ready**, opinionated solution for **zero-downtime deploys** without relying on cloud-specific services or DevOps overhead.

### What’s New in 1.0?

- Improved multi-host orchestration
- Tighter support for Docker Compose and health checks
- Native support for persistent volumes and secrets
- Rolling deploys with automatic cleanup
- Simplified rollback and restart mechanisms

### Why Kamal over other tools?

```
Tool         | Pros                                 | Cons
-------------|--------------------------------------|-----------------------------
Capistrano   | Time-tested, SSH-based               | No container support, slow
Kubernetes   | Scalable, cloud-native               | Overkill for most Rails apps
Heroku       | Super simple                         | Vendor lock-in, expensive
Kamal        | Simple, Docker-native, zero-downtime | Self-hosting required
```

Kamal aims to **strike the balance** — giving you full control and performance without giving up simplicity.

### Typical Deploy Flow

1. Configure `config/deploy.yml`
2. Build and push Docker image
3. Run `kamal deploy`
4. Kamal rolls out the new release without downtime
5. Rollback instantly if needed

```bash
kamal deploy
kamal rollback
```

### Ideal For

- Rails and Dockerized apps
- Teams moving off Heroku or Render
- Self-hosted infrastructure
- Simple CI/CD pipelines

### Resources

- [Kamal GitHub Repo](https://github.com/basecamp/kamal)
- [Kamal Docs](https://kamal-deploy.org)
- [Deploying Rails with Kamal Guide](https://kamal-deploy.org/v1/docs/installation/)

### Final Thoughts

With Kamal 1.0, deploying Rails apps with Docker is finally elegant, repeatable, and reliable. Whether you're building SaaS apps, APIs, or monoliths, Kamal makes self-hosted deploys frictionless and modern.
