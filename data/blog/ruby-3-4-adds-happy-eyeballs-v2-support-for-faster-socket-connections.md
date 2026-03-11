---
title: Ruby 3.4 adds Happy Eyeballs v2 support for faster socket connections
createdAt: '2025-05-10'
excerpt: Ruby 3.4 adds Happy Eyeballs v2 support to the socket library, improving connection speed and reliability when resolving IPv4 and IPv6 addresses.
categories:
  - Ruby
  - Ruby 3.4
  - Networking
---

Ruby 3.4 introduces support for **Happy Eyeballs Version 2** in the standard socket library. This improvement makes network connections faster and more reliable when connecting to servers that support both IPv4 and IPv6.

Many modern networks expose both address types, but establishing a connection can sometimes be slow if the system tries one protocol first and it fails or stalls. Happy Eyeballs solves this by attempting connections in parallel.

With this addition, Ruby applications that open outbound connections—such as HTTP clients, API integrations, and microservices—can establish connections more quickly and reliably. These networking improvements complement runtime work in [YJIT](/blog/ruby-3-4-optimizes-yjit-for-better-performance) and concurrency features like [Ractors](/blog/ruby-4-0-revamps-concurrency-with-ractor-improvements).

---

### What is Happy Eyeballs?

Happy Eyeballs is a networking algorithm designed to reduce delays when connecting to dual-stack servers that support both IPv6 and IPv4.

Normally, a client resolves both addresses but tries them sequentially:

1. Attempt IPv6
2. If that fails, fall back to IPv4

If the IPv6 route is slow or broken, this can introduce noticeable delays.

Happy Eyeballs solves this by **attempting connections to both addresses with a short delay between them**, selecting whichever succeeds first.

---

### Happy Eyeballs v2 improvements

Version 2 of the algorithm improves on the original design defined in RFC 6555. The newer version (RFC 8305) provides:

- better connection scheduling
- reduced network congestion
- faster fallback behavior
- improved reliability on dual-stack networks

Ruby 3.4 now integrates this logic directly into the socket library.

---

### Example: opening a TCP connection

Applications using Ruby’s socket APIs benefit automatically.

```ruby
require "socket"

socket = TCPSocket.new("example.com", 80)
socket.puts "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n"
```

If both IPv4 and IPv6 addresses exist for the host, Ruby will attempt the connections using the Happy Eyeballs strategy.

---

### Where this matters

Happy Eyeballs primarily benefits applications that frequently open outbound connections, including:

- HTTP clients
- API integrations
- microservices
- background jobs calling external services
- network utilities

Developers typically do not need to change any code to benefit from this improvement.

---

### Real-world impact

For most applications the improvement is subtle but important.

Benefits include:

- faster API requests
- fewer connection delays
- improved reliability in mixed IPv4/IPv6 environments
- better user experience for network-heavy apps

These improvements are particularly useful for distributed systems that rely heavily on external services.

---

### Links

- [Ruby 3.4.0 Released](https://www.ruby-lang.org/en/news/2024/12/25/ruby-3-4-0-released/)
- [ruby/ruby on GitHub](https://github.com/ruby/ruby)
- [Happy Eyeballs v2 PR](https://github.com/ruby/ruby/pull/11653)

---

### Summary

Ruby 3.4 improves networking performance by implementing the Happy Eyeballs v2 algorithm. By intelligently attempting IPv4 and IPv6 connections in parallel, Ruby applications can establish network connections faster and more reliably without any code changes.
