---
title: Rails 8.1 introduces Active Job Continuations to resume long-running jobs
createdAt: '2025-11-03'
excerpt: Rails 8.1 introduces Active Job Continuations, allowing background jobs to pause and resume execution across multiple steps.
categories:
  - Rails
  - Rails 8.1
  - Active Job
---

Rails 8.1 introduces **Active Job Continuations**, a new feature that allows background jobs to pause execution and resume later while maintaining their internal state. Rails 8 background jobs now commonly run on [Solid Queue](/blog/rails-8-adds-solid-queue-for-built-in-background-jobs), and continuations pair well with [Structured Event Reporting](/blog/rails-8-1-adds-structured-event-reporting) for tracking multi-step workflows.

Many background tasks require multiple steps or depend on external events. Previously, developers often had to break these workflows into separate jobs and manually manage state between them.

Active Job Continuations provide a cleaner solution by allowing jobs to **resume execution from where they left off**.

---

### Why job continuations?

Complex workflows often involve:

- multiple background tasks
- external API calls
- asynchronous processing
- long-running operations

Managing these workflows can become difficult when jobs need to wait for other operations to complete.

Active Job Continuations simplify this by allowing a job to pause and resume later.

---

### Example job workflow

Consider a background job that processes a large dataset in stages.

```ruby
class ImportUsersJob < ApplicationJob
  def perform(file_id)
    process_file(file_id)
    wait_for_validation
    finalize_import
  end
end
```

With continuations, the job can pause after certain steps and resume when the next stage is ready.

---

### How continuations work

Continuations allow a job to **yield control and resume later** while preserving context.

Internally, Rails stores the job state and resumes execution when the continuation is triggered.

This makes complex background workflows easier to write and maintain.

---

### Example use cases

Active Job Continuations are useful for:

- multi-step data imports
- asynchronous API workflows
- background pipelines
- external service callbacks
- large batch processing tasks

Developers no longer need to manually coordinate multiple jobs.

---

### Integration with job backends

Active Job Continuations work with supported job backends such as:

- Solid Queue
- Sidekiq
- other Active Job adapters

This ensures compatibility with existing background job infrastructure.

---

### Links

- [Rails 8.1 Release Notes](https://guides.rubyonrails.org/8_1_release_notes.html)
- [rails/rails on GitHub](https://github.com/rails/rails)

---

### Summary

Active Job Continuations make complex background workflows easier to implement by allowing jobs to pause and resume execution. With this feature, Rails 8.1 provides a more flexible and powerful approach to background processing.
