---
title: Rails 6 supports multiple databases in one app
createdAt: '2019-08-26'
excerpt: Rails 6 introduces built-in support for multiple databases, allowing developers to scale with read replicas, isolate domains with separate databases, and manage migrations independently.
categories:
  - Rails
  - Rails 6
---

Rails 6 brings **first-class support for multiple databases**, making it much easier to manage complex applications that need **read/write separation**, **replica fallbacks**, or **domain-specific sharding** — without relying on third-party gems.

### Key Features

- Connect to **multiple primary and replica databases**
- Built-in **connection switching** middleware
- Independent **migrations and schema tracking**
- Out-of-the-box **Rails tasks** for each database

### Setting Up `database.yml`

Here’s an example configuration with a primary DB and an `animals` DB with replicas:

```yaml
production:
  primary:
    database: my_primary_database
    adapter: mysql
    user: root
  primary_replica:
    database: my_primary_database
    adapter: mysql
    user: readonly_user
    replica: true

  animals:
    database: animals_db
    adapter: mysql
    user: animals_user
    migrations_paths: db/animals_migrate
  animals_replica:
    database: animals_db
    adapter: mysql
    user: animals_readonly
    replica: true
```

A few important things to note:

- Replicas must set `replica: true`
- Use different users for primaries and replicas
- Use `migrations_paths` to isolate migrations per DB

### Connecting Models to Databases

Create an abstract base model for each custom DB:

```ruby
class AnimalsBase < ApplicationRecord
  self.abstract_class = true

  connects_to database: { writing: :animals, reading: :animals_replica }
end
```

For your default models:

```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  connects_to database: { writing: :primary, reading: :primary_replica }
end
```

If you're using legacy roles like `:readonly`, you can override them in your config:

```ruby
config.active_record.writing_role = :default
config.active_record.reading_role = :readonly
```

### Rails Tasks for Multi-DB

Rails ships with namespaced commands for each database:

```bash
rails db:create
rails db:create:animals
rails db:migrate
rails db:migrate:animals
rails db:migrate:status:animals
```

Each database uses its own migration directory. Use `--database` when generating migrations:

```bash
rails g migration CreateDogs name:string --database animals
```

### Automatic Connection Switching

Rails includes middleware that automatically routes reads/writes:

- Writes (POST/PUT/DELETE) use the **primary**
- Reads (GET/HEAD) use the **replica**, unless a recent write occurred

Enable it in `application.rb`:

```ruby
config.active_record.database_selector = { delay: 2.seconds }
config.active_record.database_resolver = ActiveRecord::Middleware::DatabaseSelector::Resolver
config.active_record.database_resolver_context = ActiveRecord::Middleware::DatabaseSelector::Resolver::Session
```

You can even write your own resolver if you want to control switching based on cookies, headers, etc.

### Manual Connection Switching

Use `connected_to` if you want explicit control:

```ruby
ActiveRecord::Base.connected_to(role: :reading) do
  # Read-only logic here
end
```

Passing an unknown role will raise an error, so make sure it matches your config.

### Caveats

- ❌ No native **sharding** support yet
- 🔀 No built-in **replica load balancing**
- 🚫 No **cross-database joins**
- 📦 You’ll need to manually load schema caches for each DB

### Links

- [Rails Multiple Databases Guide](https://guides.rubyonrails.org/v6.0/active_record_multiple_databases.html)
- [PR #36389 – Docs for multi-DB](https://github.com/rails/rails/pull/36389)
- [PR #34137 – Adds multi-db support to `db:migrate:status`](https://github.com/rails/rails/pull/34137)
- [PR #34052 – Adds basic connection switching API](https://github.com/rails/rails/pull/34052)

### Summary

Rails 6 makes scaling your app’s data layer far more manageable with built-in multi-DB tools. Whether you're separating concerns across domains or using replicas to reduce load, Rails now gives you a clean and consistent interface to do it all natively.
