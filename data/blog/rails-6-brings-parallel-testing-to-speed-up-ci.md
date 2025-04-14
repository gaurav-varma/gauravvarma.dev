---
title: Rails 6 brings parallel testing to speed up CI
createdAt: '2019-08-29'
excerpt: Rails 6 introduces built-in parallel test execution, reducing CI times significantly by running tests across multiple processes.
categories:
  - Rails
  - Rails 6
---

Rails 6 adds built-in **parallel testing**, allowing test suites to run across multiple CPUs or processes simultaneously.

### Why parallel tests?

As projects grow, test suites can become slow. By distributing tests across CPUs, parallel testing improves feedback time and productivity.

### How to enable it

```bash
rails test:parallel
```

This automatically splits the test suite into multiple workers.

You can customize the number of workers:

```bash
PARALLEL_WORKERS=4 rails test:parallel
```

### Links

- [PR #31900 - Adds Parallel testing](https://github.com/rails/rails/pull/31900)
- [Rails Documentation for Parallel Testing](https://guides.rubyonrails.org/testing.html#parallel-testing)

### Summary

Rails 6’s parallel testing feature helps developers ship faster by speeding up test feedback. It’s easy to set up and works out of the box with Minitest.
