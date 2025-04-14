---
title: Ruby 3.1 integrates YJIT compiler for faster execution
createdAt: '2022-01-10'
excerpt: Ruby 3.1 ships with YJIT, a new JIT compiler built by Shopify that improves performance for real-world Ruby apps.
categories:
  - Ruby
  - Ruby 3.1
  - Performance
---

Ruby 3.1 introduces **YJIT** (Yet Another Ruby JIT), an **in-process just-in-time compiler** developed by Shopify, designed to boost performance for real-world Ruby applications—especially Rails.

### What is YJIT?

- Built directly into CRuby
- Uses Basic Block Versioning (BBV)
- Optimizes Ruby code incrementally, compiling only what’s needed
- Targets fast warm-up and real-world speedups
- Currently experimental and supported only on Unix-like x86-64 platforms

YJIT compiles Ruby bytecode to native machine code dynamically, giving us the speed of compiled code with the flexibility of interpretation.

### How to enable YJIT

YJIT is **disabled by default**. To turn it on:

```bash
ruby --yjit your_app.rb
```

Or check if your Ruby version supports it:

```bash
ruby --enable-yjit -v
```

### Real-world Performance

Benchmarks from the YJIT team show:

- 🚀 20% speedup on railsbench
- 🚀 37% improvement on ActiveRecord-heavy queries
- 🚀 39% boost on liquid template rendering

These wins are achieved **without any code changes**—just enable the flag.

### Example

```bash
RUBY_YJIT_ENABLE=1 ruby --yjit app.rb
```

Once enabled, your Ruby code benefits from just-in-time optimizations behind the scenes, especially in long-running apps.

### How YJIT works

YJIT starts by compiling just the beginning of a method (lazy BBV), and compiles more as it learns the types of values being passed around. This makes it fast to start and adaptive over time.

Unlike MJIT (Ruby’s older method-based compiler), YJIT doesn’t rely on an external C compiler and avoids the compilation latency that held MJIT back in production workloads.

### TL;DR: YJIT vs MJIT vs TenderJIT

```code
| Feature       | YJIT             | MJIT             | TenderJIT           |
|---------------|------------------|------------------|---------------------|
| Compiler Type | Basic Block JIT  | Method-based JIT | Ruby-based JIT (WIP)|
| Platform      | x86-64 only      | Cross-platform   | Experimental        |
| Use Case      | Real-world apps  | Benchmarks       | Research/Exploration|
| In-process    | Yes              | No(uses C compiler)| Yes               |
```

### Summary

YJIT is a huge step forward for Ruby performance. With fast warmup, real-world optimization, and seamless integration into CRuby, Ruby 3.1 becomes faster with no extra work for developers.

Just add `--yjit` and enjoy the speed boost.

### References

- [Shopify: YJIT architecture deep dive](https://shopify.engineering/yjit-just-in-time-compiler-cruby)
- [Ruby Proposal to merge YJIT](https://bugs.ruby-lang.org/issues/18229)
- [Ruby 3.1 release notes](https://www.ruby-lang.org/en/news/2021/12/25/ruby-3-1-0-released/)
