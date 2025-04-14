---
title: Rails 7.1 tags database queries with SQLCommenter for debugging
createdAt: '2023-11-05'
excerpt: Rails 7.1 adds support for SQLCommenter to tag queries with controller, action, and job metadata—improving observability and debugging.
categories:
  - Rails
  - Rails 7.1
---

Rails 7.1 introduces support for **SQLCommenter** format in Active Record query logs — enabling developers to tag SQL queries with contextual metadata like controller, action, job name, or even custom attributes.

This feature brings improved visibility into which part of your Rails app generated a given SQL query, especially useful when inspecting logs or working with APM tools like Datadog, New Relic, or Scout.

### What it looks like

With query tagging enabled, Rails appends metadata as SQL comments at the end of the generated queries:

```sql
SELECT * FROM users
/*application='MyApp',controller='UsersController',action='index'*/
```

This makes it easier to track down expensive or unexpected queries directly to their source — be it a controller action, background job, or specific tenant.

### How to enable SQLCommenter in Rails 7.1

In `config/application.rb` (or in an environment-specific config like `production.rb`):

```ruby
config.active_record.query_log_tags_enabled = true
```

By default, Rails will include the following tags:

```ruby
config.active_record.query_log_tags = [:application, :controller, :action, :job]
```

These tags correspond to common runtime contexts — controller and action for web requests, and job for background workers.

### Adding custom query tags

You can go further and add custom tags using a Hash. For example:

```ruby
config.active_record.query_log_tags = [
  :namespaced_controller,
  :action,
  :job,
  {
    request_id: ->(context) { context[:controller]&.request&.request_id },
    job_id: ->(context) { context[:job]&.job_id },
    tenant_id: -> { Current.tenant&.id },
    static: "dashboard"
  }
]
```

These are evaluated per request or job, and Rails automatically omits tags with `nil` values.

### Other useful options

##### Cache tags per request or job

To improve performance when tags don’t change during the request lifecycle:

```ruby
config.active_record.cache_query_log_tags = true
```

##### Prepend instead of append

If you prefer seeing the comments **before** the query (instead of after), enable:

```ruby
ActiveRecord::QueryLogs.prepend_comment = true
```

### Why this matters

- Debug slow queries faster by tracing them back to controller or job.
- Enhance observability in APM dashboards with full request context.
- Simplify performance profiling and query auditing.

### Summary

Rails 7.1 makes query tracing easier with built-in SQLCommenter tagging support. Whether you're debugging locally or tracking performance in production, being able to map queries to application context is a huge win for observability. Check out [API For Active Record Query Logs](https://api.rubyonrails.org/v7.1/classes/ActiveRecord/QueryLogs.html) for more details.
