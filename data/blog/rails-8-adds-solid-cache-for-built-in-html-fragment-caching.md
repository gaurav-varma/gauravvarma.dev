---
title: Rails 8 adds Solid Cache for built-in HTML fragment caching (no Redis needed)
createdAt: '2025-02-26'
excerpt: Rails 8 introduces Solid Cache, a database-backed caching system designed to replace Redis or Memcached for many Rails caching workloads.
categories:
  - Rails
  - Rails 8
  - Performance
---

Rails 8 introduces **Solid Cache**, a new caching backend designed to store cached data directly in your application database. Rails 8 also ships related database-backed infrastructure like [Solid Queue](../rails-8-adds-solid-queue-for-built-in-background-jobs) for background jobs and [Solid Cable](../rails-8-adds-solid-cable-for-built-in-websocket-pub-sub-support) for real-time messaging.

Caching has always been a critical part of building fast Rails applications. Traditionally, Rails apps relied on external systems like **Redis or Memcached** to store cached fragments, query results, and other temporary data.

Solid Cache changes this by offering a **database-backed cache store**, allowing many applications to run without external cache infrastructure.

---

### What is Solid Cache?

Solid Cache is a new cache store implementation that stores cached entries inside the Rails application's database.

It works similarly to Redis-based caching but uses database tables to manage cached values.

This allows developers to use caching without running additional services.

---

### Why Solid Cache?

While Redis is powerful, it introduces operational complexity:

- separate server
- infrastructure management
- monitoring
- scaling concerns

Solid Cache provides a simpler alternative for many apps.

Benefits include:

- no extra infrastructure
- transactional consistency
- easier deployments
- simplified development environments

For smaller applications or self-hosted deployments, this is a significant improvement.

---

### Enabling Solid Cache

To configure Solid Cache, update the Rails environment configuration:

```ruby
config.cache_store = :solid_cache_store
```

Rails will automatically handle cache storage using the database.

---

### Example fragment caching

Fragment caching works the same way as before:

```erb
<% cache @article do %>
  <%= render @article %>
<% end %>
```

Rails stores the cached content using Solid Cache instead of Redis.

---

### Example use cases

Solid Cache works well for many Rails caching scenarios:

- fragment caching
- view caching
- API response caching
- expensive query results
- computed statistics

For very high traffic applications, Redis may still offer better throughput. However, Solid Cache works well for most typical Rails apps.

---

### Links

- [Rails 8.0 Release Notes](https://guides.rubyonrails.org/8_0_release_notes.html)
- [rails/rails on GitHub](https://github.com/rails/rails)
- [rails/solid_cache on GitHub](https://github.com/rails/solid_cache)

---

### Summary

Solid Cache simplifies caching in Rails by allowing applications to store cached data directly in the database. By removing the need for Redis or Memcached, Rails 8 makes high-performance caching easier to deploy and maintain.
