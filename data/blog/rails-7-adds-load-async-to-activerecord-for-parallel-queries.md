---
title: Rails 7 adds load_async to ActiveRecord for parallel queries
createdAt: '2021-12-23'
excerpt: Rails 7 adds `load_async` to ActiveRecord, enabling multiple queries to run in parallel via background threads.
categories:
  - Rails
  - Rails 7
---

Rails 7 adds `load_async`, a new ActiveRecord method that schedules SQL queries to run on a background thread pool. This allows independent queries to be executed in parallel—saving time, reducing I/O wait, and improving controller performance.

### Why it matters

In many Rails controllers, we often load multiple unrelated datasets:

```ruby
@car_types = CarType.all
@cars = Car.order(released_at: :desc)
```

These queries are executed sequentially, which means we spend time waiting on each I/O operation one after another. If each query takes 50ms, that’s 100ms total. But if performed in parallel, we could reduce that to 50ms.

### Before Rails 7

A naive attempt might involve spinning up a raw thread:

```ruby
car_types_future = Thread.new { CarType.all.to_a }
@cars = Car.order(released_at: :desc).to_a
@car_types = car_types_future.value
```

But this introduces all sorts of thread-safety concerns, especially around `CurrentAttributes`, ActiveSupport instrumentation, and request-local state. It's brittle and hard to manage.

### The Rails 7 approach

Now with `load_async`, you can do:

```ruby
@car_types = CarType.all.load_async
@cars = Car.order(released_at: :desc).load_async
```

Each query runs in a background thread from a dedicated pool. When you access the result later, Rails ensures the query has completed—either in the background or, if necessary, in the foreground.

The actual instantiation of models still happens on the main thread, so there's no risk of thread-safety issues with Rails internals.

### Summary

`load_async` makes it effortless to overlap I/O for unrelated database queries in your controllers. It’s a simple yet powerful way to improve responsiveness in Rails apps—no thread hacks, no extra gems, just built-in Rails magic. Check out this [Pull Request](https://github.com/rails/rails/pull/41372) for more details.
