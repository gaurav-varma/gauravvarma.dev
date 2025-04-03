---
title: Rails 6.1 allows destroying associations asynchronously
createdAt: '2020-12-21'
excerpt: Rails 6.1 introduces `:destroy_async`, allowing associated records to be deleted via background jobs—improving performance and preventing long request times.
categories:
  - Rails
  - Rails 6.1
  - Performance
---

Rails 6.1 introduces support for `:destroy_async` on associations — enabling deferred deletion of associated records through background jobs.

### Why This Matters

Cascading deletions in complex systems can lead to slow requests and timeouts. Consider a model with deeply nested associations — using `dependent: :destroy` could block the request thread as it recursively deletes records.

Rails 6.1 solves this by introducing:

```ruby
has_many :comments, dependent: :destroy_async
```

Instead of deleting inline, Rails now **queues a job** to destroy the associated records in the background.

### Example

```ruby
class Author < ApplicationRecord
  has_many :books, dependent: :destroy_async
end

class Book < ApplicationRecord
  belongs_to :author
end
```

Now, when an `Author` is destroyed, Rails enqueues a background job to remove the associated `books`.

```bash
Performing ActiveRecord::DestroyAssociationAsyncJob
  Job ID: d5af82ac-ee53-453d-8736-541ae0f68105
  Arguments: {
    owner_model_name: "Author",
    owner_id: 1,
    association_class: "Book",
    association_ids: [1, 2, 3, 4],
    association_primary_key_column: :id
  }
```

The `Author` record is deleted immediately, and `Book` records are processed asynchronously — improving UX and system responsiveness.

### When to Use

- Large hierarchies of associated records
- Performance-sensitive delete operations
- Avoiding request timeout errors

Keep in mind: callbacks still run, just deferred in a job.

### Summary

Rails 6.1’s `:destroy_async` gives developers a native way to **offload costly association deletions** into background jobs. It’s a small change with big impact on scalability and performance.

For more details, check the [Rails PR #40157](https://github.com/rails/rails/pull/40157).
