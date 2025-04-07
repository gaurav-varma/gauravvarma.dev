---
title: Rails 7.1 adds perform_all_later to enqueue multiple jobs at once
createdAt: '2023-10-13'
excerpt: Rails 7.1 introduces `perform_all_later`, allowing developers to enqueue multiple jobs in one go—optimized for speed, reduced Redis traffic, and better bulk job control.
categories:
  - Rails
  - Rails 7.1
  - ActiveJob
---

Rails 7.1 introduces `perform_all_later`—a new method in ActiveJob that lets you enqueue multiple jobs at once. This is especially useful when dispatching a high volume of background tasks, where traditional approaches could overwhelm your queue adapter.

### The problem with enqueuing many jobs individually

Previously, enqueuing jobs looked like this:

```ruby
User.find_each do |user|
  EmailNotificationJob.perform_later(user.id)
end
```

This approach is fine for small datasets, but under the hood, each `perform_later` makes a separate round trip to your queue backend (like Redis if you're using Sidekiq), which becomes inefficient at scale.

### The `perform_all_later` upgrade

Rails 7.1 now gives us:

```ruby
ActiveJob.perform_all_later([job1, job2, job3])
```

This bulk API reduces Redis chatter by utilizing the `push_bulk` feature (where supported, e.g., by Sidekiq), cutting down enqueuing time significantly.

### Real-world usage

```ruby
email_notification_jobs = users.map do |user|
  EmailNotificationJob.new(user.id)
end

ActiveJob.perform_all_later(email_notification_jobs)
```

You can also add scheduling per job:

```ruby
email_notification_jobs = users.map.with_index do |user, index|
  EmailNotificationJob.new(user.id).set(wait: index.seconds)
end

ActiveJob.perform_all_later(email_notification_jobs)
```

It even supports different job classes:

```ruby
ActiveJob.perform_all_later([
  EmailNotificationJob.new(user.id),
  SignUpNotificationJob.new(user.id)
])
```

### What to keep in mind

- If your queue adapter doesn’t support bulk enqueuing, Rails will fall back to enqueuing jobs one by one.
- No callbacks (like `before_enqueue`, `before_perform`, etc.) are run for these jobs.
- Returns `nil` instead of a job object.
- Internally uses a new event: `enqueue_all.active_job`.

### References

- [PR #46603 - Adds perform_all_later](https://github.com/rails/rails/pull/46603)
- [Rails 7.1 Release Notes](https://guides.rubyonrails.org/7_1_release_notes.html#add-perform-all-later-to-enqueue-multiple-jobs-at-once)

### Summary

`perform_all_later` is a clean and powerful API for batching background jobs. It's perfect for sending thousands of notifications, onboarding flows, or any scenario where multiple jobs need to be queued efficiently.

You get:

- Reduced latency
- Less Redis traffic
- Cleaner code

Another small but mighty addition in Rails 7.1 that makes a big difference at scale.
