---
title: Rails 5.2 adds built-in Redis Cache Store support
createdAt: '2018-04-18'
excerpt: Rails 5.2 adds a new built-in Redis cache store, enabling developers to use Redis directly as a cache backend without external gems.
categories:
  - Rails
  - Rails 5.2
---

Rails 5.2 introduced native support for using Redis as a cache store with the `:redis_cache_store` option. Prior to this, developers relied on third-party gems to integrate Redis caching into Rails.

### Why Redis?

Redis is an in-memory key-value store known for its speed, simplicity, and robustness, making it a great fit for caching.

### How to configure

In `config/environments/production.rb`:

```ruby
config.cache_store = :redis_cache_store, {
  url: ENV['REDIS_URL'],
  namespace: 'cache'
}
```

You can also configure options like expiration, compression, and error handling.

### Features

- JSON and Marshal serialization
- Automatic connection pooling
- Fallbacks and rescue strategies
- Namespaced keys

### Example usage

```ruby
Rails.cache.fetch('expensive-operation', expires_in: 12.hours) do
  perform_expensive_task
end
```

### Links

- [PR #31134 - Adds Built-in Redis cache store](https://github.com/rails/rails/pull/31134)
- [Rails documentation for Redis Cache Store](https://api.rubyonrails.org/v5.2/classes/ActiveSupport/Cache/RedisCacheStore.html)

### Summary

With native Redis support, Rails developers can take advantage of Redis' powerful caching features without needing extra gems or manual wiring. It’s fast, clean, and production-ready.
