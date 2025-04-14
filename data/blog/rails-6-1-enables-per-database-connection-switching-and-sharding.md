---
title: Rails 6.1 enables per-database connection switching & sharding
createdAt: '2020-12-15'
excerpt: Rails 6.1 enhances multi-database support with fine-grained connection switching and horizontal sharding, giving developers more control over read/write routing across databases.
categories:
  - Rails
  - Rails 6.1
---

Rails 6.1 introduces powerful upgrades to multi-database setups — including **per-database role switching** and **horizontal sharding**, giving you more precise control over where and how queries are executed.

### Background

Rails already supported multiple databases with support for roles like `writing` and `reading`. But until now, switching between those roles applied _globally_ — affecting **all** connections across all databases.

### What’s New in Rails 6.1?

- Role and shard switching can now be applied **per connection class** (instead of globally).
- You can route queries independently across shards and replicas for each database.

To enable this, set the following config in `application.rb`:

```ruby
config.active_record.legacy_connection_handling = false
```

### Example Setup

```yaml
production:
  primary:
    database: primary_database
  primary_replica:
    database: primary_database
    replica: true
  primary_shard_one:
    database: primary_shard_one
  primary_shard_one_replica:
    database: primary_shard_one
    replica: true

  vehicles:
    database: vehicles_database
  vehicles_replica:
    database: vehicles_database
    replica: true
  vehicles_shard_one:
    database: vehicles_shard_one
  vehicles_shard_one_replica:
    database: vehicles_shard_one
    replica: true
```

### Model Structure

```ruby
# Primary DB base class
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  connects_to shards: {
    default: { writing: :primary, reading: :primary_replica },
    shard_one: { writing: :primary_shard_one, reading: :primary_shard_one_replica }
  }
end

# Vehicles DB base class
class VehiclesRecord < ApplicationRecord
  self.abstract_class = true

  connects_to shards: {
    default: { writing: :vehicles, reading: :vehicles_replica },
    shard_one: { writing: :vehicles_shard_one, reading: :vehicles_shard_one_replica }
  }
end

class User < ApplicationRecord; end
class Car < VehiclesRecord; end
```

### Behavior: Before vs After

With `legacy_connection_handling = true` (old behavior):

```ruby
ApplicationRecord.connected_to(role: :reading, shard: :shard_one) do
  User.first # hits shard_one
  Car.first  # hits shard_one
end
```

With `legacy_connection_handling = false` (new behavior):

```ruby
VehiclesRecord.connected_to(role: :reading, shard: :shard_one) do
  User.first # still hits primary replica
  Car.first  # hits vehicles_shard_one
end
```

Each abstract class manages its own connection context!

### When to Use

- You have multiple databases with different sharding or replica strategies.
- You want to avoid side effects of global connection switching.
- You want queries to go to the _correct database/shard_ even when deeply nested.

### Summary

Rails 6.1 lets you **switch roles and shards per database**, making horizontal scaling and data isolation easier than ever. It’s a great addition for apps with growing data or high-performance needs.

For more details, check out the [PR #40370](https://github.com/rails/rails/pull/40370).
