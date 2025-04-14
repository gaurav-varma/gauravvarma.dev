---
title: Rails 5.2 rolls out Credentials for encrypted secrets
createdAt: '2018-04-24'
excerpt: Rails 5.2 introduces a secure way to manage credentials using a single encrypted YAML file, replacing secrets.yml and config secrets.
categories:
  - Rails
  - Rails 5.2
---

Rails 5.2 introduced **Rails Credentials**, a new way to securely store secrets and application credentials using an encrypted YAML file.

### Why credentials?

Before Rails 5.2, secrets were stored in `secrets.yml`, sometimes unencrypted. This posed a risk when sharing codebases. The new credentials approach improves security and developer experience.

### Setting it up

To edit credentials:

```bash
bin/rails credentials:edit
```

This opens a YAML file that is encrypted using a master key stored in `config/master.key` or `ENV['RAILS_MASTER_KEY']`.

### Example credentials.yml.enc

```yaml
aws:
  access_key_id: 123
  secret_access_key: abc
```

You can access them via:

```ruby
Rails.application.credentials.dig(:aws, :access_key_id)
```

### Links

- [PR #30067 - Adds credentials using a generic EncryptedConfiguration class](https://github.com/rails/rails/pull/30067)
- [PR #30940 - Adds support for managing custom encrypted files from cli](https://github.com/rails/rails/pull/30940)
- [Rails documentation for custom credentials](https://guides.rubyonrails.org/v5.2/security.html#custom-credentials)

### Summary

Rails Credentials consolidate secret management into a single encrypted source, ensuring sensitive data like API keys are secure and easy to access in any environment.
