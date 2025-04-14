---
title: Ruby 2.6 ships an experimental JIT compiler for speed
createdAt: '2019-01-05'
excerpt: Ruby 2.6 introduces an experimental Just-In-Time compiler to boost performance, a major step in Ruby’s journey toward faster execution.
categories:
  - Ruby
  - Ruby 2.6
  - Performance
---

Ruby 2.6 ships with **MJIT (Method-based Just-In-Time compiler)** – a major performance milestone under the **Ruby 3x3** initiative aiming to make Ruby 3.0 3x faster than 2.0.

### What is the JIT?

The JIT compiler attempts to speed up Ruby programs by compiling Ruby code into native machine code at runtime. This reduces the overhead of interpretation, especially in compute-heavy programs.

### How to enable it

```bash
ruby --jit your_script.rb
```

Or set the environment variable:

```bash
RUBYOPT="--jit"
```

There are also flags for fine-tuning:

```bash
--jit-verbose=1         # See verbose compilation logs
--jit-wait              # Block execution until JIT compiles
--jit-min-calls=5       # Lower threshold for compilation
--jit-save-temps        # Keep compiled C files
```

### When Does It Help?

JIT gives noticeable performance benefits when your code includes:

- Heavy CPU-bound loops
- Repeated method calls
- Long-running or benchmarked workloads

It won’t help I/O-bound apps and may slow down short-lived scripts due to compilation overhead.

### Real World Example

A simple benchmark comparing MJIT with and without:

```ruby
# mjit.rb
require 'benchmark'

puts Benchmark.measure {
  def test_loop
    i = 0
    while i < 400_000_000
      i += 1
    end
  end

  10.times { test_loop }
}
```

Run it:

```bash
ruby --jit --jit-verbose=1 --disable-gems mjit.rb
```

Once the JIT kicks in after the 5th iteration (default threshold), performance improves dramatically — from ~0.45s to ~0.10s.

### JIT and Rails?

While MJIT shows promise in benchmarks, enabling it in Rails apps doesn’t yet yield big performance wins. Use:

```bash
RUBYOPT="--jit" bundle exec rails s
```

Benchmark carefully — gains may vary depending on app behavior and duration.

### MJIT: Present and Future

- Still **experimental** in Ruby 2.6
- Doesn’t work on Windows
- Needs more maturity and optimizations
- May adopt **LLVM** or **GCC** as backends

MJIT will continue to evolve in Ruby 2.7, 3.0 and beyond — paving the way for the performance-focused Ruby 3x3 vision.

### Resources

- [Ruby 2.6 Release Notes](https://www.ruby-lang.org/en/news/2018/12/25/ruby-2-6-0-released/)
- [MJIT Introduction by Vladimir Makarov](https://www.youtube.com/watch?v=qpZDw-p9yag&t=1655s)
- [Ruby 3x3 Performance Goal](https://developers.redhat.com/blog/2018/03/22/ruby-3x3-performance-goal)

### Summary

Ruby 2.6’s MJIT is a leap forward for performance-conscious Ruby developers. While not yet production-ready for every use case, it lays the groundwork for faster Ruby in the years ahead. Try it in compute-heavy scripts and join the performance journey.
