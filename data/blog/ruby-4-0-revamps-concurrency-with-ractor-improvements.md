---
title: 'Ruby 4.0 revamps concurrency with new Ractor improvements (including Ractor::Port)'
createdAt: '2026-01-19'
excerpt: Ruby 4.0 introduces several improvements to Ractors, including Ractor::Port, making concurrent programming easier and more scalable.
categories:
  - Ruby
  - Ruby 4.0
  - Concurrency
---

Ruby 4.0 introduces several improvements to **Ractors**, Ruby’s concurrency model designed for safe parallel execution without shared mutable state. These changes complement Ruby’s JIT work in [YJIT](/blog/ruby-3-4-optimizes-yjit-for-better-performance) and [ZJIT](/blog/ruby-4-0-introduces-zjit-and-ruby-box-isolated-namespaces) to improve both concurrency and raw performance.

The update includes a new abstraction called **Ractor::Port**, which simplifies communication between Ractors.

These improvements aim to make concurrent Ruby applications easier to write and scale across multiple CPU cores.

---

### What are Ractors?

Ractors were introduced to enable true parallelism in Ruby.

Unlike traditional threads, Ractors avoid shared mutable state. Each Ractor operates independently and communicates with others using message passing.

Example:

```ruby
r = Ractor.new do
  puts "Hello from another Ractor"
end

r.take
```

Each Ractor runs in parallel with others.

---

### Introducing Ractor::Port

Ruby 4.0 introduces **Ractor::Port**, a new abstraction for managing communication between Ractors.

Ports provide structured channels that simplify sending and receiving messages between concurrent components.

Example concept:

```ruby
port = Ractor::Port.new

Ractor.new(port) do |p|
  p.send("message")
end
```

Ports help coordinate communication between multiple Ractors more efficiently.

---

### Why improve Ractors?

Concurrent programming can be difficult to manage.

Ractor improvements aim to:

- simplify message passing
- improve concurrency patterns
- make parallel programming easier
- reduce synchronization complexity

These changes make Ractors more practical for real-world applications.

---

### Example use cases

Ractors are useful for workloads that benefit from parallel execution:

- data processing
- background task execution
- streaming pipelines
- CPU-intensive computations

With improved messaging abstractions, Ruby applications can scale better across multiple cores.

---

### Links

- [Ruby 4.0.0 Released](https://www.ruby-lang.org/en/news/2025/12/25/ruby-4-0-0-released/)
- [Ruby 4.0 NEWS](https://docs.ruby-lang.org/en/4.0/NEWS_md.html)
- [Ractor::Port docs](https://docs.ruby-lang.org/en/4.0/Ractor/Port.html)
- [ruby/ruby on GitHub](https://github.com/ruby/ruby)

---

### Summary

Ruby 4.0 enhances its concurrency model with improvements to Ractors and the introduction of Ractor::Port. These updates make parallel programming in Ruby easier to manage while enabling better performance on multi-core systems.
