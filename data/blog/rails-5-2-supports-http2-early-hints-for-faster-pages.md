---
title: Rails 5.2 supports HTTP/2 Early Hints for faster pages
createdAt: '2018-04-21'
excerpt: Rails 5.2 adds support for HTTP/2 Early Hints to speed up page loading by preloading assets before the full response is ready.
categories:
  - Rails
  - Rails 5.2
  - Performance
---

Rails 5.2 includes support for **HTTP/2 Early Hints**, an optimization technique that allows the server to send preload instructions to the browser before the full response is ready.

### What are Early Hints?

With HTTP/2, servers can send a status code `103 Early Hints` to suggest which assets the browser should start preloading. This can improve perceived performance by beginning asset fetching early.

### How it works in Rails

If you're using a server that supports Early Hints (like Puma + NGINX with proper configuration), Rails 5.2 can automatically send headers like:

```http
Link: </stylesheets/application.css>; rel=preload; as=style
```

This happens while the server is still rendering the page.

### Enable it

Early Hints are sent automatically when:

- The app is running in production
- The web server supports forwarding 103 headers
- `config.public_file_server.headers` is properly configured

To start the server with Early Hints enabled pass `--early-hints` like this:

```bash
bin/rails server --early-hints
```

### Links

- [PR #30744 - Adds HTTP/2 Early Hints for Rails](https://github.com/rails/rails/pull/30744)
- [Documentation for HTTP/2 Early Hints](https://datatracker.ietf.org/doc/html/rfc8297)

### Summary

Early Hints is a performance enhancement that takes advantage of modern browser capabilities and HTTP/2 features. Rails 5.2 makes this cutting-edge optimization available with minimal setup.
