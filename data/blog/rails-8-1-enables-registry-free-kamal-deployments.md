---
title: Rails 8.1 enables registry-free Kamal deployments (local container registry by default)
createdAt: '2026-02-09'
excerpt: Rails 8.1 introduces registry-free deployments with Kamal, allowing Docker images to be deployed directly to servers without requiring a remote container registry.
categories:
  - Rails
  - Rails 8.1
  - DevOps
  - Kamal
---

Rails 8.1 introduces **registry-free deployments for Kamal**, making it possible to deploy containerized Rails applications without using an external container registry.

Traditionally, container-based deployments require pushing Docker images to a registry such as Docker Hub, Amazon ECR, or GitHub Container Registry before they can be pulled onto servers. While effective, this approach introduces additional infrastructure and configuration.

With registry-free deployments, Kamal can now **build images locally and distribute them directly to servers**, simplifying the deployment workflow.

---

### What is Kamal?

Kamal is a deployment tool created by Basecamp for deploying containerized applications using **SSH and Docker**.

It aims to provide a simple alternative to complex container orchestration systems while maintaining features such as:

- zero-downtime deployments
- rolling updates
- container-based infrastructure
- simple configuration

Kamal allows teams to run production applications using standard Docker environments without requiring Kubernetes.

---

### Traditional container deployments

In most container workflows, the process looks like this:

1. Build Docker image
2. Push image to a registry
3. Servers pull the image from the registry
4. Containers are restarted using the new image

While this works well, it requires maintaining access to a container registry and managing authentication.

---

### Registry-free deployment workflow

Rails 8.1 and Kamal simplify this process by enabling direct image distribution.

The new workflow looks like this:

1. Build the Docker image locally
2. Transfer the image directly to servers
3. Load the image on each server
4. Restart containers with the new image

Because the image is transferred directly over SSH, **a remote registry is no longer required**.

---

### Example deployment

Deploying with Kamal remains straightforward, and can securely fetch secrets at deploy time using [rails credentials:fetch](/blog/rails-8-1-supports-command-line-credentials-fetching-for-kamal).

```bash
kamal deploy
```

Kamal handles the entire process:

- building the container image
- distributing the image to servers
- restarting containers
- performing rolling updates

All of this happens without pushing the image to an external registry.

---

### Why this matters

Registry-free deployments reduce infrastructure requirements and simplify deployment pipelines.

Benefits include:

- fewer external dependencies
- simpler configuration
- improved security (no public registry exposure)
- faster deployments in some environments

For many teams running self-hosted infrastructure, this makes container deployments easier to manage.

---

### Example use cases

Registry-free deployments are particularly useful for:

- self-hosted Rails applications
- private infrastructure environments
- internal tools
- smaller SaaS applications
- edge deployments

Teams can deploy containerized apps without maintaining a registry service.

---

### Links

- [https://guides.rubyonrails.org/8_1_release_notes.html](https://guides.rubyonrails.org/8_1_release_notes.html)
- [https://kamal-deploy.org](https://kamal-deploy.org)
- [https://github.com/basecamp/kamal](https://github.com/basecamp/kamal)

---

### Summary

Rails 8.1 improves the Kamal deployment workflow by supporting registry-free container deployments. By allowing Docker images to be distributed directly to servers, Rails simplifies container infrastructure and makes self-hosted deployments easier to operate.
