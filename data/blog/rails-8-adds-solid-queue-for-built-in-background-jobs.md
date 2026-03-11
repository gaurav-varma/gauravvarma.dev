---
title: Rails 8 adds Solid Queue for built-in background jobs (no Sidekiq/Redis needed)
createdAt: '2025-03-05'
excerpt: Rails 8 introduces Solid Queue, a built-in background job backend that runs jobs directly from the database without requiring Redis or external services.
categories:
  - Rails
  - Rails 8
  - Performance
---

Rails 8 introduces **Solid Queue**, a new database-backed backend for Active Job that allows background jobs to run without Redis, Sidekiq, or external queue systems. Solid Queue works well with other database-powered Rails infrastructure like [Solid Cache](/blog/rails-8-adds-solid-cache-for-built-in-html-fragment-caching) and [Solid Cable](/blog/rails-8-adds-solid-cable-for-built-in-websocket-pub-sub-support), and it underpins newer features such as [Active Job Continuations](/blog/rails-8-1-introduces-active-job-continuations).

Background jobs are essential for modern applications. Tasks like sending emails, processing uploads, or performing analytics often run asynchronously to keep web requests fast.

Traditionally, Rails apps relied on tools like **Sidekiq, Resque, or Delayed Job**. Most of these tools require Redis or other infrastructure.

Solid Queue provides a **native solution built directly into Rails**.

---

### What is Solid Queue?

Solid Queue is a **database-backed background job system** designed to work seamlessly with Active Job.

Instead of storing jobs in Redis, Solid Queue stores them in database tables and processes them using worker processes.

This allows Rails applications to run background jobs using only:

- Rails
- a relational database

No Redis required.

---

### Why Solid Queue?

Managing external job queues can increase operational complexity.

Solid Queue simplifies this by offering:

- built-in job persistence
- database-backed queues
- simple deployment
- easy monitoring

This aligns with Rails 8’s philosophy of reducing infrastructure requirements.

---

### Using Solid Queue

In most Rails 8 applications, Solid Queue is enabled by default.

Jobs can be defined using Active Job just like before.

```ruby
class SendWelcomeEmailJob < ApplicationJob
  queue_as :default

  def perform(user)
    UserMailer.welcome(user).deliver_now
  end
end
```

Enqueue a job:

```ruby
SendWelcomeEmailJob.perform_later(user)
```

Solid Queue stores and processes the job automatically.

---

### Running workers

Workers can be started with the Rails job runner:

```bash
bin/rails jobs:work
```

Rails will process queued jobs from the database.

---

### Example use cases

Solid Queue works well for many typical background tasks:

- sending emails
- processing uploads
- generating reports
- webhooks
- scheduled tasks

Large-scale job workloads may still prefer Redis-based queues, but Solid Queue works well for most Rails applications.

---

### Links

- [Rails 8.0 Release Notes](https://guides.rubyonrails.org/8_0_release_notes.html)
- [rails/rails on GitHub](https://github.com/rails/rails)
- [rails/solid_queue on GitHub](https://github.com/rails/solid_queue)

---

### Summary

Solid Queue brings background job processing directly into Rails using the database as the queue backend. By removing Redis dependencies, Rails 8 simplifies asynchronous processing and makes deploying Rails applications easier than ever.
