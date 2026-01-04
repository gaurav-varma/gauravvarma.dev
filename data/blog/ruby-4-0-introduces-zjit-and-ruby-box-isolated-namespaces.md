---
title: Ruby 4.0 introduces ZJIT (new JIT compiler) and Ruby::Box isolated namespaces
createdAt: '2026-01-04'
excerpt: Ruby 4.0 introduces ZJIT, a next-generation JIT compiler, and Ruby::Box for isolated namespaces that improve performance and modularity.
categories:
  - Ruby
  - Ruby 4.0
  - Performance
---

Ruby 4.0 introduces **ZJIT**, a next-generation just-in-time compiler designed to improve runtime performance. The release also includes **Ruby::Box**, a new feature for creating isolated namespaces within Ruby applications. ZJIT builds on earlier work in [YJIT](../ruby-3-4-optimizes-yjit-for-better-performance) and pairs well with concurrency improvements in [Ractors](../ruby-4-0-revamps-concurrency-with-ractor-improvements).

Together, these additions represent a significant step forward in Ruby’s performance and modular architecture.

While Ruby has long focused on developer productivity, recent versions have placed increased emphasis on improving runtime performance and scalability.

---

### What is ZJIT?

ZJIT is a **new just-in-time compiler** designed as the successor to YJIT.

Just-in-time compilers speed up programs by converting frequently executed Ruby code into optimized machine code during runtime.

ZJIT builds on lessons learned from earlier JIT implementations while focusing on:

- better optimization
- improved memory efficiency
- faster code execution

---

### Enabling ZJIT

Ruby 4.0 allows developers to enable ZJIT using a command-line flag.

Example:

```bash
ruby --zjit app.rb
```

When enabled, Ruby compiles frequently executed code paths into machine instructions.

---

### What is Ruby::Box?

Ruby 4.0 also introduces **Ruby::Box**, a new system for creating isolated namespaces.

Large applications often need to isolate parts of their runtime environment. Ruby::Box allows code to run inside a separate namespace where constants and modules are isolated from the global environment.

---

### Example Ruby::Box usage

Example:

```ruby
box = Ruby::Box.new

box.eval do
  class Example
  end
end
```

Classes defined inside the box are isolated from the global namespace.

---

### Why isolated namespaces matter

Namespace isolation can help with:

- plugin systems
- sandboxed environments
- multi-tenant architectures
- embedding Ruby in other systems

It allows applications to safely run code without polluting the global constant space.

---

### Real-world impact

Ruby 4.0’s new features benefit many types of applications:

- high-performance APIs
- large Rails applications
- embedded Ruby runtimes
- plugin-based systems

ZJIT improves runtime speed, while Ruby::Box provides better architectural flexibility.

---

### Links

- [Ruby 4.0.0 Released](https://www.ruby-lang.org/en/news/2025/12/25/ruby-4-0-0-released/)
- [Ruby 4.0 NEWS](https://docs.ruby-lang.org/en/4.0/NEWS_md.html)
- [ruby/ruby on GitHub](https://github.com/ruby/ruby)

---

### Summary

Ruby 4.0 introduces ZJIT and Ruby::Box to improve both runtime performance and application architecture. These additions help Ruby applications run faster while enabling better isolation and modular design.
