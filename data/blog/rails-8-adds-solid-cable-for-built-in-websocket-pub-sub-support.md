---
title: Rails 8 adds Solid Cable for built-in WebSocket pub/sub support
createdAt: '2025-02-14'
excerpt: Rails 8 introduces Solid Cable, a built-in WebSocket pub/sub adapter that replaces Redis-based ActionCable setups with a database-backed solution.
categories:
  - Rails
  - Rails 8
  - Performance
---

Rails 8 introduces **Solid Cable**, a new built-in pub/sub backend for Action Cable that removes the need for Redis when building real-time features. Solid Cable works alongside other database-backed infrastructure like [Solid Cache](../rails-8-adds-solid-cache-for-built-in-html-fragment-caching) and [Solid Queue](../rails-8-adds-solid-queue-for-built-in-background-jobs) to reduce external dependencies.

For years, Rails applications relied on **Redis** to power WebSocket broadcasting. While Redis works well, it adds operational overhead for smaller apps and teams. Solid Cable simplifies this by using your **database as the message bus**, allowing developers to run real-time Rails apps without external infrastructure.

This continues a broader Rails 8 theme: **reducing dependency on external services** while keeping applications scalable.

---

### What is Solid Cable?

Solid Cable is a **database-backed Action Cable adapter** designed to replace Redis for WebSocket pub/sub messaging.

Instead of publishing messages through Redis channels, Solid Cable stores messages in database tables and distributes them to connected clients.

This means a standard Rails deployment can support real-time features using only:

- Rails
- a relational database
- Action Cable

No Redis required.

---

### Why Solid Cable?

Traditional Action Cable setups required running Redis alongside Rails.

That setup works well for large-scale deployments, but it introduces extra infrastructure for smaller applications.

Solid Cable offers several benefits:

- Removes the Redis dependency
- Simplifies deployment environments
- Uses transactional database guarantees
- Works well for moderate real-time workloads

For many SaaS applications, this makes real-time features significantly easier to operate.

---

### How to enable Solid Cable

To use Solid Cable, configure the Action Cable adapter:

```yaml
# config/cable.yml

production:
  adapter: solid_cable
```

Once enabled, Rails automatically handles pub/sub messaging through the database.

### Broadcasting example

Broadcasting still works exactly like a traditional Action Cable setup:

```ruby
ActionCable.server.broadcast(
  "messages",
  { body: "Hello from Rails 8" }
)
```

Connected clients subscribed to the `messages` stream will immediately receive the payload over WebSockets.

### Summary

Solid Cable makes real-time Rails applications easier to deploy by removing Redis from the default Action Cable stack. By using the database as a pub/sub backend, Rails 8 simplifies infrastructure while still supporting powerful WebSocket-driven features.
