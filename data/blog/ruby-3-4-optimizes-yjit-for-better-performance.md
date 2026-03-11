---
title: Ruby 3.4 optimizes YJIT for better performance (memory and speed improvements)
createdAt: '2025-05-23'
excerpt: Ruby 3.4 improves YJIT with better memory efficiency and faster execution, continuing Ruby’s focus on improving runtime performance.
categories:
  - Ruby
  - Ruby 3.4
  - Performance
---

Ruby 3.4 introduces several improvements to **YJIT**, Ruby’s just-in-time compiler designed to improve execution speed while maintaining Ruby’s developer-friendly experience.

YJIT was first introduced to bring better runtime performance to Ruby without requiring major changes to application code. With Ruby 3.4, the YJIT engine becomes faster, more memory-efficient, and more stable.

These improvements continue Ruby’s long-term effort to make the language competitive with other high-performance runtimes while preserving its simplicity. Ruby 4.0 continues this work with the new [ZJIT compiler](/blog/ruby-4-0-introduces-zjit-and-ruby-box-isolated-namespaces) and further [Ractor](/blog/ruby-4-0-revamps-concurrency-with-ractor-improvements) enhancements.

---

### What is YJIT?

YJIT is a **Just-In-Time (JIT) compiler** designed specifically for Ruby.

Instead of interpreting Ruby code line-by-line, YJIT compiles frequently executed code paths into optimized machine code.

This reduces execution overhead and improves performance for many real-world workloads.

Unlike earlier Ruby JIT experiments, YJIT focuses on:

- low memory overhead
- fast startup
- compatibility with existing Ruby code

---

### Improvements in Ruby 3.4

Ruby 3.4 introduces several enhancements to YJIT.

Key improvements include:

- reduced memory usage
- faster code generation
- improved instruction caching
- better stability across workloads

These changes allow Ruby applications to benefit from performance gains without significantly increasing memory usage.

---

### Enabling YJIT

YJIT can be enabled when starting Ruby:

```bash
ruby --yjit app.rb
```

Rails applications can also enable YJIT in production environments.

Example:

```bash
RUBYOPT="--yjit" bundle exec rails server
```

Once enabled, Ruby automatically compiles frequently executed code paths.

---

### Example performance benefits

Applications that perform many repeated operations often benefit the most.

For example:

```ruby
100_000.times do
  [1,2,3].map { |n| n * 2 }
end
```

Loops, method calls, and object allocations can see noticeable improvements with YJIT enabled.

---

### Real-world impact

YJIT improvements benefit many Ruby workloads, including:

- Rails applications
- background job processing
- API servers
- data processing scripts

Because YJIT works automatically, most developers can benefit simply by enabling it.

---

### Links

- [Ruby 3.4.0 Released](https://www.ruby-lang.org/en/news/2024/12/25/ruby-3-4-0-released/)
- [ruby/ruby on GitHub](https://github.com/ruby/ruby)
- [YJIT docs for Ruby 3.4](https://docs.ruby-lang.org/en/3.4/yjit/yjit_md.html)

---

### Summary

Ruby 3.4 continues improving runtime performance with enhancements to YJIT. By reducing memory usage and improving execution speed, Ruby applications can run faster while keeping the same simple development experience.
