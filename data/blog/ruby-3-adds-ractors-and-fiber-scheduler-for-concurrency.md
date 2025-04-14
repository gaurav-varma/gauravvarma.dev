---
title: Ruby 3.0 introduces Ractors and Fiber scheduler for real concurrency
createdAt: '2021-01-15'
excerpt: Ruby 3.0 adds Ractors and the Fiber scheduler, offering parallelism and non-blocking execution for modern Ruby apps.
categories:
  - Ruby
  - Ruby 3
---

Ruby 3.0 is a landmark release that brings the language closer to real concurrency with two significant additions: **Ractors** and the **Fiber scheduler**. These features aim to improve performance and scalability, all while preserving Ruby’s friendly syntax.

### Why concurrency matters

As applications scale and hardware becomes more multi-core, concurrency becomes crucial for performance. Ruby’s traditional thread-based model is limited by the Global VM Lock (GVL), making true parallel execution difficult. Ruby 3.0 introduces abstractions to overcome this.

### Ractors: Parallelism without thread-safety headaches

**Ractor** (short for "Ruby Actor") is a new concurrency abstraction that enables parallel execution without sharing mutable state.

Key features:

- Each Ractor has isolated memory.
- Communication is done via message passing.
- Designed to work around the GVL.

```ruby
r = Ractor.new { 1 + 2 }
puts r.take # => 3
```

Ractors introduce syntax restrictions to enforce safety, but allow Ruby code to run in true parallel threads.

### Fiber Scheduler: Lightweight, non-blocking I/O

**Fiber scheduler** provides a hookable API that allows libraries like `async` to intercept blocking operations such as sleep or I/O.

This enables cooperative multitasking, where operations yield control rather than block the thread.

```ruby
require 'async'
require 'net/http'

Async do
  ["https://ruby-lang.org", "https://rails.org"].each do |url|
    Async do
      Net::HTTP.get(URI(url))
    end
  end
end
```

This code performs multiple HTTP requests concurrently, using async fibers under the hood.

### Benefits

- Better CPU utilization on multi-core systems
- No more thread-safety concerns
- Improved performance for I/O-heavy workloads
- Works with gems like `async`, `falcon`, `net/http`, and more

### Status and compatibility

- Ractors are marked as experimental.
- Fiber scheduler is opt-in and requires compatible libraries.
- Both features are evolving rapidly, and more improvements are expected in Ruby 3.1+.

### Resources

- [Ruby 3.0.0 Release Notes](https://www.ruby-lang.org/en/news/2020/12/25/ruby-3-0-0-released/)
- [Fiber Scheduler Overview](https://bugs.ruby-lang.org/issues/16786)
- [Ractor documentation](https://github.com/ruby/ruby/blob/master/doc/ractor.md)

### Summary

Ruby 3.0 marks a turning point for concurrency. With Ractors enabling parallelism and Fiber scheduler unlocking non-blocking I/O, developers can write scalable, performant Ruby code while maintaining the joy and simplicity that makes Ruby shine.
