---
title: Rails 8 adds Solid Cable a database-backed ActionCable (no Redis needed)
createdAt: '2024-12-21'
excerpt: Rails 8 makes ActionCable more accessible by introducing Solid Cable a built-in database backed ActionCable, removing the Redis requirement for real-time features.
categories:
  - Rails
  - Rails 8
---

Rails 8 quietly revolutionizes real-time features with **Solid Cable**, a new database-backed adapter for ActionCable that eliminates the need for Redis.

### Why Solid Cable?

Before Rails 8, real-time updates via ActionCable typically required Redis as the pub/sub layer. But not every app needed that complexity. Solid Cable now lets you run ActionCable using just your existing database.

### How it Works

Solid Cable stores connection and subscription state in your database, and uses polling to check for new messages to broadcast. It’s fast enough for most use cases and especially helpful when keeping deployments lean.

In `cable.yml`, simply set the adapter to `solid_cable`:

```yaml
production:
  adapter: solid_cable
  connects_to:
    database:
      writing: cable
  polling_interval: 0.1.seconds
  message_retention: 1.day
```

You can configure:

- `polling_interval` – how often to check the DB (default: 0.1s)
- `message_retention` – how long to keep messages (default: 1 day)
- `autotrim` – whether to automatically delete old messages (default: true)

### Installation

For new Rails 8 apps, it’s already there. For older versions, you can add it manually:

```bash
bundle add solid_cable
bin/rails solid_cable:install
```

This sets up:

- The `config/cable.yml` file
- A cable-specific schema in `db/cable_schema.rb`

To use a separate database for Solid Cable (recommended), add the following to `config/database.yml`:

```yaml
production:
  primary:
    <<: *default
    database: app_production
  cable:
    <<: *default
    database: app_production_cable
    migrations_paths: db/cable_migrate
```

Then run:

```bash
RAILS_ENV=production bin/rails db:prepare
```

### Single Database Setup (Optional)

If you prefer to use just one DB:

- Copy the content of `db/cable_schema.rb` into a regular migration
- Delete `db/cable_schema.rb`
- Remove `connects_to` from `cable.yml`
- Run `bin/rails db:migrate`

### Performance and Use Cases

Solid Cable performs well under most conditions — even with polling — and supports MySQL, PostgreSQL, and SQLite. It’s ideal for:

- Apps with **moderate real-time usage**
- Deployments on **Heroku**, **Fly.io**, or **serverless**
- Teams looking to reduce external dependencies

If you're building high-frequency features like chat apps or live games, Redis may still offer better throughput. But for dashboards, notifications, or UI updates, Solid Cable is more than capable.

You can even turn off `autotrim` and manually manage old messages using:

```ruby
SolidCable::TrimJob.perform_later
```

### References

- [Rails PR #52889 – Adds Solid Cable](https://github.com/rails/rails/pull/52889)
- [Rails Solid Cable Overview](https://youtu.be/bOlrHbhLzZE?si=d2csp5fzNj2tt6as)
- [Solid Cable - A database backed ActionCable adapter ](https://github.com/rails/solid_cable)

### Summary

Solid Cable makes real-time Rails easier than ever—no Redis required. It's a built-in, production-ready solution for teams who want modern UI updates without extra services or deployment complexity.
