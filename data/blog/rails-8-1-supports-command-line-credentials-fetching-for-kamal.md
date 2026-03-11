---
title: 'Rails 8.1 supports command-line credentials fetching for Kamal (via rails credentials:fetch)'
createdAt: '2025-12-22'
excerpt: Rails 8.1 adds a new rails credentials:fetch command that allows tools like Kamal to retrieve encrypted credentials directly from the command line.
categories:
  - Rails
  - Rails 8.1
  - DevOps
---

Rails 8.1 introduces **command-line credentials fetching**, making it easier for deployment tools like **Kamal** to retrieve encrypted credentials securely during deployment.

Rails credentials have long been used to store sensitive configuration such as API keys, database passwords, and service tokens. However, accessing those credentials from external tools often required custom scripts or environment variables.

The new `rails credentials:fetch` command provides a clean and secure way for deployment tools to retrieve encrypted secrets directly from the command line.

---

### Why this feature matters

Modern deployment workflows often involve automation tools that run outside the Rails application itself.

For example:

- deployment tools
- CI/CD pipelines
- container build systems
- infrastructure scripts

These systems sometimes need access to application secrets. Previously, retrieving those secrets from Rails credentials required custom integrations.

Rails 8.1 simplifies this by providing a built-in command-line interface.

---

### Using `rails credentials:fetch`

The new command allows developers or deployment tools to retrieve credentials from encrypted files.

Example usage:

```bash
bin/rails credentials:fetch aws.access_key_id
```

This command outputs the decrypted value from the credentials file.

---

### Example credentials file

Example `credentials.yml.enc`:

```yaml
aws:
  access_key_id: ABC123
  secret_access_key: SECRET
```

Fetching the value:

```bash
bin/rails credentials:fetch aws.access_key_id
```

This returns the value without exposing the entire credentials file.

---

### Integration with Kamal

Deployment tools such as **Kamal** can now retrieve secrets during deployment, especially when combined with registry-free workflows from [Rails 8.1 Kamal deployments](/blog/rails-8-1-enables-registry-free-kamal-deployments).

Example workflow:

1. Kamal runs a deploy command
2. The deploy script calls `rails credentials:fetch`
3. Secrets are injected into containers or environment variables

This allows deployment systems to securely obtain credentials when needed.

---

### Example use cases

This feature is useful for many deployment scenarios:

- container deployments
- CI/CD pipelines
- automated infrastructure scripts
- secrets injection during builds
- secure runtime configuration

It improves automation while keeping secrets encrypted at rest.

---

### Links

- [https://guides.rubyonrails.org/8_1_release_notes.html](https://guides.rubyonrails.org/8_1_release_notes.html)
- [https://github.com/rails/rails](https://github.com/rails/rails)
- [https://kamal-deploy.org](https://kamal-deploy.org)

---

### Summary

Rails 8.1 improves deployment workflows with the new `rails credentials:fetch` command. By allowing tools like Kamal to retrieve encrypted secrets securely from the command line, Rails makes automated deployments easier and safer.
